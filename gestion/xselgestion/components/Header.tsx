"use client";

import { Bell } from "lucide-react";
import { usePathname } from "next/navigation";
// import { DropdownMenuIcons } from "./IConSeting";
import DropdownMenuAvatar from "./IConSeting";

export default function Header() {
  const pathname = usePathname();

  const pageName =
    pathname === "/"
      ? "dashboard"
      : pathname.split("/")[1].charAt(0).toUpperCase() +
        pathname.split("/")[1].slice(1);
  return (
    <header className="flex border-b border-gray-300 py-3 px-4 sm:px-10 bg-white min-h-[65px] tracking-wide">
      <div className="flex flex-wrap items-center gap-4 max-w-screen-3xl h-full mx-auto w-full justify-center">
        <div className="flex items-center justify-center">
          <h1 className="text-xl font-bold text-slate-950">{pageName}</h1>
        </div>
      </div>
      <div className="flex gap-7 justify-between">
        <div>
          <Bell className="relative top-1" />
        </div>
        <div>
          {/* <DropdownMenuIcons /> */}
          <DropdownMenuAvatar />
        </div>
      </div>
    </header>
  );
}
