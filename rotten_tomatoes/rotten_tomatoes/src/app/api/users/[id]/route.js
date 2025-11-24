import { connectMongoDB } from "@/app/lib/mongodb";
import User from "@/app/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
export async function GET(req, { params }) {
    try {
        await connectMongoDB();
        const { id } = await params;

        const user = await User.findById(id);

        if (!user) {
            return NextResponse.json({ message: "Utilisateur introuvable" }, { status: 404 });
        }

        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Erreur lors de la récupération" }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    try {
        await connectMongoDB();
        const { id } = await params
        const deleted = await User.findByIdAndDelete(id);

        if (!deleted) {
            return NextResponse.json({ message: "Utilisateur introuvable" }, { status: 404 });
        }

        return NextResponse.json({ message: "Utilisateur supprimé avec succès" }, { status: 200 });
    } catch (error) {
        console.error("Erreur DELETE /users/[id]:", error);
        return NextResponse.json({ message: "Erreur lors de la suppression" }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    const { username, email, password } = await req.json();
    await connectMongoDB();
    try {
        const { id } = await params;
        const user = await User.findById(id);

        // if (
        //   (username && !username.trim()) ||
        //   (email && !email.trim()) ||
        //   (password && !password.trim())
        // ) {
        //   return NextResponse.json(
        //     {
        //       message:
        //         "Les champs ne peuvent pas être vides ou contenir uniquement des espaces.",
        //     },
        //     { status: 400 }
        //   );
        // }

        if (!user) {
            return NextResponse.json({ message: "Utilisateur introuvable" }, { status: 404 });
        }

        if (username) {
            user.username = username;
        }
        if (email) {
            user.email = email;
        }
        if (password) {
            const hashpass = await bcrypt.hash(password, 10);
            user.password = hashpass;
        }

        user.save();

        return NextResponse.json({ message: "Utilisateur modifié.", date: user }, { status: 201 });
    } catch (error) {
        console.log(error);

    }
}