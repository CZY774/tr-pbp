import React, { useState, useEffect } from "react";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import PasienForm from "./PasienForm";
import pasienApi from "../../api/pasienApi";

const PasienManager = ({ token }) => {
  const [pasiens, setPasiens] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPasien, setEditingPasien] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchPasiens = async () => {
    try {
      setLoading(true);
      const response = await pasienApi.get("/pasiens", token);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setPasiens(data);
    } catch (error) {
      console.error("Error fetching pasiens:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPasiens();
  }, []);

  const handleSubmit = async (formData) => {
    try {
      if (editingPasien) {
        await pasienApi.put(`/pasiens/${editingPasien.id}`, formData, token);
      } else {
        await pasienApi.post("/pasiens", formData, token);
      }
      fetchPasiens();
      setShowForm(false);
      setEditingPasien(null);
    } catch (error) {
      console.error("Error saving pasien:", error);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Yakin ingin menghapus pasien ini?")) {
      try {
        await pasienApi.delete(`/pasiens/${id}`, token);
        fetchPasiens();
      } catch (error) {
        console.error("Error deleting pasien:", error);
      }
    }
  };

  const filteredPasiens = pasiens.filter(
    (pasien) =>
      pasien.nama_pasien.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pasien.no_rm.toLowerCase().includes(searchTerm.toLowerCase())
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
        <h2 className="text-2xl font-bold">Manajemen Pasien</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-600"
        >
          <Plus size={20} />
          <span>Tambah Pasien</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Cari pasien..."
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
                  No. RM
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  Nama
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  NIK
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  Tanggal Lahir
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  Jenis Kelamin
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredPasiens.map((pasien) => (
                <tr key={pasien.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">{pasien.no_rm}</td>
                  <td className="px-4 py-3 text-sm font-medium">
                    {pasien.nama_pasien}
                  </td>
                  <td className="px-4 py-3 text-sm">{pasien.nik || "-"}</td>
                  <td className="px-4 py-3 text-sm">
                    {new Date(pasien.tanggal_lahir).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {pasien.jenis_kelamin === "L" ? "Laki-laki" : "Perempuan"}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setEditingPasien(pasien);
                          setShowForm(true);
                        }}
                        className="text-blue-600 hover:text-blue-800"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(pasien.id)}
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
        <PasienForm
          pasien={editingPasien}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingPasien(null);
          }}
        />
      )}
    </div>
  );
};

export default PasienManager;
