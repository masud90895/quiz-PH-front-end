"use client";
import React from "react";
import LogoImage from "../../../public//assets/idea.jpg";
import Image from "next/image";
import CoverImage from "../../../public//assets/6580907.jpg";
import { useQuizzesQuery } from "@/redux/api/quizApi";
import QuizCard from "@/components/QuizCard/QuizCard";
import Loader from "../loading";

const Quizzes = () => {
  const { data, isLoading } = useQuizzesQuery(undefined);

  if (isLoading) return <Loader />;

  return (
    <div className="common">
      <div
        className="relative h-56 rounded-b-lg bg-cover bg-center bg-no-repeat shadow-lg"
        style={{
          backgroundImage: `url(${CoverImage.src})`,
        }}
      >
        <div className="px-4 pt-8 pb-10">
          <div className="absolute inset-x-0 -bottom-10 mx-auto w-36 rounded-full border-8 border-white shadow-lg">
            <span className="absolute right-0 m-3 h-3 w-3 rounded-full bg-green-500 ring-2 ring-green-300 ring-offset-2"></span>
            <Image
              className="mx-auto h-auto w-full rounded-full"
              src={LogoImage.src}
              alt=""
              width={150}
              height={150}
            />
          </div>
        </div>
      </div>

      <section className="grid grid-cols-2 gap-x-6 gap-y-10 px-2 pb-20 sm:grid-cols-3 sm:px-8 lg:mt-16 lg:grid-cols-4 lg:gap-x-4 lg:px-0">
        {data?.map((quiz: any, i: number) => (
          <QuizCard key={i} quiz={quiz} />
        ))}
      </section>
    </div>
  );
};

export default Quizzes;
