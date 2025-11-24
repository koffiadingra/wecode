import { connectMongoDB } from "@/app/lib/mongodb";
import Favoris from "@/app/models/favoris";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await connectMongoDB();

    const { id } = await params;
    const favoris = await Favoris.find({ userId: id });

    return NextResponse.json(
      { message: "Favoris Find.", data: favoris },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error });
  }
}

