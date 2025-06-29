import React from "react";
import { Users } from "lucide-react";

const StatCard = ({ title, value, color }) => {
  const colors = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    yellow: "bg-yellow-500",
    red: "bg-red-500",
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div
        className={`w-12 h-12 ${colors[color]} rounded-lg mb-4 flex items-center justify-center`}
      >
        <Users className="text-white" size={24} />
      </div>
      <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value || 0}</p>
    </div>
  );
};

export default StatCard;