import connectMongoDb from "@/libs/mongo";
import Topic_Model from "@/models/topic";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { title, description } = await request.json();
    await connectMongoDb();
    await Topic_Model.create({ title, description });
    return NextResponse.json({ message: "Topic Created" }, { status: 201 });
  } catch (error) {
    console.error("Error in POST function:", error);
    return NextResponse.error({
      message: "Internal Server Error",
      status: 500,
    });
  }
}

export async function GET() {
  await connectMongoDb();
  const topics = await Topic_Model.find();
  return NextResponse.json({ topics });
}

export async function DELETE(request) {
  const id = await request.nextUrl.searchParams.get("id");
  await connectMongoDb();
  await Topic_Model.findByIdAndDelete(id);
  return NextResponse.json(
    { message: "The Item deleted successfully" },
    { status: "400" }
  );
}
