// import Footer from '@/components/Footer';
// import Sidebar from "@/components/Sidebar";
import Dashboard from "@/components/dashboard_content";

export default function DashboardLayout(){
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
