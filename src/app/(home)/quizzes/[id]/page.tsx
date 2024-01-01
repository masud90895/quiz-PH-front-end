"use client";
import Loader from "@/app/loading";
import QuizForm from "@/components/QuizForm/QuizForm";
import { useQuizQuery } from "@/redux/api/quizApi";
import { getUserDataFromLC } from "@/utils/local-storage";
import { useRouter } from "next/navigation";
import React from "react";
import Swal from "sweetalert2";

const QuizPage = ({ params }: any) => {
  const { data, isLoading } = useQuizQuery(params.id);
  const router = useRouter();

  if (isLoading) return <Loader />;

  const user: any = getUserDataFromLC();

  if (!user && typeof window !== "undefined") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "You are not authorized .please login!",
    });

    return router.push("/");
  }

  return (
    <div className="common">
      <QuizForm quiz={data} />{" "}
    </div>
  );
};

export default QuizPage;
