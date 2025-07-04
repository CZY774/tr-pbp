import React, { useState, useEffect } from "react";
import LoginForm from "./components/auth/LoginForm";
import LandingPage from "./components/LandingPage";
import Header from "./components/common/Header";
import Sidebar from "./components/common/Sidebar";
import Dashboard from "./components/dashboard/Dashboard";
import PasienManager from "./components/pasien/PasienManager";
import KunjunganManager from "./components/kunjungan/KunjunganManager";
import ObatManager from "./components/obat/ObatManager";
import ResepManager from "./components/resep/ResepManager";
import UserManager from "./components/user/UserManager";
import RiwayatManager from "./components/riwayat/RiwayatManager";
import EditProfile from "./components/user/EditProfile";
import api from "./api/api";
import authApi from "./api/authApi";

const HospitalApp = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loading, setLoading] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

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
      const response = await authApi.login(credentials);
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("userRole", data.user.role);
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

  const handleLogout = async () => {
    try {
      // Call logout API
      if (token) {
        await authApi.logout(token);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("userRole");
      setToken(null);
      setUser(null);
      setActiveTab("dashboard");
    }
  };

  const handleEditProfile = () => {
    setShowEditProfile(true);
  };

  const handleCloseEditProfile = () => {
    setShowEditProfile(false);
  };

  const handleUpdateProfile = (updatedUser) => {
    setUser(updatedUser);
    setShowEditProfile(false);
  };


  if (!token) {
    if (!showLogin) {
      return <LandingPage onLoginClick={() => setShowLogin(true)} />;
    }
    return <LoginForm onLogin={login} loading={loading} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header
        user={user}
        onLogout={handleLogout}
        onEditProfile={handleEditProfile}
      />

      <div className="flex min-h-screen">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          userRole={user?.role}
        />

        <main className="flex-1 ml-5 p-6 bg-gray-50">
          {activeTab === "dashboard" && <Dashboard token={token} />}
          {activeTab === "pasiens" && <PasienManager token={token} />}
          {activeTab === "kunjungans" && <KunjunganManager token={token} />}
          {activeTab === "obats" && <ObatManager token={token} />}
          {activeTab === "reseps" && <ResepManager token={token} />}
          {activeTab === "users" && user?.role === "admin" && (
            <UserManager token={token} />
          )}
          {activeTab === "riwayats" && <RiwayatManager token={token} />}
        </main>
      </div>

      {/* Edit Profile Modal */}
      {showEditProfile && (
        <EditProfile
          user={user}
          token={token}
          onClose={handleCloseEditProfile}
          onUpdate={handleUpdateProfile}
        />
      )}
    </div>
  );
};

export default HospitalApp;
