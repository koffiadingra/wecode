"use client";
// import ReactDOM from "react-dom";
import Image from "next/image";
import RightImage from "../../public/image.png";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import xsel_image from "../../public/xsel_logo.png";
import Link from "next/link";
// import { useRouter } from "next/router";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";

interface formData {
  email: string;
  password: string;
}

const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default function Login() {
  const { register, handleSubmit } = useForm<formData>();
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // const [password, setPassword] = useState("");
  // const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit: SubmitHandler<formData> = async (data) => {
    console.log(data);

    try {
      await api.get("/sanctum/csrf-cookie");
      // console.log(email);
      const response = await api.post("/api/auth/login", data);

      if (response.status === 200) {
        console.log("Login successful:", response.data);
        router.push("/dashboard");
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.error || "Login failed");
      } else {
        setError("An unexpected error occurred");
      }
    }
  };
  return (
    <div className="flex min-h-screen bg-zinc-100 font-sans dark:bg-black sticky top-0 ">
      {/* bloc de gauche */}
      <div className="w-1/2 flex flex-col items-center justify-center h-screen gap-5">
        <div>
          <Image
            src={xsel_image}
            alt="Picture"
            className="w-full h-full border rounded-lg object-cover"
          />
        </div>

        <div>
          <div className="text-center mb-10">
            <h1 className="text-2xl font-bold">AUTHENTIFICATION</h1>
            <p className="text-cyan-900">
              Veuillez entrer un email et un mot de passe.
            </p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center justify-center p-4 gap-4"
          >
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div className="flex flex-col space-y-2">
              <label htmlFor="email">Adresse mail</label>
              <input
                type="email"
                id="email"
                placeholder="Adresse mail"
                {...register("email")}
                className="border rounded-lg w-[350px] p-2 py-2.5 ps-3.5 pe-10 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-300"
                required
              />
            </div>

            <div className="relative">
              <label htmlFor="password" className="block mb-2">
                Mot de passe
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="mot de passe"
                {...register("password")}
                className="border rounded-lg w-[350px] p-2 py-2.5 ps-3.5 pe-10 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-300"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute inset-y-0 right-0 flex items-center pe-3 py-14  focus:outline-none ${
                  showPassword ? "text-gray-200" : "text-gray-500"
                }`}
                aria-label={
                  showPassword
                    ? "Cacher le mot de passe"
                    : "Afficher le mot de passe"
                }
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            <div className="flex gap-10 items-center justify-between mb-10">
              <div>
                <input
                  type="checkbox"
                  id="remember"
                  className="bg-gray-200"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="remember" className="ml-2 ">
                  Se souvenir de moi
                </label>
              </div>
              <div>
                <Link
                  // href="/create_client"
                  href="/dashboard"
                  className="text-sm text-black font-bold "
                >
                  Mot de passe oublié?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="bg-black font-bold text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors w-[350px]
                transition duration-300 hover:text-white cursor-pointer
                "
              >
                Se connecter
              </button>
              {/* <input type="submit" /> */}
            </div>
          </form>
        </div>
      </div>

      {/* bloc de droite */}
      <div className="w-1/2 p-3 fixed right-0 top-0 h-screen">
        <Image
          src={RightImage}
          alt="Image de fond"
          className="w-full h-full max-w-full border rounded-lg object-cover"
        />
      </div>
    </div>
  );
}
