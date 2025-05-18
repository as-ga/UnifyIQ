import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import dbConnect from "@/lib/db";
import mongoose from "mongoose";
import { ProjectModel, NotificationModel, TaskModel } from "@/models";
import { z } from "zod";

const taskSchema = z.object({
  title: z.string().min(2),
  description: z.string().optional(),
  assignee: z.string().optional(),
  status: z.enum(["todo", "in-progress", "done"]).default("todo"),
  dueDate: z.string().optional(),
});

interface Params {
  params: {
    id: string;
  };
}

export async function GET(req: Request, { params }: Params) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    const project = await ProjectModel.findById(params.id);

    if (!project) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }

    // Check if the user is a member or owner of the project
    if (
      project.owner.toString() !== session.user._id &&
      !project.members.some(
        (member: mongoose.Types.ObjectId) =>
          member.toString() === session.user._id
      )
    ) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Get all tasks for the project
    const tasks = await TaskModel.find({ project: params.id }).populate(
      "assignee",
      "name email"
    );

    return NextResponse.json(tasks);
  } catch (error) {
    console.error("Error fetching project tasks:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request, { params }: Params) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { title, description, assignee, status, dueDate } =
      taskSchema.parse(body);

    await dbConnect();

    const project = await ProjectModel.findById(params.id);

    if (!project) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }

    // Check if the user is a member or owner of the project
    if (
      project.owner.toString() !== session.user._id &&
      !project.members.some(
        (member: mongoose.Types.ObjectId) =>
          member.toString() === session.user._id
      )
    ) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Create the task
    const task = new TaskModel({
      title,
      description,
      project: params.id,
      assignee: assignee || null,
      status,
      dueDate: dueDate ? new Date(dueDate) : null,
    });

    await task.save();

    // If the task is assigned to someone, create a notification
    if (assignee) {
      await NotificationModel.create({
        type: "task-assigned",
        message: `You have been assigned a new task: ${title}`,
        user: assignee,
        project: params.id,
        task: task._id,
      });
    }

    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid input data", errors: error.errors },
        { status: 400 }
      );
    }

    console.error("Error creating task:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
