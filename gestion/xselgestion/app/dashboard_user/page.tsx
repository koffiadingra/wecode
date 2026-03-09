"use client";

import { useEffect, useState } from "react";

// import Footer from '@/components/Footer';
// import Sidebar from "@/components/Sidebar";
import Dashboard from "@/components/Dashboard_content";

export default function DashboardLayout() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8000/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      const data = await res.json();
      setUser(data);
    };

    fetchData();
  }, []);

  if (!user) return <div>Chargement...</div>;
  return (
    <div className="flex flex-col min-h-screen">
      {/* <Sidebar /> */}
      <main className="flex-grow p-6">
        <Dashboard />
      </main>

      {/* <Footer /> */}
    </div>
  );
}
