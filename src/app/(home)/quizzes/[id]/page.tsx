"use client";
import Loader from "@/app/loading";
import QuizForm from "@/components/QuizForm/QuizForm";
import { useQuizQuery } from "@/redux/api/quizApi";
import React from "react";

const QuizPage = ({ params }: any) => {
  const { data, isLoading } = useQuizQuery(params.id);

  if (isLoading) return <Loader />;
  return (
    <div className="common">
      <QuizForm quiz={data} />{" "}
    </div>
  );
};

export default QuizPage;
