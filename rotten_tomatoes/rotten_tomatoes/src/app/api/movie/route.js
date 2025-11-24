import { connectMongoDB } from "@/app/lib/mongodb";
import Movie from "@/app/models/movie";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const {
      title,
      description,
      langage,
      popularity,
      release_date,
      poster_path,
    } = await req.json();
    await connectMongoDB();
    const movie = await Movie.create({
      title,
      description,
      langage,
      popularity,
      release_date,
      poster_path,
    });

    return NextResponse.json(
      { message: "movie add.", data: movie },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error });
  }
}

export async function GET() {
  try {
    await connectMongoDB();
    const favoris = await Movie.find();

    return NextResponse.json(
      { message: "All movies.", data: favoris },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error });
  }
}
