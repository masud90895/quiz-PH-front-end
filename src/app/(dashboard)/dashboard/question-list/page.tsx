"use client";
import LoadingButton from "@/components/Button/LoadingButton";
import InputField from "@/components/InputField/InputField";
import MultiSelectTextInput from "@/components/MaltiSelectTextInput/MaltiSelectTextInput";
import ReactMultiSelect from "@/components/ReactMultiSelect/ReactMultiSelect";
import Table from "@/components/Table/Table";
import Modal from "@/components/modal/Modal";
import {
  useCreateQuizQuestionMutation,
  useDeleteQuizQuestionMutation,
  useGetAllQuestionsQuery,
  useQuizzesQuery,
  useUpdateQuizQuestionMutation,
} from "@/redux/api/quizApi";
import { getUserDataFromLC } from "@/utils/local-storage";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const QuestionList = () => {
  // get question
  const { data: question, isLoading } = useGetAllQuestionsQuery(undefined);
  // get quizzes
  const { data: quizzes } = useQuizzesQuery(undefined);

  // create quiz
  const [createQuizQuestion, { isLoading: isCreating }] =
    useCreateQuizQuestionMutation();
  // get user data
  const user = getUserDataFromLC();

  // delete category
  const [deleteQuizQuestion] = useDeleteQuizQuestionMutation();

  const [isCreated, setIsCreated] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [editData, setEditData] = React.useState<any>(null);

  const tableHeader = [
    { id: 1, title: "id" },
    { id: 2, title: "Title" },
    { id: 3, title: "Options" },
    { id: 4, title: "Answer" },
    { id: 5, title: "Quiz" },
  ];

  const tableData = question?.map((item: any, i: number) => ({
    id: item.id,
    rowData: [
      i + 1,
      item?.title,
      `${item?.options?.length} Options`,
      item?.answer,
      item?.quiz?.title,
    ],
  }));

  // form

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  // create

  // search tag
  const [searchTag, setSearchTag] = useState<any[]>([]);
  console.log("🚀 ~ file: page.tsx:72 ~ QuestionList ~ searchTag:", searchTag);
  const [inputValue, setInputValue] = React.useState("");
  const handleDeleteOption = (value: any) => {
    setSearchTag(searchTag.filter((vt: any) => vt !== value));
  };

  const onSubmit = async (data: any) => {
    // data.answer not not include in options
    if (!searchTag.includes(data.answer)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Answer not include in options",
      });
      return;
    }

    const datas = {
      title: data.title,
      options: searchTag,
      answer: data.answer,
      quizId: data.quizzes.id,
    };

    try {
      const res = await createQuizQuestion(datas).unwrap();

      if (res) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Question Created Successfully",
          showConfirmButton: false,
          timer: 1500,
        });

        setIsCreated(false);
        setSearchTag([]);
        reset();
      }
    } catch (error) {
      console.log("🚀 ~ file: page.tsx:44 ~ onSubmit ~ error:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error}`,
      });
    }
  };

  // delete category

  const handleDelete = async (id: number) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to delete this Question!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await deleteQuizQuestion(id).unwrap();

          if (res) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Question Deleted Successfully",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        }
      });
    } catch (error) {
      console.log("🚀 ~ file: page.tsx:44 ~ onSubmit ~ error:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error}`,
      });
    }
  };

  // edit category
  const [updateQuizQuestion, { isLoading: updateLoading }] =
    useUpdateQuizQuestionMutation();

  const handleEdit = async (id: number) => {
    const findQuiz = await question?.find((item: any) => item.id === id);
    await setEditData(findQuiz);
    await setIsEdit(true);
  };

  const onEditSubmit = async (data: any) => {
    // data.answer not not include in options
    if (!searchTag.includes(data.answer)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Answer not include in options",
      });
      return;
    }

    const datas = {
      id: editData?.id,
      title: data.title,
      options: searchTag,
      answer: data.answer,
      quizId: data.quizzes.id,
    };

    try {
      const res = await updateQuizQuestion(datas).unwrap();

      if (res) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Quiz Updated Successfully",
          showConfirmButton: false,
          timer: 1500,
        });

        setIsEdit(false);
        setSearchTag([]);
        reset();
      }
    } catch (error) {
      console.log("🚀 ~ file: page.tsx:44 ~ onSubmit ~ error:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error}`,
      });
    }
  };

  useEffect(() => {
    if (editData?.options) {
      setSearchTag(editData?.options);
    }
  }, [editData?.options]);

  return (
    <>
      <Table
        title="Question List"
        tableHeader={tableHeader}
        tableData={tableData}
        isLoading={isLoading}
        setCreateModal={setIsCreated}
        deleteHandler={handleDelete}
        editHandler={handleEdit}
      />

      {isCreated && (
        <Modal
          closeModal={() => {
            setIsCreated(false);
          }}
          isOpen={isCreated}
          title="Create Question"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="mt-[8px]">
            <InputField
              label="Title"
              placeholder="Enter Title"
              register={register}
              name="title"
              errors={errors.name}
            />

            {/* quiz */}
            <div>
              <label className="my-1 inline-block text-xs font-medium uppercase text-gray-700">
                Quizzes
              </label>

              <ReactMultiSelect
                isMulti={false}
                placeholder="Select Quizzes"
                setValue={setValue}
                name="quizzes"
                options={quizzes?.map((item: any) => ({
                  label: item?.title,
                  value: item?.id,
                }))}
              />
            </div>

            {/* options */}

            <div className="my-4">
              <div className="my-1 inline-block text-xs font-medium uppercase text-gray-700">
                <label>Options : Type Option then press enter</label>
              </div>

              <MultiSelectTextInput
                inputValue={inputValue}
                setInputValue={setInputValue}
                // value={searchTag}
                setValue={setSearchTag}
                placeholder={"Inter Options Value"}
              />
              {searchTag?.length > 0 && (
                <div className="my-2 flex gap-3 flex-wrap">
                  {searchTag.map((vt: any, i: number) => (
                    <div
                      key={i}
                      onClick={() => handleDeleteOption(vt)}
                      className="flex gap-2 font-semibold text-[#111827]  items-center border rounded-lg   "
                    >
                      <p className="p-2">{vt}</p>
                      <p className="p-2 hover:bg-red-600 hover:text-white cursor-pointer">
                        X
                      </p>
                    </div>
                  ))}{" "}
                </div>
              )}

              <p>
                {" "}
                <span className="font-bold">{searchTag?.length}</span> Option
                selected
              </p>
            </div>

            {/* answer */}
            <InputField
              label="answer"
              placeholder="Enter Answer"
              register={register}
              name="answer"
              errors={errors.name}
            />

            <div className="flex justify-end mt-[8px]">
              {isCreating ? (
                <LoadingButton />
              ) : (
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                  Create
                </button>
              )}
            </div>
          </form>
        </Modal>
      )}

      {/* edit */}
      {isEdit && (
        <Modal
          closeModal={() => {
            setIsEdit(false);
          }}
          isOpen={isEdit}
          title="Edit Category"
        >
          <form
            onSubmit={handleSubmit(onEditSubmit)}
            className="mt-[8px] h-[500px]"
          >
            <InputField
              label="Title"
              placeholder="Enter Title"
              register={register}
              name="title"
              errors={errors.name}
              defaultValue={editData?.title}
            />

            {/* quiz */}
            <div>
              <label className="my-1 inline-block text-xs font-medium uppercase text-gray-700">
                Quizzes
              </label>

              <ReactMultiSelect
                isMulti={false}
                placeholder="Select Quizzes"
                setValue={setValue}
                name="quizzes"
                options={quizzes?.map((item: any) => ({
                  label: item?.title,
                  value: item?.id,
                }))}
              />
            </div>

            {/* options */}

            <div className="my-4">
              <div className="my-1 inline-block text-xs font-medium uppercase text-gray-700">
                <label>Options : Type Option then press enter</label>
              </div>

              <MultiSelectTextInput
                inputValue={inputValue}
                setInputValue={setInputValue}
                // value={value}
                setValue={setSearchTag}
                placeholder={"Inter Options Value"}
              />
              {searchTag?.length > 0 && (
                <div className="my-2 flex gap-3 flex-wrap">
                  {searchTag.map((vt: any, i: number) => (
                    <div
                      key={i}
                      onClick={() => handleDeleteOption(vt)}
                      className="flex gap-2 font-semibold text-[#111827]  items-center border rounded-lg   "
                    >
                      <p className="p-2">{vt}</p>
                      <p className="p-2 hover:bg-red-600 hover:text-white cursor-pointer">
                        X
                      </p>
                    </div>
                  ))}{" "}
                </div>
              )}

              <p>
                {" "}
                <span className="font-bold">{searchTag?.length}</span> Option
                selected
              </p>
            </div>

            {/* answer */}
            <InputField
              label="answer"
              placeholder="Enter Answer"
              register={register}
              name="answer"
              errors={errors.name}
              defaultValue={editData?.answer}
            />

            <div className="flex justify-end mt-[8px]">
              {updateLoading ? (
                <LoadingButton />
              ) : (
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                  Update
                </button>
              )}
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};

export default QuestionList;
