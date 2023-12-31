"use client";
import LoadingButton from "@/components/Button/LoadingButton";
import InputField from "@/components/InputField/InputField";
import Table from "@/components/Table/Table";
import Modal from "@/components/modal/Modal";
import {
  useCategoriesQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} from "@/redux/api/categoryApi";
import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const CategoryList = () => {
  // get categories
  const { data, isLoading } = useCategoriesQuery(undefined);
  // create category
  const [createCategory, { isLoading: isCreating }] =
    useCreateCategoryMutation();

  // delete category
  const [deleteCategory] = useDeleteCategoryMutation();

  const [isCreated, setIsCreated] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [editData, setEditData] = React.useState<any>(null);

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
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Category Created Successfully",
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
          const res = await deleteCategory(id).unwrap();

          if (res) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Category Deleted Successfully",
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
  const [updateCategory, { isLoading: updateLoading }] =
    useUpdateCategoryMutation();

  const handleEdit = async (id: number) => {
    const findData = data?.find((item: any) => item.id === id);
    if (findData) {
      setEditData(findData);
      setIsEdit(true);
    }
  };

  const onEditSubmit = async (data: any) => {
    data.id = editData.id;
    try {
      const res = await updateCategory(data).unwrap();

      if (res) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Category Updated Successfully",
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
        title="Category List"
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

      {/* edit */}
      {isEdit && (
        <Modal
          closeModal={() => {
            setIsEdit(false);
          }}
          isOpen={isEdit}
          title="Edit Category"
        >
          <form onSubmit={handleSubmit(onEditSubmit)} className="mt-[8px]">
            <InputField
              label="Name"
              placeholder="Enter Name"
              register={register}
              name="name"
              errors={errors.name}
              defaultValue={editData?.name}
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

export default CategoryList;
