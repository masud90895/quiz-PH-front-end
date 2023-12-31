"use client";
import React from "react";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { FaBars, FaBarsStaggered, FaMagnifyingGlass } from "react-icons/fa6";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { NavList } from "@/constants/NavList";
import Link from "next/link";
import Logo from "../Logo/Logo";
import { getUserDataFromLC, logout } from "@/utils/local-storage";

const Navbar = () => {
  // get current path
  const pathname = usePathname();
  const router = useRouter();

  // is user logged in?
  // const isLoggedIn = false;

  const isLoggedIn = getUserDataFromLC();

  const handleLogout = async () => {
    await logout();
    await router.push("/login");
  };

  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="common">
            <div className="flex h-16 justify-between items-center">
              <div className="flex px-2 lg:px-0">
                <Logo />
                <div className="hidden lg:ml-6 lg:flex lg:space-x-8 items-center">
                  {NavList.map((item, i) => (
                    <Link key={i} href={item.path}>
                      <span
                        className={`inline-flex items-center border-b-2  px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 ${
                          pathname === item.path
                            ? "border-blue-500 text-gray-900 "
                            : " border-transparent"
                        }`}
                      >
                        {item.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-end">
                <div className="w-full max-w-lg lg:max-w-xs">
                  <label htmlFor="search" className="sr-only">
                    Search
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <FaMagnifyingGlass
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      id="search"
                      name="search"
                      className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                      placeholder="Search"
                      type="search"
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center lg:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <FaBars className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <FaBarsStaggered
                      className="block h-6 w-6"
                      aria-hidden="true"
                    />
                  )}
                </Disclosure.Button>
              </div>

              {/* Mobile menu, show/hide based on menu state. */}
              {isLoggedIn ? (
                <div className="hidden lg:ml-4 lg:flex lg:items-center">
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-4 flex-shrink-0">
                    <div>
                      <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        <span className="sr-only">Open user menu</span>
                        <Image
                          className="h-8 w-8 rounded-full"
                          src="https://i.ibb.co/k53Qz5y/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
                          alt=""
                          width={100}
                          height={100}
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {isLoggedIn?.role === "admin" && (
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="/dashboard"
                                className={
                                  "block px-4 py-2 text-sm text-gray-700"
                                }
                              >
                                Dashboard
                              </Link>
                            )}
                          </Menu.Item>
                        )}

                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={
                                "block px-4 py-2 text-sm text-gray-700"
                              }
                            >
                              Your Profile
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={
                                "block px-4 py-2 text-sm text-gray-700"
                              }
                            >
                              Settings
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={handleLogout}
                              className={
                                "block px-4 py-2 text-sm text-gray-700 hover:bg-red-600 hover:text-white w-full transition-all duration-500 ease-in-out text-left"
                              }
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              ) : (
                <Link href="/login" className="hidden md:block">
                  <span className="rounded-full border-2 border-blue-600 px-6 py-1 text-blue-600  hover:bg-blue-600 hover:text-white">
                    Login
                  </span>
                </Link>
              )}
            </div>
          </div>

          <Disclosure.Panel className="lg:hidden transition-all duration-500 ease-in-out  ">
            <div className="space-y-1 pb-3 pt-2">
              {NavList.map((item, i) => (
                <Disclosure.Button
                  key={i}
                  as="a"
                  href={item.path}
                  className={` block border-l-4  py-2 pl-3 pr-4 text-base font-medium 
                  ${
                    pathname === item.path
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
                  }`}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>

            {isLoggedIn ? (
              <div className="border-t border-gray-200 pb-3 pt-4">
                <div className="mt-3 space-y-1">
                  <Disclosure.Button
                    as="a"
                    href="#"
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                  >
                    Your Profile
                  </Disclosure.Button>
                  <Disclosure.Button
                    as="a"
                    href="#"
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                  >
                    Settings
                  </Disclosure.Button>
                  <Disclosure.Button
                    as="a"
                    href="#"
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                  >
                    Sign out
                  </Disclosure.Button>
                </div>
              </div>
            ) : (
              <div className="border-t border-gray-200 my-1  w-full">
                <div className=" space-y-1">
                  <Link href="/login" className="block md:hidden w-full">
                    <span
                      
                      id="login"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white !bg-blue-600 !hover:bg-blue-400 w-full "
                    >
                      Login
                    </span>
                  </Link>
                </div>
              </div>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
