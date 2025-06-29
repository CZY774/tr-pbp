import React from "react";
import { Users, Calendar, Pill, FileText } from "lucide-react";

const Sidebar = ({ activeTab, setActiveTab, userRole }) => {
  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Users,
      roles: ["admin", "dokter", "apoteker"],
    },
    {
      id: "pasiens",
      label: "Pasien",
      icon: Users,
      roles: ["admin", "dokter"],
    },
    {
      id: "kunjungans",
      label: "Kunjungan",
      icon: Calendar,
      roles: ["admin", "dokter"],
    },
    {
      id: "obats",
      label: "Obat",
      icon: Pill,
      roles: ["admin", "apoteker"],
    },
    {
      id: "reseps",
      label: "Resep",
      icon: FileText,
      roles: ["admin", "dokter", "apoteker"],
    },
    { 
      id: "users", 
      label: "User", 
      icon: Users, 
      roles: ["admin"] 
    },
  ];

  return (
    <aside className="w-64 bg-white shadow-md">
      <nav className="p-4">
        {menuItems
          .filter((item) => item.roles.includes(userRole))
          .map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-2 p-3 rounded-lg mb-2 text-left ${
                  activeTab === item.id
                    ? "bg-blue-500 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </button>
            );
          })}
      </nav>
    </aside>
  );
};

export default Sidebar;