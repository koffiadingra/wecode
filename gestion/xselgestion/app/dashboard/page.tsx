import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-grow ml-64 p-6 bg-gray-50 transition-all duration-300">
        {children}
      </main>
    </div>
  );
}
