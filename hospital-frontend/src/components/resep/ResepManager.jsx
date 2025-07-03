import React, { useState, useEffect } from "react";
import { Plus, Search, Edit, Trash2, FileText } from "lucide-react";
import api from "../../api/api";
import authApi from "../../api/authApi";
import obatApi from "../../api/obatApi";
import resepApi from "../../api/resepApi";
import ResepForm from "./ResepForm";

const ResepManager = ({ token }) => {
  const [reseps, setReseps] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingResep, setEditingResep] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [kunjungans, setKunjungans] = useState([]);
  const [dokters, setDokters] = useState([]);
  const [apotekers, setApotekers] = useState([]);
  const [obats, setObats] = useState([]);
  const [userRole, setUserRole] = useState(""); // Tambahan
  const [loading, setLoading] = useState(true);
  const isDokter = userRole === "dokter";

  useEffect(() => {
    fetchReseps();
    fetchKunjungans();
    fetchDokters();
    fetchApotekers();
    fetchObats();

    const role = localStorage.getItem("userRole"); // Ambil role dari localStorage
    setUserRole(role); // Simpan role ke state
  }, []);

  const fetchReseps = async () => {
    try {
      setLoading(true);
      const response = await resepApi.get("/reseps", token);
      const data = await response.json();
      setReseps(data);
    } catch (error) {
      console.error("Error fetching reseps:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchKunjungans = async () => {
    try {
      const response = await api.get("/kunjungans", token);
      const data = await response.json();
      setKunjungans(data);
    } catch (error) {
      console.error("Error fetching kunjungans:", error);
    }
  };

  const fetchDokters = async () => {
    try {
      const response = await authApi.get("/dokters", token);
      const data = await response.json();
      setDokters(data);
    } catch (error) {
      console.error("Error fetching dokters:", error);
    }
  };

  const fetchApotekers = async () => {
    try {
      const response = await authApi.get("/apotekers", token);
      const data = await response.json();
      setApotekers(data);
    } catch (error) {
      console.error("Error fetching apotekers:", error);
    }
  };

  const fetchObats = async () => {
    try {
      const response = await obatApi.get("/obats", token);
      const data = await response.json();
      setObats(data.filter((obat) => obat.is_active));
    } catch (error) {
      console.error("Error fetching obats:", error);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingResep) {
        await resepApi.put(`/reseps/${editingResep.id}`, formData, token);
      } else {
        await resepApi.post("/reseps", formData, token);
      }
      fetchReseps();
      setShowForm(false);
      setEditingResep(null);
    } catch (error) {
      console.error("Error saving resep:", error);
      alert("Error saving resep: " + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Yakin ingin menghapus resep ini?")) {
      try {
        await resepApi.delete(`/reseps/${id}`, token);
        fetchReseps();
      } catch (error) {
        console.error("Error deleting resep:", error);
      }
    }
  };

  const handleCompleteResep = async (id) => {
    try {
      await resepApi.put(`/reseps/${id}`,
        { status_resep: "selesai" },
        token
      );
      setReseps(
        reseps.map((resep) =>
          resep.id === id ? { ...resep, status_resep: "selesai" } : resep
        )
      );
    } catch (error) {
      console.error("Error completing resep:", error);
    }
  };

  const filteredReseps = reseps.filter(
    (resep) =>
      resep.kunjungan?.pasien?.nama_pasien
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      resep.dokter?.nama_lengkap
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      resep.obat?.nama_obat.toLowerCase().includes(searchTerm.toLowerCase())
  );

   if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manajemen Resep</h2>
        {userRole !== "apoteker" && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-600"
          >
            <Plus size={20} />
            <span>Tambah Resep</span>
          </button>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Cari resep..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Pasien</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Dokter</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Obat</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Jumlah</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredReseps.map((resep) => (
                <tr key={resep.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium">
                    {resep.kunjungan?.pasien?.nama_pasien}
                  </td>
                  <td className="px-4 py-3 text-sm">{resep.dokter?.nama_lengkap}</td>
                  <td className="px-4 py-3 text-sm">{resep.obat?.nama_obat}</td>
                  <td className="px-4 py-3 text-sm">
                    {resep.jumlah_obat} {resep.obat?.satuan}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        resep.status_resep === "selesai"
                          ? "bg-green-100 text-green-800"
                          : resep.status_resep === "diproses"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {resep.status_resep}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setEditingResep(resep);
                          setShowForm(true);
                        }}
                        className="text-blue-600 hover:text-blue-800"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      {resep.status_resep === "menunggu" && !isDokter && (
                        <button
                          onClick={() => handleCompleteResep(resep.id)}
                          className="text-green-600 hover:text-green-800"
                          title="Selesaikan"
                        >
                          <FileText size={16} />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(resep.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Hapus"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <ResepForm
          resep={editingResep}
          kunjungans={kunjungans}
          dokters={dokters}
          apotekers={apotekers}
          obats={obats}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingResep(null);
          }}
        />
      )}
    </div>
  );
};

export default ResepManager;

