"use client";
import Film from "@/app/components/Film";
import Head from "@/app/components/Head";
import { useEffect, useState } from "react";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AddFilm() {
  const [donneesEnfant, setDonneesEnfant] = useState("");
  const traiterDonneesEnfant = (nouvellesDonnees) => {
    setDonneesEnfant(nouvellesDonnees);
  };

  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      if (session.user.role !== "admin") {
        router.push("/");
      }
    } else {
      router.push("/");
    }
  }, [session]);

  return (
    <>
      <Head onDataChange={traiterDonneesEnfant} />
      <Film />
    </>
  );
}
