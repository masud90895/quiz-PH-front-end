import React from "react";

const Category = () => {
  return (
    <section className="my-[50px]">
      <div className="common ">
        {/* <!-- Heading Div --> */}
        <div className="mx-auto w-full max-w-3xl text-center">
          <h2 className="text-3xl font-semibold md:text-5xl">
            All{" "}
            <span
              className="bg-cover bg-center bg-no-repeat px-4 text-white"
              style={{
                backgroundImage:
                  "url('https://assets.website-files.com/63904f663019b0d8edf8d57c/63915f9749aaab0572c48dae_Rectangle%2018.svg')",
              }}
            >
              Categories
            </span>
          </h2>
          <div className="mx-auto mb-8 mt-4 max-w-[528px] md:mb-12 lg:mb-16">
            <p className="text-[#636262]">
              Here you find all the categories of quizzes. You can choose any
            </p>
          </div>
        </div>
        {/* <!-- Features Div --> */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 md:grid-cols-3 lg:gap-12">
          {/* <!-- Feature Item --> */}
          <div className="relative mb-8 flex flex-col rounded-2xl border border-solid border-blue-600 p-2  [box-shadow:#1D4ED8_4px_4px] hover:shadow-none lg:mb-4 transition-all duration-500 ease-in-out  ">
            <span className="text-[14px] font-semibold text-center">
              Support
            </span>
          </div>

          {/* <!-- Feature Item End --> */}
        </div>
      </div>
    </section>
  );
};

export default Category;
