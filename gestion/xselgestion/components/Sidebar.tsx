"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Warehouse,
  ShoppingCart,
  Users,
  FileText,
  ChartColumn,
  Menu,
} from "lucide-react";
import xsel_image from "../public/xsel_logo.png";

interface User {
  name: string;
  email: string;
}

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const getInitials = (name: string): string => {
  if (!name) return "??";
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const fetchCurrentUser = async (): Promise<User | null> => {
  try {
    const response = await fetch("http://localhost:8000/api/user", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      console.error("Erreur API utilisateur :", response.status);
      return null;
    }

    const data = await response.json();
    return {
      name: data.name ?? data.data?.name ?? "",
      email: data.email ?? data.data?.email ?? "",
    };
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur :", error);
    return null;
  }
};

const menuItems = [
  { href: "/dashboard", title: "Tableau de bord", icon: LayoutDashboard },
  { href: "/produits", title: "Produits", icon: Package },
  { href: "/inventaire", title: "Inventaire", icon: Warehouse },
  { href: "/commande", title: "Commandes", icon: ShoppingCart },
  { href: "/Devis", title: "Devis", icon: FileText },
  { href: "/Clients", title: "Clients", icon: Users },
  { href: "/analytiques", title: "Analytiques", icon: ChartColumn },
];

const Sidebar = ({ isCollapsed, onToggle }: SidebarProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const loadUser = async () => {
      setLoadingUser(true);
      const userData = await fetchCurrentUser();
      setUser(userData);
      setLoadingUser(false);
    };
    loadUser();
  }, []);

  const initials = user ? getInitials(user.name) : "??";

  return (
    // ✅ Plus de "fixed" — la largeur est pilotée par DashboardLayout
    <aside className="h-full bg-white border-r border-gray-200 shadow-sm flex flex-col">
      {/* Header logo + bouton toggle */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
        {!isCollapsed && (
          <div className="flex items-center">
            <Image
              src={xsel_image}
              alt="Logo"
              height={36}
              className="object-contain"
            />
          </div>
        )}
        <button
          onClick={onToggle}
          className="p-1.5 rounded-md hover:bg-slate-300 text-gray-500"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              title={isCollapsed ? item.title : ""}
              className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors duration-150 ${
                isActive
                  ? "bg-slate-50 text-slate-950"
                  : "text-gray-600 hover:bg-gray-100 hover:text-slate-950"
              }`}
            >
              <item.icon
                size={20}
                className={`shrink-0 ${
                  isActive
                    ? "text-slate-950"
                    : "text-gray-500 group-hover:text-slate-950"
                }`}
              />
              {!isCollapsed && (
                <span className="text-sm font-medium">{item.title}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Profil utilisateur — déployé */}
      {!isCollapsed && (
        <div className="border-t border-gray-100 px-4 py-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center text-sm font-bold text-gray-700 shrink-0">
            {loadingUser ? "..." : initials}
          </div>
          <div className="overflow-hidden">
            {loadingUser ? (
              <>
                <div className="h-3 w-24 bg-gray-200 rounded animate-pulse mb-1" />
                <div className="h-2 w-32 bg-gray-100 rounded animate-pulse" />
              </>
            ) : (
              <>
                <p className="text-sm font-semibold text-gray-800 truncate">
                  {user?.name ?? "Inconnu"}
                </p>
                <p className="text-xs text-gray-400 truncate">
                  {user?.email ?? ""}
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {/* Profil utilisateur — réduit */}
      {isCollapsed && (
        <div className="border-t border-gray-100 px-2 py-4 flex justify-center">
          <div
            className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center text-sm font-bold text-gray-700"
            title={user?.name ?? ""}
          >
            {loadingUser ? "..." : initials}
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;