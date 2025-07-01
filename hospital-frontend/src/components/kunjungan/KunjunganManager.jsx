import React, { useState, useEffect } from "react";
import { Plus, Search, Edit, Trash2, FileText } from "lucide-react";
import api from "../../api/api";
import kunjunganApi from "../../api/kunjunganApi";
import KunjunganForm from "./KunjunganForm";

const KunjunganManager = ({ token }) => {
  const [kunjungans, setKunjungans] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingKunjungan, setEditingKunjungan] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [pasiens, setPasiens] = useState([]);
  const [dokters, setDokters] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [kunjungansRes, pasiensRes, doktersRes] = await Promise.all([
          kunjunganApi.getAll(token),
          api.get("/pasiens", token),
          api.get("/dokters", token),
        ]);

        setKunjungans(await kunjungansRes.json());
        setPasiens(await pasiensRes.json());
        setDokters(await doktersRes.json());
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const handleSubmit = async (formData) => {
    try {
      if (editingKunjungan) {
        await kunjunganApi.update(editingKunjungan.id, formData, token);
      } else {
        await kunjunganApi.create(formData, token);
        console.log("Data yang dikirim:", formData);
      }
      const res = await kunjunganApi.getAll(token);
      setKunjungans(await res.json());
      setShowForm(false);
      setEditingKunjungan(null);
    } catch (error) {
      console.error("Error saving kunjungan:", error);
      alert("Error: " + (error.message || "Gagal menyimpan kunjungan"));
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Yakin ingin menghapus kunjungan ini?")) {
      try {
        await kunjunganApi.remove(id, token);
        setKunjungans(kunjungans.filter((k) => k.id !== id));
      } catch (error) {
        console.error("Error deleting kunjungan:", error);
      }
    }
  };

  const handleCompleteKunjungan = async (id) => {
    try {
      await kunjunganApi.complete(id, token);
      setKunjungans(
        kunjungans.map((k) =>
          k.id === id ? { ...k, status_kunjungan: "selesai" } : k
        )
      );
    } catch (error) {
      console.error("Error completing kunjungan:", error);
    }
  };

  const filteredKunjungans = kunjungans.filter(
    (kunjungan) =>
      kunjungan.pasien?.nama_pasien
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      kunjungan.dokter?.nama_lengkap
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      kunjungan.no_antrian?.toLowerCase().includes(searchTerm.toLowerCase())
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
        <h2 className="text-2xl font-bold">Manajemen Kunjungan</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-600"
        >
          <Plus size={20} />
          <span>Tambah Kunjungan</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Cari kunjungan..."
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
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  No. Antrian
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  Pasien
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  Dokter
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  Tanggal
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredKunjungans.map((kunjungan) => (
                <tr key={kunjungan.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">{kunjungan.no_antrian}</td>
                  <td className="px-4 py-3 text-sm font-medium">
                    {kunjungan.pasien?.nama_pasien || "Pasien tidak ditemukan"}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {kunjungan.dokter?.nama_lengkap || "Dokter tidak ditemukan"}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {new Date(kunjungan.tanggal_kunjungan).toLocaleDateString()} {kunjungan.jam_kunjungan}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        kunjungan.status_kunjungan === "selesai"
                          ? "bg-green-100 text-green-800"
                          : kunjungan.status_kunjungan === "batal"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {kunjungan.status_kunjungan}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setEditingKunjungan(kunjungan);
                          setShowForm(true);
                        }}
                        className="text-blue-600 hover:text-blue-800"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      {kunjungan.status_kunjungan === "menunggu" && (
                        <button
                          onClick={() => handleCompleteKunjungan(kunjungan.id)}
                          className="text-green-600 hover:text-green-800"
                          title="Selesaikan"
                        >
                          <FileText size={16} />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(kunjungan.id)}
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
        <KunjunganForm
          kunjungan={editingKunjungan}
          pasiens={pasiens}
          dokters={dokters}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingKunjungan(null);
          }}
        />
      )}
    </div>
  );
};

export default KunjunganManager;
