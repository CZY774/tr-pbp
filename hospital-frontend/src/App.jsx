import React, { useState, useEffect } from "react";
import LoginForm from "./components/auth/LoginForm";
import Header from "./components/common/Header";
import Sidebar from "./components/common/Sidebar";
import Dashboard from "./components/dashboard/Dashboard";
import PasienManager from "./components/pasien/PasienManager";
import KunjunganManager from "./components/kunjungan/KunjunganManager";
import ObatManager from "./components/obat/ObatManager";
import ResepManager from "./components/resep/ResepManager";
import UserManager from "./components/user/UserManager";
import api from "./api/api";

const HospitalApp = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      const verifyToken = async () => {
        try {
          const response = await api.get("/user", token);
          const data = await response.json();
          setUser(data);
        } catch (error) {
          console.error("Error verifying token:", error);
          handleLogout();
        }
      };
      verifyToken();
    }
  }, [token]);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const response = await api.login(credentials);
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.access_token);
        setToken(data.access_token);
        setUser(data.user);
      } else {
        alert("Login failed: " + (data.message || "Invalid credentials"));
      }
    } catch (error) {
      alert("Login error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setActiveTab("dashboard");
  };

  if (!token) {
    return <LoginForm onLogin={login} loading={loading} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={handleLogout} />
      <div className="flex">
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          userRole={user?.role} 
        />
        <main className="flex-1 p-6">
          {activeTab === "dashboard" && <Dashboard token={token} />}
          {activeTab === "pasiens" && <PasienManager token={token} />}
          {activeTab === "kunjungans" && <KunjunganManager token={token} />}
          {activeTab === "obats" && <ObatManager token={token} />}
          {activeTab === "reseps" && <ResepManager token={token} />}
          {activeTab === "users" && user?.role === "admin" && (
            <UserManager token={token} />
          )}
        </main>
      </div>
    </div>
  );
};

export default HospitalApp;