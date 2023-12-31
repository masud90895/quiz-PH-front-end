import Loader from "@/app/loading";
import { useQuizQuery } from "@/redux/api/quizApi";
import React from "react";

const QuizPage = ({ params }: any) => {
  console.log(params);
  const { data, isLoading } = useQuizQuery(params.id);
  console.log(data);

  if (isLoading) return <Loader />;
  return <div className="common"></div>;
};

export default QuizPage;
