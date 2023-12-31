"use client";
import Logo from "@/components/shared/Logo/Logo";
import { DashboardNavbarList } from "@/constants/DashboardNavbar";
import { IUser } from "@/interfaces/IUser";
import { getUserDataFromLC } from "@/utils/local-storage";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const DashboardSidebar = () => {
  const user: IUser | null = getUserDataFromLC();

  const pathName = usePathname();


  return (
    <aside className="fixed z-50 md:relative">
      {/* <!-- Sidebar --> */}
      <input type="checkbox" className="peer hidden" id="sidebar-open" />
      <label
        className="peer-checked:rounded-full peer-checked:p-2 peer-checked:right-6 peer-checked:bg-gray-600 peer-checked:text-white absolute top-8 z-20 mx-4 cursor-pointer md:hidden"
        htmlFor="sidebar-open"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </label>
      <nav
        aria-label="Sidebar Navigation"
        className="peer-checked:w-64 left-0 z-10 flex h-screen w-0 flex-col overflow-hidden bg-gray-700 text-white transition-all md:h-screen md:w-64 lg:w-72"
      >
        <div className="bg-slate-800 mt-5 py-4 pl-10 md:mt-10">
          <Logo />
        </div>
        <ul className="mt-8 space-y-3 md:mt-20">
          {DashboardNavbarList.map((item) => (
            <Link href={item.link} key={item?.id} className="relative">
              <button className="focus:bg-slate-600 hover:bg-slate-600 flex w-full space-x-2 rounded-md px-10 py-4 font-semibold focus:outline-none items-center">
                <span>
                  <item.icon />
                </span>
                <span className="">{item.title}</span>
              </button>
              {pathName === item.link && (
                <svg
                  className="text-slate-200 absolute -right-1 -top-1/2 z-10 hidden h-32 w-8 md:block"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="399.349 57.696 100.163 402.081"
                  width="1em"
                  height="4em"
                >
                  <path
                    fill="currentColor"
                    d="M 499.289 57.696 C 499.289 171.989 399.349 196.304 399.349 257.333 C 399.349 322.485 499.512 354.485 499.512 458.767 C 499.512 483.155 499.289 57.696 499.289 57.696 Z"
                  />
                </svg>
              )}
            </Link>
          ))}
        </ul>

        <div className="my-6 mt-auto ml-10 flex cursor-pointer items-center">
          <div>
            <Image
              className="h-12 w-12 rounded-full"
              src="https://i.ibb.co/k53Qz5y/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
              alt="Profile picture"
              width={48}
              height={48}
            />
          </div>
          <div className="ml-3">
            <p className="font-medium">{user?.name}</p>
            <p className="text-sm text-gray-300">{user?.email}</p>
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
