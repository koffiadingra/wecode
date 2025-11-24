import { connectMongoDB } from "@/app/lib/mongodb";
import Favoris from "@/app/models/favoris";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { userId, movieId } = await req.json();
    await connectMongoDB();
    const favoris = await Favoris.create({ userId, movieId });

    return NextResponse.json(
      { message: "Favoris add.", data: favoris },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error });
  }
}

export async function DELETE(req) {
  try {
    await connectMongoDB();

    const { userId, movieId } = await req.json()
    console.log({ userId, movieId })
    const favoris = await Favoris.deleteMany({ userId, movieId });

    return NextResponse.json(
      { message: "Favoris Delete.", data: favoris },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error });
  }
}