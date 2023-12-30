import Link from "next/link";
import React from "react";
import logoImg from "../../../../public/assets/logo.png";
import Image from "next/image";

const Logo = () => {
  return (
    <Link
      href="/"
      className="flex cursor-pointer items-center whitespace-nowrap text-2xl font-black "
    >
      <span className="mr-2 text-4xl text-indigo-500">
        <Image
          src={logoImg}
          alt="Quizzes logo"
          width={1000}
          height={1000}
          className="w-[20px] h-[20px]"
        />
      </span>
      Quizzes
    </Link>
  );
};

export default Logo;
