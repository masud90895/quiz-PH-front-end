"use client";
import LoadingButton from "@/components/Button/LoadingButton";
import InputField from "@/components/InputField/InputField";
import Table from "@/components/Table/Table";
import Modal from "@/components/modal/Modal";
import {
  useCategoriesQuery,
  useCreateCategoryMutation,
} from "@/redux/api/categoryApi";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const CategoryList = () => {
  const { data, isLoading } = useCategoriesQuery(undefined);
  const [createCategory, { isLoading: isCreating }] =
    useCreateCategoryMutation();

  const [isCreated, setIsCreated] = React.useState(false);

  const tableHeader = [
    { id: 1, title: "id" },
    { id: 2, title: "name" },
    { id: 3, title: "Available Quiz " },
  ];

  const tableData = data?.map((item: any, i: number) => ({
    id: item.id,
    rowData: [i + 1, item?.name, item?.quiz?.length],
  }));

  // form

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const res = await createCategory(data).unwrap();

      if (res) {
        toast.success("Category Created Successfully");
        setIsCreated(false);
        reset();
      }
    } catch (error) {
      console.log("🚀 ~ file: page.tsx:44 ~ onSubmit ~ error:", error);
    }
  };

  return (
    <>
      <Table
        title="Category List"
        tableHeader={tableHeader}
        tableData={tableData}
        isLoading={isLoading}
        createModal={isCreated}
        setCreateModal={setIsCreated}
      />

      {isCreated && (
        <Modal
          closeModal={() => {
            setIsCreated(false);
          }}
          isOpen={isCreated}
          title="Create Category"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="mt-[8px]">
            <InputField
              label="Name"
              placeholder="Enter Name"
              register={register}
              name="name"
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
    </>
  );
};

export default CategoryList;
