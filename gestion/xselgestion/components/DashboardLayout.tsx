"use client";

import { useState, createContext, useContext } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

interface SidebarContextType {
  isCollapsed: boolean;
  toggle: () => void;
}

const SidebarContext = createContext<SidebarContextType>({
  isCollapsed: false,
  toggle: () => {},
});

export const useSidebar = () => useContext(SidebarContext);

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggle = () => setIsCollapsed((prev) => !prev);

  return (
    <SidebarContext.Provider value={{ isCollapsed, toggle }}>
      <div className="flex h-screen overflow-hidden bg-gray-50">

        <aside
          className={`
            h-screen overflow-y-auto overflow-x-hidden
            flex-shrink-0 z-20
            transition-[width] duration-300 ease-in-out
            ${isCollapsed ? "w-16" : "w-64"}
          `}
        >
          <Sidebar isCollapsed={isCollapsed} onToggle={toggle} />
        </aside>

        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">

          <header className="sticky top-0 z-10 flex-shrink-0">
            <Header />
          </header>

          <main className="flex-1 overflow-y-auto overflow-x-hidden">
            {children}
          </main>

        </div>
      </div>
    </SidebarContext.Provider>
  );
}