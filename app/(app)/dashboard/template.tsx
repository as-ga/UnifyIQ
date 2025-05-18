"use client";
import React from "react";

import { usePathname } from "next/navigation";
import { ChartNoAxesGantt, CircleCheck, LogOut, Plus } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";

const DashboardTemplate = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const sidebar = [
    {
      name: "Dashboard",
      slug: "/dashboard",
      icon: ChartNoAxesGantt,
    },
    {
      name: "Add Project",
      slug: "/dashboard/add-project",
      icon: ChartNoAxesGantt,
    },
    {
      name: "Assign Task",
      slug: "/dashboard/assign-task",
      icon: CircleCheck,
    },
    {
      name: "Track Progress",
      slug: "/dashboard/track-progress",
      icon: CircleCheck,
    },
  ];
  return (
    <div>
      {/* <nav className=" bg-[#badbfa] w-full flex relative justify-between items-center mx-auto px-8 h-20">
     

        <div className="inline-flex">
          <Image src="/logo.jpeg" height={60} width={60} alt="logo" />
        </div>
        <div className="hidden sm:block flex-shrink flex-grow-0 justify-start px-2">
          <div className="inline-block">
            <div className="inline-flex items-center max-w-full">
              <button
                className="flex bg-white items-center flex-grow-0 flex-shrink pl-2 relative w-60 border rounded-full px-1  py-1"
                type="button"
              >
                <div className="block bg-white flex-grow flex-shrink overflow-hidden">
                  Start your search
                </div>
                <div className="flex items-center justify-center relative  h-8 w-8 rounded-full">
                  <svg
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="presentation"
                    focusable="false"
                    style={{
                      display: "block",
                      fill: "none",
                      height: 12,
                      width: 12,
                      stroke: "currentcolor",
                      strokeWidth: "5.33333",
                      overflow: "visible",
                    }}
                  >
                    <g fill="none">
                      <path d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9" />
                    </g>
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>
        
        
        <div className="flex-initial">
          <div className="flex justify-end items-center relative">
            <div className="flex mr-4 items-center">
              <a
                className="inline-block py-2 px-3 hover:bg-gray-200 rounded-full"
                href="#"
              >
                <div className="flex items-center relative cursor-pointer whitespace-nowrap">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                </div>
              </a>
              <a
                className="inline-block py-2 px-3 hover:bg-gray-200 rounded-full"
                href="#"
              >
                <div className="flex items-center relative cursor-pointer whitespace-nowrap">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                    />
                  </svg>
                </div>
              </a>
            </div>
            <div className="block">
              <div className="inline relative ">
                <button
                  type="button"
                  className="inline-flex items-center justify-center relative px-2 border rounded-full hover:shadow-lg"
                >
                  <div className="block flex-grow-0  flex-shrink-0 h-10 w-12 pl-5">
                    <svg
                      viewBox="0 0 32 32"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      role="presentation"
                      focusable="false"
                      style={{
                        display: "block",
                        height: "100%",
                        width: "100%",
                        fill: "currentcolor",
                      }}
                    >
                      <path d="m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z" />
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav> */}
      <aside className="flex ">
        <section>
          <div className="relative bg-[#c9e5ff] flex h-[calc(100vh-2rem)] w-full max-w-[20rem] flex-col   bg-clip-border p-4 text-gray-700 shadow-xl shadow-blue-gray-900/5">
            <div className="p-4 mb-2">
              <h5 className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                Dashboard
              </h5>
            </div>
            <nav className="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
              {sidebar.map((item) => (
                <Link
                  key={item.slug}
                  href={item.slug}
                  className={cn(
                    "flex items-center w-full p-0 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-900 cursor-pointer",
                    pathname === item.slug
                      ? "bg-blue-50 text-blue-900"
                      : "text-blue-700 hover:text-blue-900 "
                  )}
                >
                  <button
                    type="button"
                    className="flex items-center justify-between w-full p-3 font-sans text-xl antialiased font-semibold leading-snug text-left transition-colors border-b-0 cursor-pointer"
                  >
                    <div className="grid mr-4 place-items-center">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <p className="block mr-auto font-sans text-base antialiased font-normal leading-relaxed text-blue-gray-900">
                      {item.name}
                    </p>
                    <Plus />
                  </button>
                </Link>
              ))}
              <hr className="my-2 border-blue-gray-50" />
              <div
                role="button"
                className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900 cursor-pointer"
                onClick={() => {
                  signOut({ callbackUrl: "/" });
                }}
              >
                <div className="grid mr-4 place-items-center">
                  <LogOut className="w-5 h-5" />
                </div>
                Log Out
              </div>
            </nav>
          </div>
        </section>
        {children}
      </aside>
    </div>
  );
};

export default DashboardTemplate;
