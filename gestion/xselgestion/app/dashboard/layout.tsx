// import Footer from '@/components/Footer';
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Sidebar />
      <main className="flex-grow p-6">{children}</main>

      {/* <Footer /> */}
    </div>
  );
}
