import { connectMongoDB } from "@/app/lib/mongodb";
import Movie from "@/app/models/movie";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await connectMongoDB();

    const { id } = await params;
    const movie = await Movie.findById(id);

    return NextResponse.json(
      { message: "Movie Find.", data: movie },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectMongoDB();

    const { id } = await params;
    const movie = await Movie.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "Movie Delete.", data: movie },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error });
  }
}

export async function PUT(req, { params }) {
  try {
    await connectMongoDB();

    const { id } = await params;
    const {
      title,
      description,
      langage,
      popularity,
      release_date,
      poster_path,
    } = await req.json();
    const movie = await Movie.findByIdAndUpdate(
      id,
      {
        title: title,
        description: description,
        langage: langage,
        popularity: popularity,
        release_date: release_date,
        poster_path: poster_path,
      },
      { new: true }
    );
    return NextResponse.json(
      { message: "Movie Update.", data: movie },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error });
  }
}
