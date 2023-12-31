"use client";
import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";

type ITableHeader = {
  id: number;
  title: string;
};

type ITableData = {
  id: number;
  rowData: any; // Modify the type based on your actual data structure
};

type Props = {
  title: string;
  setSearch?: (value: string) => void;
  setCreateModal?: (value: boolean) => void;
  createModal?: boolean;
  tableHeader: ITableHeader[];
  tableData: ITableData[];
  isLoading?: boolean;
  deleteHandler?: (id: number) => void;
  editHandler?: (id: number) => void;
};

const Table = ({
  title,
  setSearch,
  setCreateModal,
  createModal,
  tableHeader,
  tableData,
  isLoading = false,
  deleteHandler,
  editHandler,
}: Props) => {
  const handleChange = (search: string) => {
    if (setSearch) {
      setSearch(search);
    }
  };

  const handleCreateModal = (value: boolean) => {
    if (setCreateModal) {
      setCreateModal(value);
    }
  };

  return (
    <div>
      <div className="">
        <h1 className=" mb-10 ml-5 text-2xl font-bold text-gray-900">
          {title}
        </h1>
      </div>
      <div className="">
        {/* header */}
        <div className="w-full">
          <div className="flex w-full flex-col items-center justify-between space-y-2 sm:flex-row sm:space-y-0">
            <div className="relative flex w-full max-w-2xl items-center">
              <svg
                className="absolute left-2 block h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="11" cy="11" r="8" className=""></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65" className=""></line>
              </svg>
              <input
                type="name"
                name="search"
                onChange={(e) => handleChange(e.target.value)}
                className="h-12 w-full border-b-gray-400 bg-transparent py-4 pl-12 text-sm outline-none focus:border-b-2"
                placeholder={`Search ${title}...`}
              />
            </div>

            <button
              onClick={() => handleCreateModal(true)}
              type="button"
              className="relative mr-auto inline-flex cursor-pointer items-center rounded-full border border-gray-200 bg-white px-5 py-2 text-center text-sm font-medium text-gray-800 hover:bg-gray-100 focus:shadow sm:mr-0"
            >
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              <svg
                className="mr-2 h-3 w-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              Create {title}
            </button>
          </div>
        </div>
        {/* header end */}
        {/* table start */}
        <div className="mt-6  rounded-xl bg-white px-6 shadow lg:px-4">
          <table className="min-w-full border-collapse border-spacing-y-2 border-spacing-x-2">
            {/* table header */}
            <thead className=" border-b table-header-group">
              <tr className="">
                {tableHeader.map((item) => (
                  <td
                    key={item.id}
                    className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3"
                  >
                    {item?.title}
                  </td>
                ))}

                <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                  Action
                </td>
              </tr>
            </thead>
            {/* table header end */}
            {/* table body */}

            <tbody className="bg-white border-gray-300">
              {isLoading ? (
                <iframe
                  src="https://giphy.com/embed/ZO9b1ntYVJmjZlsWlm"
                  width="480"
                  height="360"
                  className=" common"
                  frameBorder="0"
                ></iframe>
              ) : tableData?.length > 0 ? (
                tableData?.map((item: any, i: number) => (
                  <tr key={i} className="">
                    {item?.rowData?.map((item: any, i: number) => (
                      <td
                        key={i}
                        className="whitespace-no-wrap  py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell"
                      >
                        {item}
                      </td>
                    ))}

                    <td className="whitespace-no-wrap  py-4 text-sm font-normal  text-gray-600 sm:px-3 lg:table-cell flex items-center gap-3  ">
                      <button
                        onClick={() => editHandler && editHandler(item?.id)}
                        className="text-[26px] border p-2 mr-2 rounded-lg hover:bg-blue-600 hover:text-white"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => deleteHandler && deleteHandler(item?.id)}
                        className="text-[26px] border p-2 rounded-lg hover:bg-red-600 hover:text-white"
                      >
                        <MdDeleteSweep />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="">
                  <td
                    className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell"
                    colSpan={tableHeader.length + 1}
                  >
                    No Data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* table end */}
      </div>
    </div>
  );
};

export default Table;
