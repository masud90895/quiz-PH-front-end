"use client";
import LoadingButton from "@/components/Button/LoadingButton";
import InputField from "@/components/InputField/InputField";
import ReactMultiSelect from "@/components/ReactMultiSelect/ReactMultiSelect";
import Table from "@/components/Table/Table";
import Modal from "@/components/modal/Modal";
import {
  useCategoriesQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} from "@/redux/api/categoryApi";
import {
  useCreateQuizMutation,
  useDeleteQuizMutation,
  useQuizzesQuery,
  useUpdateQuizMutation,
} from "@/redux/api/quizApi";
import { getUserDataFromLC } from "@/utils/local-storage";
import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const QuizList = () => {
  // get quizzes
  const { data, isLoading } = useQuizzesQuery(undefined);
  // get categories
  const { data: quizzes } = useCategoriesQuery(undefined);

  // create quiz
  const [createQuiz, { isLoading: isCreating }] = useCreateQuizMutation();
  // get user data
  const user = getUserDataFromLC();

  // delete category
  const [deleteQuiz] = useDeleteQuizMutation();

  const [isCreated, setIsCreated] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [editData, setEditData] = React.useState<any>(null);

  const tableHeader = [
    { id: 1, title: "id" },
    { id: 2, title: "Title" },
    { id: 3, title: "Category" },
    { id: 4, title: "Questions" },
  ];

  const tableData = data?.map((item: any, i: number) => ({
    id: item.id,
    rowData: [
      i + 1,
      item?.title,
      item?.category?.name,
      item?.questions?.length,
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
  const onSubmit = async (data: any) => {
    const datas = {
      title: data.title,
      categoryId: data.category.id,
      createdById: user!.userId,
    };

    try {
      const res = await createQuiz(datas).unwrap();

      if (res) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Quiz Created Successfully",
          showConfirmButton: false,
          timer: 1500,
        });

        setIsCreated(false);
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
        text: "You want to delete this category!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await deleteQuiz(id).unwrap();

          if (res) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Quiz Deleted Successfully",
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
  const [updateQuiz, { isLoading: updateLoading }] = useUpdateQuizMutation();

  const handleEdit = async (id: number) => {
    setEditData(id);
    setIsEdit(true);
  };

  const onEditSubmit = async (data: any) => {
    const datas = {
      id: editData,
      title: data.title,
      categoryId: data.category.id,
      createdById: user!.userId,
    };

    try {
      const res = await updateQuiz(datas).unwrap();

      if (res) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Quiz Updated Successfully",
          showConfirmButton: false,
          timer: 1500,
        });

        setIsEdit(false);
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

  return (
    <>
      <Table
        title="Quiz List"
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
          title="Create Quiz"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="mt-[8px]">
            <InputField
              label="Title"
              placeholder="Enter Title"
              register={register}
              name="title"
              errors={errors.name}
            />

            <div>
              <label className="my-1 inline-block text-xs font-medium uppercase text-gray-700">
                Category
              </label>

              <ReactMultiSelect
                isMulti={false}
                placeholder="Select Category"
                setValue={setValue}
                name="category"
                options={quizzes?.map((item: any) => ({
                  label: item?.name,
                  value: item?.id,
                }))}
              />
            </div>

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
            className="mt-[8px] h-[300px]"
          >
            <InputField
              label="Title"
              placeholder="Enter Title"
              register={register}
              name="title"
              errors={errors.name}
              defaultValue={editData?.name}
            />

            <div>
              <label className="my-1 inline-block text-xs font-medium uppercase text-gray-700">
                Category
              </label>

              <ReactMultiSelect
                isMulti={false}
                placeholder="Select Category"
                setValue={setValue}
                name="category"
                options={quizzes?.map((item: any) => ({
                  label: item?.name,
                  value: item?.id,
                }))}
              />
            </div>

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

export default QuizList;
