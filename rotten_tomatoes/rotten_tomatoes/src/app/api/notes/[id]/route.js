import { connectMongoDB } from "@/app/lib/mongodb";
import Notes from "@/app/models/Notes";
import { NextResponse } from "next/server";


export async function POST(req) {
  try {
    const { note, userId, movieId } = await req.json();
    await connectMongoDB();
    const notes = await Notes.create({ note, userId, movieId });
    console.log(notes);

    return NextResponse.json(
      { message: "notes ajouter", data: notes },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json();
  }
}
export async function GET(req, { params }) {
  try {
    await connectMongoDB();
    // console.log(params);

    const { id } = await params;
    const notes2 = await Notes.find({ movieId: id });

    return NextResponse.json(
      { message: "notes reccuperer", data: notes2 },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json();
  }
}
export async function PUT(request, { params }) {
  // console.log("je suis");

  try {
    const { id } = await params;
    const { note, userId, movieId } = await request.json();
    const updatedNote = await Notes.findByIdAndUpdate(
      id,
      {
        note,
        userId,
        movieId,
      },
      { new: true }
    );
    return NextResponse.json(
      { message: "notes modifier", data: updatedNote },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json();
  }
}
export async function DELETE(request, { params }) {
  try {
    await connectMongoDB();
    console.log(params);
    const { id } = await params;
    const notes2 = await Notes.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "notes delete", data: notes2 },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json();
  }
}
