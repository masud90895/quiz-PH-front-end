"use client";
import Table from "@/components/Table/Table";
import { useCategoriesQuery } from "@/redux/api/categoryApi";
import React from "react";

const CategoryList = () => {
  const { data, isLoading } = useCategoriesQuery(undefined);

  const [isEdit, setIsEdit] = React.useState(false);

  const tableHeader = [
    { id: 1, title: "id" },
    { id: 2, title: "name" },
    { id: 3, title: "Available Quiz " },
  ];

  const tableData = data?.map((item: any, i: number) => ({
    id: item.id,
    rowData: [i + 1, item?.name, item?.quiz?.length],
  }));

  return (
    <Table
      title="Category List"
      tableHeader={tableHeader}
      tableData={tableData}
      isLoading={isLoading}
      createModal={isEdit}
      setCreateModal={setIsEdit}
    />
  );
};

export default CategoryList;
