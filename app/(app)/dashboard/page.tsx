"use client";
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// import { IProject } from "@/models/projectModel";

export default function page() {
  const projects = [
    {
      _id: "1",
      name: "Project 1",
      description: "Description for Project 1",
      owner: "Owner 1",
      members: ["Member 1", "Member 2"],
      tasks: [],
    },
    {
      _id: "2",
      name: "Project 2",
      description: "Description for Project 2",
      owner: "Owner 2",
      members: ["Member 3", "Member 4"],
      tasks: [],
    },
  ];

  //   const [projects, setProjects] = useState<IProject[]>([]);

  //   useEffect(() => {
  //     const fetchProjects = async () => {
  //       try {
  //         const response = await axios.get("/api/projects");
  //         setProjects(response.data);
  //       } catch (error) {
  //         console.error("Error fetching projects:", error);
  //       }
  //     };

  //     fetchProjects();
  //   }, []);

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center md:text-left md:mb-6 lg:text-3xl lg:mb-8 md:mt-4 lg:mt-6 text-gray-800 md:text-gray-900 lg:text-gray-900 md:leading-tight lg:leading-tight md:tracking-tight lg:tracking-tight md:font-semibold lg:font-semibold  lg:text-left">
        Dashboard
      </h1>
      <h2 className="text-xl font-semibold mb-4 text-center md:text-left md:mb-6 lg:text-2xl lg:mb-8 text-gray-700 md:text-gray-800 lg:text-gray-800">
        Projects
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <div
            key={project._id}
            className="bg-white/25 shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300"
          >
            <h3 className="text-lg font-semibold mb-2 text-gray-800">
              {project.name}
            </h3>
            <p className="text-gray-600 mb-2">{project.description}</p>
            <p className="text-sm text-gray-500">Owner: {project.owner}</p>
            <p className="text-sm text-gray-500">
              Members: {project.members.join(", ")}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
