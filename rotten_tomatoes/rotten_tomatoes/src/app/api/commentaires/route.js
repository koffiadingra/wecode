import { connectMongoDB } from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import Comments from "@/app/models/commentaires";

export async function POST(req) {
  try {
    const { content, userId, username, movieId } = await req.json();
    await connectMongoDB();
    const comments = await Comments.create({
      content,
      userId,
      username,
      movieId,
    });
    // console.log(comments);

    return NextResponse.json(
      { message: "comments ajouter", data: comments },
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
    const comments = await Comments.find();

    return NextResponse.json(
      { message: "comments reccuperer", data: comments },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json();
  }
}
// export async function PUT(request, { params }) {
//   // console.log("je suis");

//   try {
//     const { id } = await params;
//     const { content, movieId } = await request.json();
//     const updatedcomments = await Comments.findByIdAndUpdate(
//       id,
//       {
//         content,
//         movieId,
//       },
//       { new: true }
//     );
//     return NextResponse.json(
//       { message: "comments modifier", data: updatedcomments },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json();
//   }
// }
// export async function DELETE(request, { params }) {
//   try {
//     await connectMongoDB();
//     console.log(params);
//     const { id } = await params.id;
//     const comments = await Comments.findByIdAndDelete(id);

//     return NextResponse.json(
//       { message: "comments delete", data: comments },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json();
//   }
// }
