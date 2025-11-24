"use client";

import Header from "./components/Header";
import Bienvenue from "./components/Bienvenue";
import Card from "./components/Card";
import Footer from "./components/Footer";
import { useState } from "react";

export default function Home() {
  const [donneesEnfant, setDonneesEnfant] = useState("");
  const traiterDonneesEnfant = (nouvellesDonnees) => {
    setDonneesEnfant(nouvellesDonnees);
  };
  return (
    <div>
      <Header onDataChange={traiterDonneesEnfant} />
      <Bienvenue />
      <Card donneesRecu={donneesEnfant} />
      <Footer />
    </div>
  );
}