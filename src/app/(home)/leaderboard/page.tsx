"use client";
import Loader from "@/app/loading";
import { useGetScoreQuery } from "@/redux/api/score";
import React from "react";
import { formatDistanceToNowStrict } from "date-fns";

const LeaderBoard = () => {
  const { data, isLoading } = useGetScoreQuery(undefined);
  const sortedData = data?.slice().sort((a: any, b: any) => b.score - a.score);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="common mb-[80px]">
      <div className="h-full w-full flex flex-col   ">
        <h2 className="text-start text-5xl font-semibold py-5 text-blue-400  ">
          Leader Board
        </h2>

        <div className="">
          <div className="flex justify-between items-center bg-blue-600 text-white font-semibold px-5 py-2  mb-5 border-2 shadow-md  p-3 rounded-lg ">
            <div className="w-1/4">Name</div>
            <div className="w-1/4">Score</div>
            <div className="w-1/4">Quiz</div>
            <div className="w-1/4">Date</div>
          </div>

          <div className="border-2 shadow-md shadow-blue-300 p-3 rounded-lg mb-5">
            {/* Top Positions */}

            <p className="text-[22px] font-bold   ">Top Positions</p>

            {sortedData?.slice(0, 1).map((item: any, index: number) => (
              <div
                key={index}
                className="flex justify-between hover:bg-blue-500 hover:text-white items-center px-5 py-2 border  my-2 rounded-lg border-blue-200 text-gray-600"
              >
                <div className="w-1/4">
                  <span className="mr-2 font-bold">{index + 1}</span>{" "}
                  {item?.user?.name}
                </div>
                <div className="w-1/4">{item.score}</div>
                <div className="w-1/4">{item?.quiz?.title}</div>
                <div className="w-1/4">
                  {formatDistanceToNowStrict(new Date(item.createdAt))}
                </div>
              </div>
            ))}
          </div>

          <div className="border-2 shadow-md shadow-blue-300 p-3 rounded-lg ">
            {sortedData?.slice(1, 99).map((item: any, index: number) => (
              <div
                key={index}
                className="flex justify-between hover:bg-blue-500 hover:text-white items-center px-5 py-2 border  my-2 rounded-lg border-blue-200 text-gray-600"
              >
                <div className="w-1/4">
                  <span className="mr-2 font-bold">{index + 1}</span>{" "}
                  {item?.user?.name}
                </div>
                <div className="w-1/4">{item.score}</div>
                <div className="w-1/4">{item?.quiz?.title}</div>
                <div className="w-1/4">
                  {formatDistanceToNowStrict(new Date(item.createdAt))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;
