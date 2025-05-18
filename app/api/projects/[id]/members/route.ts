import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import dbConnect from "@/lib/db";
import mongoose from "mongoose";
import { UserModel, ProjectModel, NotificationModel } from "@/models";
import { z } from "zod";

const memberSchema = z.object({
  email: z.string().email(),
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

    // Get all members of the project
    const members = await UserModel.find({
      _id: { $in: [...project.members, project.owner] },
    }).select("_id name email");

    return NextResponse.json(members);
  } catch (error) {
    console.error("Error fetching project members:", error);
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
    const { email } = memberSchema.parse(body);

    await dbConnect();

    const project = await ProjectModel.findById(params.id);

    if (!project) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }

    // Check if the user is the owner of the project
    if (project.owner.toString() !== session.user._id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Find the user by email
    const user = await UserModel.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Check if the user is already a member of the project
    if (
      project.members.some(
        (member: mongoose.Types.ObjectId) =>
          member.toString() === user._id.toString()
      )
    ) {
      return NextResponse.json(
        { message: "User is already a member of this project" },
        { status: 400 }
      );
    }

    // Add the user to the project
    project.members.push(user._id);
    await project.save();

    // Create a notification for the user
    await NotificationModel.create({
      type: "project-invite",
      message: `You have been added to the project: ${project.name}`,
      user: user._id,
      project: project._id,
    });

    return NextResponse.json({ message: "Member added successfully" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid input data", errors: error.errors },
        { status: 400 }
      );
    }

    console.error("Error adding project member:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
