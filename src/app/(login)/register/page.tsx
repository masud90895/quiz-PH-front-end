"use client";
import LoadingButton from "@/components/Button/LoadingButton";
import InputField from "@/components/InputField/InputField";
import Logo from "@/components/shared/Logo/Logo";
import { useUserSingUpMutation } from "@/redux/api/authApi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const Register = () => {
  const [userSingUp, { isLoading }] = useUserSingUpMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    data.profileImg =
      "https://i.ibb.co/k53Qz5y/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png";

    try {
      const res = await userSingUp(data).unwrap();
      console.log(res);
      if (res?.newUser && res?.accessToken) {
        toast.success("User created successfully");
        router.push("/");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.data?.message);
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

            <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
              <div className="mb-2">
                <InputField
                  label="Name"
                  name="name"
                  placeholder="Enter your name "
                  type="text"
                  register={register}
                  errors={errors}
                  required
                />
              </div>
              <div className="mb-2">
                <InputField
                  label="Email"
                  name="email"
                  placeholder="Enter your email "
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

              {/* contactNumber */}

              <div className="mb-4">
                <InputField
                  label="Contact Number"
                  name="contactNumber"
                  placeholder="Enter your contact number"
                  type="text"
                  register={register}
                  errors={errors}
                  required
                />
              </div>

              {/* address */}

              <div className="mb-4">
                <InputField
                  label="Address"
                  name="address"
                  placeholder="Enter your address"
                  type="text"
                  register={register}
                  errors={errors}
                  required
                />
              </div>

              <div className="mb-4">
                {isLoading ? (
                  <LoadingButton />
                ) : (
                  <button
                    className="grid w-full cursor-pointer select-none rounded-md border border-blue-500 bg-blue-500 py-2 px-5 text-center align-middle text-sm text-white shadow hover:border-blue-600 hover:bg-blue-600 hover:text-white focus:border-blue-600 focus:bg-blue-600 focus:text-white focus:shadow-none"
                    type="submit"
                  >
                    Sign Up
                  </button>
                )}
              </div>
            </form>

            <p className="mb-4 text-center">
              already on Quizzes?
              <Link
                href="/login"
                className="cursor-pointer text-blue-500 no-underline hover:text-blue-500"
              >
                {" "}
                Login{" "}
              </Link>
            </p>
          </div>
        </div>
        {/* <!-- /Register --> */}
      </div>
    </div>
  );
};

export default Register;
