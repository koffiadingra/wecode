import { connectMongoDB } from "@/app/lib/mongodb";
import User from "@/app/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { username, email, password } = await req.json();
    const hashpass = await bcrypt.hash(password, 10);

    if (!username?.trim() || !email?.trim() || !password?.trim()) {
      return NextResponse.json(
        {
          message:
            "Les champs ne peuvent pas être vides ou contenir uniquement des espaces.",
        },
        { status: 400 }
      );
    }

    await connectMongoDB();
    const user = await User.create({
      username: username,
      email: email,
      password: hashpass,
    });

    return NextResponse.json(
      { message: "Utilisateur Enregistré.", data: user },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
