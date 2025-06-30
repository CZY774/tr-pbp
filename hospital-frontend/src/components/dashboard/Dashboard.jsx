import React, { useEffect, useState } from "react";
import StatCard from "../common/StatCard";
import api from "../../api/api";

const Dashboard = ({ token }) => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await api.get("/dashboard/stats", token);
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [token]);

   if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Pasien"
          value={stats.total_pasiens}
          color="blue"
        />
        <StatCard
          title="Kunjungan Hari Ini"
          value={stats.kunjungan_hari_ini}
          color="green"
        />
        <StatCard
          title="Kunjungan Menunggu"
          value={stats.kunjungan_menunggu}
          color="yellow"
        />
        <StatCard
          title="Resep Menunggu"
          value={stats.resep_menunggu}
          color="red"
        />
      </div>
    </div>
  );
};

export default Dashboard;
