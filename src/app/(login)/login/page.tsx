"use client";
import LoadingButton from "@/components/Button/LoadingButton";
import InputField from "@/components/InputField/InputField";
import Logo from "@/components/shared/Logo/Logo";
import { useUserSingInMutation } from "@/redux/api/authApi";
import { setToLocalStorage } from "@/utils/local-storage";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const Login = () => {
  const [userSingIn, { isLoading }] = useUserSingInMutation();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: any) => {
    try {
      const res = await userSingIn(data).unwrap();
      console.log(res);
      if (res?.accessToken) {
        toast.success("User logged in successfully");
        setToLocalStorage("token", res?.accessToken);
        router.push("/");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error);
    }
  };

  return (
    <div className="flex min-h-screen  w-full items-center justify-center text-gray-600 bg-gray-50">
      <div className="relative">
        <div className="hidden sm:block h-56 w-56 text-blue-300 absolute a-z-10 -left-20 -top-20">
          <svg
            id="patternId"
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="a"
                patternUnits="userSpaceOnUse"
                width="40"
                height="40"
                patternTransform="scale(0.6) rotate(0)"
              >
                <rect x="0" y="0" width="100%" height="100%" fill="none" />
                <path
                  d="M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5"
                  stroke-width="1"
                  stroke="none"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width="800%"
              height="800%"
              transform="translate(0,0)"
              fill="url(#a)"
            />
          </svg>
        </div>
        <div className="hidden sm:block h-28 w-28 text-blue-300 absolute a-z-10 -right-20 -bottom-20">
          <svg
            id="patternId"
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="b"
                patternUnits="userSpaceOnUse"
                width="40"
                height="40"
                patternTransform="scale(0.5) rotate(0)"
              >
                <rect x="0" y="0" width="100%" height="100%" fill="none" />
                <path
                  d="M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5"
                  stroke-width="1"
                  stroke="none"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width="800%"
              height="800%"
              transform="translate(0,0)"
              fill="url(#b)"
            />
          </svg>
        </div>
        {/* <!-- Register --> */}
        <div className="relative flex flex-col sm:w-[30rem] rounded-lg border-gray-400 bg-white shadow-lg px-4">
          <div className="flex-auto p-6">
            {/* <!-- Logo --> */}
            <div className="mb-10 flex flex-shrink-0 flex-grow-0 items-center justify-center overflow-hidden">
              <Logo />
            </div>
            {/* <!-- /Logo --> */}
            <h4 className="mb-2 font-medium text-gray-700 xl:text-xl">
              Welcome to Quizzes!
            </h4>
            <p className="mb-6 text-gray-500">
              Please sign-in to access your account
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
              <div className="mb-2">
                <InputField
                  label="Email or Username"
                  name="email"
                  placeholder="Enter your email or username"
                  type="email"
                  register={register}
                  errors={errors}
                  required
                />
              </div>

              <div className="mb-4">
                <InputField
                  label="Password"
                  name="password"
                  placeholder="Enter your password"
                  type="password"
                  register={register}
                  errors={errors}
                  required
                />
              </div>

              <div className="mb-4 flex items-center justify-between w-full">
                <div className="block">
                  <input
                    className="mt-1 mr-2 h-5 w-5 appearance-none rounded border border-gray-300 bg-contain bg-no-repeat align-top text-black shadow checked:bg-blue-500 focus:border-blue-500 focus:shadow"
                    type="checkbox"
                    id="remember-me"
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M6 10l3 3l6-6'/%3e%3c/svg%3e\")",
                    }}
                    checked
                  />
                  <label
                    className="inline-block text-blue-600"
                    htmlFor="remember-me"
                  >
                    {" "}
                    Remember Me{" "}
                  </label>
                </div>

                <a
                  href="auth-forgot-password-basic.html"
                  className="cursor-pointer text-blue-500 no-underline hover:text-blue-500"
                >
                  <small className=" ">Forgot Password?</small>
                </a>
              </div>
              <div className="mb-4">
                {isLoading ? (
                  <LoadingButton />
                ) : (
                  <button
                    className="grid w-full cursor-pointer select-none rounded-md border border-blue-500 bg-blue-500 py-2 px-5 text-center align-middle text-sm text-white shadow hover:border-blue-600 hover:bg-blue-600 hover:text-white focus:border-blue-600 focus:bg-blue-600 focus:text-white focus:shadow-none"
                    type="submit"
                  >
                    Sign in
                  </button>
                )}
              </div>
            </form>

            <p className="mb-4 text-center">
              New on Quizzes?
              <Link
                href="/register"
                className="cursor-pointer text-blue-500 no-underline hover:text-blue-500"
              >
                {" "}
                Create an account{" "}
              </Link>
            </p>
          </div>
        </div>
        {/* <!-- /Register --> */}
      </div>
    </div>
  );
};

export default Login;
