"use client";
import React from "react";

import QuizCard from "@/components/QuizCard/QuizCard";
import Loader from "@/app/loading";
import { useCategoryQuery } from "@/redux/api/categoryApi";

const SingleCategory = ({ params }: { params: { id: string } }) => {
  const { data, isLoading } = useCategoryQuery(params.id);
  console.log("🚀 ~ file: page.tsx:10 ~ SingleCategory ~ data:", data);

  if (isLoading) return <Loader />;
  return (
    <div className="common">
      <section className="grid grid-cols-2 gap-x-6 gap-y-10 px-2 pb-20 sm:grid-cols-3 sm:px-8 lg:mt-16 lg:grid-cols-4 lg:gap-x-4 lg:px-0 ">
        {data?.quiz?.length > 0 ? (
          data?.quiz?.map((quiz: any, i: number) => (
            <QuizCard key={i} quiz={quiz} />
          ))
        ) : (
          <h1 className="text-center text-2xl w-full">No quiz found</h1>
        )}
      </section>
    </div>
  );
};

export default SingleCategory;
