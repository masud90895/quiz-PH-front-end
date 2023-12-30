import React from "react";
import Logo from "../Logo/Logo";
import Image from "next/image";

const Footer = () => {
  return (
    <section className="">
      <div className="common  border-t pt-2 ">
        {/* <!-- TOP CONTAINER --> */}
        <div className="flex w-full flex-col lg:flex-row lg:justify-between">
          {/* <!-- LEFT DIV --> */}
          <div className="flex flex-col lg:mr-20">
            {/* <!-- LOGO --> */}
            <Logo />
            <p className="font-inter my-4 max-w-[350px] text-base font-light text-gray-500">
              We believe Quizzes is the best way to create and share quizzes on
              the Internet. We&apos;re a small team of developers building a
              product we love.
            </p>
            {/* <!-- NEWSLETTER & EMAIL --> */}
            <div className="flex flex-col">
              <form action="" className="mb-10 mt-5 max-w-[421px]">
                <div className="relative">
                  <label
                    htmlFor="email"
                    className="font-inter font-medium text-black"
                  >
                    SUBSCRIBE TO NEWSLETTER
                  </label>
                  <input
                    type="email"
                    className="font-inter relative mt-4 w-full rounded-md bg-[#f2f2f7] px-6 py-4 text-base"
                    placeholder="Enter your email"
                    name="email"
                  />
                  <button
                    type="submit"
                    className="absolute right-[15px] top-[55px]"
                  >
                    <Image
                      src="https://assets.website-files.com/6357722e2a5f19121d37f84d/6358fcc48819ea6fe59c1d01_PaperPlaneTilt.svg"
                      alt=""
                      className=""
                      width="24"
                      height="24"
                    />
                  </button>
                </div>
              </form>
            </div>
          </div>
          {/* <!-- RIGHT DIV --> */}
          <div className="mt-7 max-w-[700px] grow justify-end lg:flex lg:flex-row">
            {/* <!-- FOOTER LINKS --> */}
            <div className="flex w-full flex-row flex-wrap lg:flex-nowrap lg:items-start lg:justify-end">
              {/* <!-- LINK BLOCK --> */}
              <div className="my-5 mr-8 flex flex-col space-y-5 lg:ml-10">
                <h2 className="font-inter font-medium text-black">SOLUTION</h2>
                <a href="" className="font-inter font-light text-gray-500">
                  Marketing
                </a>
                <a href="" className="font-inter font-light text-gray-500">
                  Analytics
                </a>
                <a href="" className="font-inter font-light text-gray-500">
                  Commerce
                </a>
                <a href="" className="font-inter font-light text-gray-500">
                  Insights
                </a>
              </div>
              {/* <!-- LINK BLOCK --> */}
              <div className="my-5 mr-8 flex flex-col space-y-5 lg:ml-10">
                <h2 className="font-inter font-medium text-black">SUPPORT</h2>
                <a href="" className="font-inter font-light text-gray-500">
                  Pricing
                </a>
                <a href="" className="font-inter font-light text-gray-500">
                  Documentation
                </a>
                <a href="" className="font-inter font-light text-gray-500">
                  Guides
                </a>
                <a href="" className="font-inter font-light text-gray-500">
                  API Status
                </a>
              </div>
              {/* <!-- LINK BLOCK --> */}
              <div className="my-5 mr-8 flex flex-col space-y-5 lg:ml-10">
                <h2 className="font-inter font-medium text-black">COMPANY</h2>
                <a href="" className="font-inter font-light text-gray-500">
                  About
                </a>
                <a href="" className="font-inter font-light text-gray-500">
                  Blog
                </a>
                <a href="" className="font-inter font-light text-gray-500">
                  Jobs
                </a>
                <a href="" className="font-inter font-light text-gray-500">
                  Press
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
