import React from "react";

const Header = ({ user, onLogout }) => (
  <header className="bg-blue-600 text-white p-4 shadow-md">
    <div className="flex justify-between items-center">
      <h1 className="text-xl font-bold">SIRS - Rawat Jalan</h1>
      <div className="flex items-center space-x-4">
        <span>
          Welcome, {user?.nama_lengkap} ({user?.role})
        </span>
        <button
          onClick={onLogout}
          className="bg-blue-700 px-3 py-1 rounded hover:bg-blue-800"
        >
          Logout
        </button>
      </div>
    </div>
  </header>
);

export default Header;