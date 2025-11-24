import { connectMongoDB } from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import Comments from "@/app/models/commentaires";

export async function GET(req, { params }) {
  const { id } = await params;
  console.log(await params);
  try {
    await connectMongoDB();
    const comments = await Comments.find({ movieId: id });

    if (!comments) {
      return NextResponse.json(
        { message: "Aucun commentaire" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Comments for Find.", data: comments },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Erreur lors de la récupération" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  // console.log("je suis");

  try {
    const { id } = await params;
    const { content, movieId } = await request.json();
    const updatedcomments = await Comments.findByIdAndUpdate(
      id,
      {
        content,
        movieId,
      },
      { new: true }
    );
    return NextResponse.json(
      { message: "comments modifier", data: updatedcomments },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json();
  }
}
// export async function DELETE(request, { params }) {
//   try {
//     await connectMongoDB();
//     // console.log(params);
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
export async function DELETE(request, { params }) {
  try {
    await connectMongoDB();
    console.log(params);
    const { id } = await params;
    const comments = await Comments.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "notes delete", data: comments },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json();
  }
}
