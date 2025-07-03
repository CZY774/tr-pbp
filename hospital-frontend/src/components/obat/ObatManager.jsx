import React, { useState, useEffect } from "react";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import obatApi from "../../api/obatApi";
import ObatForm from "./ObatForm";

const ObatManager = ({ token }) => {
  const [obats, setObats] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingObat, setEditingObat] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchObats();
  }, []);

  const fetchObats = async () => {
    try {
      setLoading(true);
      const response = await obatApi.get("/obats", token);
      const data = await response.json();
      setObats(data);
    } catch (error) {
      console.error("Error fetching obats:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingObat) {
        await obatApi.put(`/obats/${editingObat.id}`, formData, token);
      } else {
        await obatApi.post("/obats", formData, token);
      }
      fetchObats();
      setShowForm(false);
      setEditingObat(null);
    } catch (error) {
      console.error("Error saving obat:", error);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Yakin ingin menonaktifkan obat ini?")) {
      try {
        await obatApi.delete(`/obats/${id}`, token);
        fetchObats();
      } catch (error) {
        console.error("Error deleting obat:", error);
      }
    }
  };

  const filteredObats = obats.filter(
    (obat) =>
      obat.nama_obat.toLowerCase().includes(searchTerm.toLowerCase()) ||
      obat.kode_obat.toLowerCase().includes(searchTerm.toLowerCase())
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
        <h2 className="text-2xl font-bold">Manajemen Obat</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-600"
        >
          <Plus size={20} />
          <span>Tambah Obat</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Cari obat..."
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
                  Kode
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  Nama Obat
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  Jenis
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  Stok
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  Harga
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
              {filteredObats.map((obat) => (
                <tr key={obat.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">{obat.kode_obat}</td>
                  <td className="px-4 py-3 text-sm font-medium">
                    {obat.nama_obat}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {obat.jenis_obat || "-"}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {obat.stok} {obat.satuan}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    Rp {obat.harga_satuan?.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        obat.is_active
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {obat.is_active ? "Aktif" : "Nonaktif"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setEditingObat(obat);
                          setShowForm(true);
                        }}
                        className="text-blue-600 hover:text-blue-800"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(obat.id)}
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
        <ObatForm
          obat={editingObat}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingObat(null);
          }}
        />
      )}
    </div>
  );
};

export default ObatManager;