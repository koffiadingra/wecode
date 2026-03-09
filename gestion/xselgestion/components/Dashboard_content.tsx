import {
  // LayoutGrid,
  // BarChart3,
  // CreditCard,
  Users,
  // Box,
  Bell,
  // Settings,
  // LogOut,
  Menu,
  ArrowRight,
  Search,
  Calendar,
  PlusCircle,
  DollarSign,
  ArrowUpRight,
  ShoppingBag,
  ArrowDownRight,
  PieChart,
  MoreHorizontal,
  Filter,
} from "lucide-react";

export default function Dashboard() {
  return (
    // <div className="flex-1 flex flex-col relative overflow-y-auto overflow-x-hidden scroll-smooth">
    <div>
      {/* Content Container */}
      <div className="md:p-10 w-full max-w-7xl mr-auto ml-auto pt-6 pr-6 pb-6 pl-6 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end gap-4 gap-x-4 gap-y-4 justify-between">
          <div className="">
            <h1 className="md:text-4xl text-dark text-3xl font-semibold tracking-tight font-poppins mb-2">
              Morning, Alex
            </h1>
            <p className="text-slate-500 font-poppins">
              happening with your store today.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-white hover:shadow-sm hover:border-primary/30 hover:text-primary transition-all">
              <Calendar size={18} style={{ color: "rgb(88, 2, 247)" }} />
              <span className="">Last 30 Days</span>
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-white text-sm font-medium shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-0.5 transition-all">
              <PlusCircle size={18} />
              <span>New Report</span>
            </button>
          </div>
        </div>
        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="hover:shadow-[0_8px_30px_-4px_rgba(88,2,247,0.08)] transition-all duration-300 group bg-white border-slate-50 border rounded-2xl pt-6 pr-6 pb-6 pl-6 shadow-[0_2px_20px_-4px_rgba(0,0,0,0.04)]">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-xl bg-pastelPurple text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                <DollarSign size={24} strokeWidth={1.5} />
              </div>
              <span className="flex items-center text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                +12.5% <ArrowUpRight className="ml-1" />
              </span>
            </div>
            <h3 className="text-slate-400 text-sm font-medium mb-1">
              Total Revenue
            </h3>
            <p className="text-dark text-2xl font-bold font-poppins">
              $84,254.00
            </p>
          </div>
          {/* Card 2 */}
          <div className="bg-white rounded-2xl p-6 shadow-[0_2px_20px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_-4px_rgba(88,2,247,0.08)] transition-all duration-300 border border-slate-50 group">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <ShoppingBag size={24} strokeWidth={1.5} />
              </div>
              <span className="flex items-center text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                +5.2% <ArrowUpRight className="ml-1" />
              </span>
            </div>
            <h3 className="text-slate-400 text-sm font-medium mb-1">
              Total Orders
            </h3>
            <p className="text-dark text-2xl font-bold font-poppins">1,254</p>
          </div>
          {/* Card 3 */}
          <div className="bg-white rounded-2xl p-6 shadow-[0_2px_20px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_-4px_rgba(88,2,247,0.08)] transition-all duration-300 border border-slate-50 group">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users size={24} strokeWidth={1.5} />
              </div>
              <span className="flex items-center text-xs font-semibold text-rose-600 bg-rose-50 px-2 py-1 rounded-full">
                -2.1% <ArrowDownRight className="ml-1" />
              </span>
            </div>
            <h3 className="text-slate-400 text-sm font-medium mb-1">
              New Customers
            </h3>
            <p className="text-dark text-2xl font-bold font-poppins">856</p>
          </div>
          {/* Card 4 */}
          <div className="bg-white rounded-2xl p-6 shadow-[0_2px_20px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_-4px_rgba(88,2,247,0.08)] transition-all duration-300 border border-slate-50 group">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <PieChart size={24} strokeWidth={1.5} />
              </div>
              <span className="flex items-center text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                +8.4% <ArrowUpRight className="ml-1" />
              </span>
            </div>
            <h3 className="text-sm font-medium text-slate-400 mb-1">
              Conversion Rate
            </h3>
            <p className="text-dark text-2xl font-bold font-poppins">3.42%</p>
          </div>
        </div>
        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chart */}
          <div className="lg:col-span-2 bg-white border-slate-50 border rounded-2xl pt-6 pr-6 pb-6 pl-6 shadow-[0_2px_20px_-4px_rgba(0,0,0,0.04)]">
            <div className="flex justify-between items-center mb-6">
              <div className="">
                <h3 className="text-dark text-lg font-semibold font-poppins">
                  Revenue Analytics
                </h3>
                <p className="text-xs text-slate-400">Monthly revenue growth</p>
              </div>
              <button className="text-slate-400 hover:text-primary transition-colors">
                <MoreHorizontal size={24} />
              </button>
            </div>
            <div className="h-64 w-full relative">
              <canvas
                id="revenueChart"
                style={{
                  display: "block",
                  boxSizing: "border-box",
                  height: 256,
                  width: "738.7px",
                }}
                width={923}
                height={320}
                className=""
              />
            </div>
          </div>
          {/* Side Widget/Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-[0_2px_20px_-4px_rgba(0,0,0,0.04)] border border-slate-50 flex flex-col">
            <h3 className="text-dark text-lg font-semibold font-poppins mb-1">
              Traffic Source
            </h3>
            <p className="text-xs text-slate-400 mb-6">Device breakdown</p>
            <div className="relative h-48 w-full flex justify-center mb-4">
              <canvas
                id="deviceChart"
                style={{
                  display: "block",
                  boxSizing: "border-box",
                  height: 192,
                  width: "332.5px",
                }}
                width={415}
                height={240}
                className=""
              />
            </div>
            <div className="mt-auto space-y-3">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-primary" />
                  <span className="text-slate-600">Desktop</span>
                </div>
                <span className="font-semibold text-dark">65%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-teal-400" />
                  <span className="text-slate-600">Mobile</span>
                </div>
                <span className="font-semibold text-dark">25%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-orange-400" />
                  <span className="text-slate-600">Tablet</span>
                </div>
                <span className="font-semibold text-dark">10%</span>
              </div>
            </div>
          </div>
        </div>
        {/* Recent Orders Table */}
        <div className="bg-white rounded-2xl shadow-[0_2px_20px_-4px_rgba(0,0,0,0.04)] border border-slate-50 overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="">
              <h3 className="text-dark text-lg font-semibold font-poppins">
                Recent Orders
              </h3>
              <p className="text-xs text-slate-400">Transaction history</p>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search
                  className="absolute left-3 top-2.5 text-slate-400"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Search order..."
                  className="pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-primary/50 transition-colors w-full sm:w-48"
                />
              </div>
              <button className="px-3 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-500">
                <Filter size={18} />
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="">
                <tr className="bg-slate-50/50 border-b border-slate-100 text-xs uppercase tracking-wider text-slate-400 font-semibold">
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="group hover:bg-slate-50/80 transition-colors border-b border-slate-50 last:border-0">
                  <td className="px-6 py-4 font-mono text-slate-500">
                    #ORD-001
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold">
                        JD
                      </div>
                      <span className="font-medium text-dark">John Doe</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    Premium Subscription
                  </td>
                  <td className="px-6 py-4 text-slate-500">Oct 24, 2023</td>
                  <td className="px-6 py-4 font-medium text-dark">$129.00</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                      Completed
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-primary transition-colors">
                      <MoreHorizontal size={20} />
                    </button>
                  </td>
                </tr>
                <tr className="group hover:bg-slate-50/80 transition-colors border-b border-slate-50 last:border-0">
                  <td className="px-6 py-4 font-mono text-slate-500">
                    #ORD-002
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 text-xs font-bold">
                        AS
                      </div>
                      <span className="font-medium text-dark">Sarah Smith</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">UI Design Kit</td>
                  <td className="px-6 py-4 text-slate-500">Oct 23, 2023</td>
                  <td className="px-6 py-4 font-medium text-dark">$49.00</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
                      Pending
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-primary transition-colors">
                      <MoreHorizontal size={20} />
                    </button>
                  </td>
                </tr>
                <tr className="group hover:bg-slate-50/80 transition-colors border-b border-slate-50 last:border-0">
                  <td className="px-6 py-4 font-mono text-slate-500">
                    #ORD-003
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 text-xs font-bold">
                        MK
                      </div>
                      <span className="font-medium text-dark">Mike K.</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    Consultation Hour
                  </td>
                  <td className="px-6 py-4 text-slate-500">Oct 23, 2023</td>
                  <td className="px-6 py-4 font-medium text-dark">$250.00</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                      Completed
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-primary transition-colors">
                      <MoreHorizontal size={20} />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="px-6 py-4 border-t border-slate-50 flex items-center justify-between">
            <p className="text-xs text-slate-500">
              Showing <span className="font-medium text-dark">1-3</span> of{" "}
              <span className="font-medium text-dark">128</span>
            </p>
            <div className="flex gap-2">
              <button className="px-3 py-1 rounded-md border border-slate-200 text-slate-500 hover:border-primary hover:text-primary text-xs transition-colors">
                Prev
              </button>
              <button className="px-3 py-1 rounded-md bg-primary text-white text-xs shadow-md shadow-primary/20">
                1
              </button>
              <button className="px-3 py-1 rounded-md border border-slate-200 text-slate-500 hover:border-primary hover:text-primary text-xs transition-colors">
                2
              </button>
              <button className="px-3 py-1 rounded-md border border-slate-200 text-slate-500 hover:border-primary hover:text-primary text-xs transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>
        {/* Footer */}
        <footer className="mt-8 pb-4 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400">
          <p>© 2023 Aura Dashboard UI. All rights reserved.</p>
          <div className="flex gap-4 mt-2 sm:mt-0">
            <a href="#" className="hover:text-primary">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary">
              Terms of Service
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
