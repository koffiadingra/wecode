import Link from "next/link";
import Image from "next/image";
import xsel_image from "@/public/xsel_logo.png";
import {
  LayoutDashboard,
  Package,
  Warehouse,
  ShoppingCart,
  Users,
} from "lucide-react";

const menuItems = [
  { href: "/dashboard", title: "Tableau de bord", icon: LayoutDashboard },
  { href: "/produits", title: "Produits", icon: Package },
  { href: "/inventaire", title: "Inventaire", icon: Warehouse },
  { href: "/commande", title: "Commande", icon: ShoppingCart },
  { href: "/create_client", title: "Client", icon: Users },
];

const Sidebar = () => {
  return (
    <aside className="fixed top-0 left-0 h-full w-64 bg-gray-300 text-white shadow-lg">
      <div className="p-6">
        <Image
          src={xsel_image}
          alt="Picture"
        />
      </div>
      <nav>
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 p-4 hover:bg-gray-700"
          >
            <item.icon size={20} />
            {item.title}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;