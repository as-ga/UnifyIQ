import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { UserModel } from "@/models";

export async function POST(request: NextRequest) {
  await dbConnect();
  const { name, email, password } = await request.json();
  try {
    if (!name || !email || !password) {
      return NextResponse.json(
        { seccess: false, message: "All fields are Requird" },
        { status: 402 }
      );
    }

    const existUser = await UserModel.findOne({ email });
    if (existUser)
      return NextResponse.json(
        { success: false, message: "User already exists" },
        { status: 403 }
      );

    const newUser = new UserModel({ name, email, password });
    if (!newUser)
      return NextResponse.json(
        { seccess: false, message: "sumthing went worng" },
        { status: 500 }
      );
    await newUser.save();

    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully",
        user: newUser,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: `Failed to register user because ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      },
      { status: 501 }
    );
  }
}
