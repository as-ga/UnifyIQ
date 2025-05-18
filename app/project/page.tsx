"use client";
import React from "react";
import Image from "next/image";
import { useState,useEffect } from "react";

interface IProjects {
    title: string;
    description: string;
  }
  
  interface ITask {
    title: string;
    description: string;
  }
  
  const ProjectTab = () => {
    const [projects, setProjects] = useState<IProjects[]>([]);
    
    useEffect(() => {
      fetch("/api/projects")
        .then((res) => res.json())
        .then((data) => setProjects(data))
        .catch((err) => console.error("Failed to load projects:", err));
    }, []);
    return (
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">Projects</h2>
          {projects.length === 0 ? (
            <p>No projects found. Time to get productive, babe.</p>
          ) : (
            <ul className="space-y-2">
              {projects.map((project, index) => (
                <li key={index} className="p-4 bg-white shadow rounded">
                  <h3 className="text-lg font-semibold">{project.title}</h3>
                  <p>{project.description}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      );}

      const TaskTab = () => {
        const [tasks, setTasks] = useState<ITask[]>([]);
        
        useEffect(() => {
          fetch("/api/tasks")
            .then((res) => res.json())
            .then((data) => setTasks(data))
            .catch((err) => console.error("Failed to load tasks:", err));
        }, []);
        
        return (
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Tasks</h2>
            {tasks.length === 0 ? (
              <p>No tasks found. Time to get productive, babe.</p>
            ) : (
              <ul className="space-y-2">
                {tasks.map((task, index) => (
                  <li key={index} className="p-4 bg-white shadow rounded">
                    <h3 className="text-lg font-semibold">{task.title}</h3>
                    <p>{task.description}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      };

      const progressData = {
        completed: [
          "Initial team kickoff meeting done",
          "Requirement gathering completed",
          "Project documentation uploaded"
        ],
        inProgress: [
          "Design phase under review",
          "Weekly status report drafting"
        ],
        upcoming: [
          "Client feedback session",
          "Assign roles for next sprint",
          "Prepare budget estimate"
        ]
      };
  
      interface TaskSectionProps {
        title: string;
        tasks: string[];
        color: string;
      }
      const TaskSection = ({ title, tasks, color }: TaskSectionProps) => (
        <div>
          <h3 className={`text-lg font-bold text-${color}-800 dark:text-${color}-200`}>
            {title}
          </h3>
          <ul className="space-y-2 mt-2">
            {tasks.map((task, index) => (
              <li
                key={index}
                className={`bg-${color}-100 dark:bg-${color}-800 text-${color}-900 dark:text-${color}-100 p-3 rounded-xl shadow-sm`}
              >
                {task}
              </li>
            ))}
          </ul>
        </div>
      );
  
      const ProgressTab = () => (
        <div role="tabpanel" className="space-y-6 p-4">
          <TaskSection title="✅ Completed" tasks={progressData.completed} color="green" />
          <TaskSection title="🔧 In Progress" tasks={progressData.inProgress} color="yellow" />
          <TaskSection title="🧠 Upcoming" tasks={progressData.upcoming} color="blue" />
        </div>
      );
  

const page = () => {
  const [activeTab, setActiveTab] = useState("Project");
  const tabs = ["Project", "Task", "Progress"];
  return (
    <div>
      <nav className=" bg-[#badbfa] w-full flex relative justify-between items-center mx-auto px-8 h-20">
        {/* logo */}
        <div className="inline-flex">
          <Image src="/logo.jpeg" height={60} width={60} alt="logo" />
        </div>
        <div className="hidden sm:block flex-shrink flex-grow-0 justify-start px-2">
          <div className="inline-block">
            <div className="inline-flex items-center max-w-full">
              <button
                className="flex bg-white items-center flex-grow-0 flex-shrink pl-2 relative w-60 border rounded-full px-1  py-1"
                type="button">
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
                    }}>
                    <g fill="none">
                      <path d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9" />
                    </g>
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>
        {/* end search bar */}
        {/* login */}
        <div className="flex-initial">
          <div className="flex justify-end items-center relative">
            <div className="flex mr-4 items-center">
              <a
                className="inline-block py-2 px-3 hover:bg-gray-200 rounded-full"
                href="#">
                <div className="flex items-center relative cursor-pointer whitespace-nowrap">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-6">
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
                href="#">
                <div className="flex items-center relative cursor-pointer whitespace-nowrap">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-6">
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
                  className="inline-flex items-center justify-center relative px-2 border rounded-full hover:shadow-lg">
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
                      }}>
                      <path d="m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z" />
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <aside className="flex ">
        {/* sidebar section */}
        <section>
          <div className="relative bg-[#c9e5ff] flex h-[calc(100vh-2rem)] w-full max-w-[20rem] flex-col   bg-clip-border p-4 text-gray-700 shadow-xl shadow-blue-gray-900/5">
            <div className="p-4 mb-2">
              <h5 className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                Dashboard
              </h5>
            </div>
            <nav className="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
              <div className="relative block w-full">
                <div
                  role="button"
                  className="flex items-center w-full p-0 leading-tight transition-all rounded-lg outline-none bg-blue-gray-50/50 text-start text-blue-gray-700 hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                  <button
                    type="button"
                    className="flex items-center justify-between w-full p-3 font-sans text-xl antialiased font-semibold leading-snug text-left transition-colors border-b-0 select-none border-b-blue-gray-100 text-blue-gray-900 hover:text-blue-gray-900">
                    <div className="grid mr-4 place-items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="size-6">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z"
                        />
                      </svg>
                    </div>
                    <p className="block mr-auto font-sans text-base antialiased font-normal leading-relaxed text-blue-gray-900">
                      Add Project
                    </p>
                    <span className="ml-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="size-6">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M12 4.5v15m7.5-7.5h-15"
                        />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
              <div className="relative block w-full">
                <div
                  role="button"
                  className="flex items-center w-full p-0 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                  <button
                    type="button"
                    className="flex items-center justify-between w-full p-3 font-sans text-xl antialiased font-semibold leading-snug text-left transition-colors border-b-0 select-none border-b-blue-gray-100 text-blue-gray-700 hover:text-blue-gray-900">
                    <div className="grid mr-4 place-items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="None"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="size-6">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672Zm-7.518-.267A8.25 8.25 0 1 1 20.25 10.5M8.288 14.212A5.25 5.25 0 1 1 17.25 10.5"
                        />
                      </svg>
                    </div>
                    <p className="block mr-auto font-sans text-base antialiased font-normal leading-relaxed text-blue-gray-900">
                      Assign Task
                    </p>
                    <span className="ml-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="size-6">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M12 4.5v15m7.5-7.5h-15"
                        />
                      </svg>
                    </span>
                  </button>
                </div>
                <div className="overflow-hidden">
                  <div className="block w-full py-1 font-sans text-sm antialiased font-light leading-normal text-gray-700">
                    <nav className="flex min-w-[240px] flex-col gap-1 p-0 font-sans text-base font-normal text-blue-gray-700">
                      <div
                        role="button"
                        className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                        <div className="grid mr-4 place-items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                            className="w-5 h-5">
                            <path
                              fillRule="evenodd"
                              d="M2.25 2.25a.75.75 0 000 1.5H3v10.5a3 3 0 003 3h1.21l-1.172 3.513a.75.75 0 001.424.474l.329-.987h8.418l.33.987a.75.75 0 001.422-.474l-1.17-3.513H18a3 3 0 003-3V3.75h.75a.75.75 0 000-1.5H2.25zm6.04 16.5l.5-1.5h6.42l.5 1.5H8.29zm7.46-12a.75.75 0 00-1.5 0v6a.75.75 0 001.5 0v-6zm-3 2.25a.75.75 0 00-1.5 0v3.75a.75.75 0 001.5 0V9zm-3 2.25a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        Track Progress
                      </div>
                    </nav>
                  </div>
                </div>
              </div>
              <hr className="my-2 border-blue-gray-50" />
              <div
                role="button"
                className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                <div className="grid mr-4 place-items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-5 h-5">
                    <path
                      fillRule="evenodd"
                      d="M12 2.25a.75.75 0 01.75.75v9a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM6.166 5.106a.75.75 0 010 1.06 8.25 8.25 0 1011.668 0 .75.75 0 111.06-1.06c3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788a.75.75 0 011.06 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                Log Out
              </div>
            </nav>
          </div>
        </section>
        {/* tabs */}
        {/* tabs and content section */}
        <section className="flex-1">
          <div className="tabs">
            <div className="block w-full p-1 m-1">
              <ul className="flex border-b border-gray-200 space-x-3 transition-all duration-300 -mb-px">
                {tabs.map((tab) => (
                  <li key={tab}>
                    <button
                      onClick={() => setActiveTab(tab)}
                      className={`inline-block py-4 px-6 text-gray-500 hover:text-gray-800 font-medium border-b-2 border-transparent ${
                        activeTab === tab
                          ? "border-b-indigo-600 text-indigo-600"
                          : ""
                      }`}
                      role="tab">
                      {tab}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Tab content */}
          <div className="tab-content">
            {activeTab === "Project" && <ProjectTab />}
            {activeTab === "Task" && <TaskTab />}
            {activeTab === "Progress" && <ProgressTab />}
          </div>
        </section>
      </aside>
    </div>
  );
};

export default page;
