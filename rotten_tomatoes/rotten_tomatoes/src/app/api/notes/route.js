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
    console.log(params);

    // const {id} = await params;
    const notes = await Notes.find();

    return NextResponse.json(
      { message: "notes reccuperer", data: notes },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json();
  }
}
// export async function GET(req) {
//   try {
//     // const { note, userId, movieId } = await req.json();
//     await connectMongoDB();
//     const { searchParams } = new URL(req.url);
//     const id = searchParams.get("id");
//     // const notes = await Notes.findById("gggg");
    
//     return NextResponse.json(
//       { message: "notes reccuperer", data: id },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json();
//   }
// }
