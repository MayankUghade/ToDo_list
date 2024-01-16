import connectMongoDB from "@/libs/mongo";
import Topic_Model from "@/models/topic";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const { newTitle: title, newDescription: description } = await request.json();
  await connectMongoDB();
  await Topic_Model.findByIdAndUpdate(id, { title, description });
  return NextResponse.json(
    { message: "Following topic updated successfully" },
    { status: 200 }
  );
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const topic = await Topic_Model.findOne({ _id: id });
  return NextResponse.json({ topic }, { status: 200 });
}
