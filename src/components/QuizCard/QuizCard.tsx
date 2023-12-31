import React from "react";

type QuizCardProps = {
  quiz: {
    title: string;
    category: { name: string };
    questions: [];
    createdBy: { name: string };
  };
};

const QuizCard = ({ quiz }: QuizCardProps) => {
  return (
    <div>
      {/* quiz title */}
      <p>{quiz?.title}</p>
      {/* quiz category */}
      <p> Category : {quiz?.category?.name}</p>
      {/* total question */}
      <p> Questions: {quiz?.questions?.length}</p>
      {/* created user */}
      <p>Created By: {quiz?.createdBy?.name}</p>
      {/* quiz image */}
      <div className="group flex w-full cursor-pointer items-center justify-center rounded-md bg-blue-700 px-6 py-2 text-white transition">
        <span className="group flex w-full items-center justify-center rounded py-1 text-center font-bold">
          {" "}
          Start Quiz{" "}
        </span>
        <svg
          className="flex-0 ml-4 h-6 w-6 transition-all group-hover:ml-8"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </div>
    </div>
  );
};

export default QuizCard;
