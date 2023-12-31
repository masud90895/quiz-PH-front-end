"use client";
import React from "react";
import { useQuizzesQuery } from "@/redux/api/quizApi";
import QuizCard from "@/components/QuizCard/QuizCard";

const Quizzes = () => {
  const { data } = useQuizzesQuery(undefined);

  return (
    <div className="common">
      <div className="mx-auto w-full max-w-3xl text-center">
        <h2 className="text-3xl font-semibold md:text-5xl">
          <span
            className="bg-cover bg-center bg-no-repeat px-4 text-white"
            style={{
              backgroundImage:
                "url('https://assets.website-files.com/63904f663019b0d8edf8d57c/63915f9749aaab0572c48dae_Rectangle%2018.svg')",
            }}
          >
            Quizzes
          </span>
        </h2>
        <div className="mx-auto mb-8 mt-4 max-w-[528px] md:mb-12 lg:mb-16">
          <p className="text-[#636262]">
            Here you find all quizzes. You can choose any
          </p>
        </div>
      </div>

      <section className="grid grid-cols-1 gap-x-6 gap-y-10 px-2 pb-20 sm:grid-cols-3 sm:px-8 lg:mt-16 lg:grid-cols-4 lg:gap-x-4 lg:px-0 ">
        {data?.slice(0, 8).map((quiz: any, i: number) => (
          <QuizCard key={i} quiz={quiz} />
        ))}
      </section>
    </div>
  );
};

export default Quizzes;
