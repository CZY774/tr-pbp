import React, { useState } from "react";

const ObatForm = ({ obat, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    kode_obat: obat?.kode_obat || "",
    nama_obat: obat?.nama_obat || "",
    jenis_obat: obat?.jenis_obat || "",
    satuan: obat?.satuan || "",
    harga_satuan: obat?.harga_satuan || 0,
    stok: obat?.stok || 0,
    is_active: obat?.is_active ?? true,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 max-h-screen overflow-y-auto">
        <h3 className="text-lg font-bold mb-4">
          {obat ? "Edit Obat" : "Tambah Obat"}
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Kode Obat</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Contoh: OBT001"
              value={formData.kode_obat}
              onChange={(e) =>
                setFormData({ ...formData, kode_obat: e.target.value })
              }
              required
              maxLength="20"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Nama Obat</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={formData.nama_obat}
              onChange={(e) =>
                setFormData({ ...formData, nama_obat: e.target.value })
              }
              required
              maxLength="100"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Jenis Obat</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Contoh: Kapsul, Tablet, Sirup, Pil, Puyer, dll."
              value={formData.jenis_obat}
              onChange={(e) =>
                setFormData({ ...formData, jenis_obat: e.target.value })
              }
              maxLength="50"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Satuan</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Contoh: Strip, Bungkus, Botol, dll."
              value={formData.satuan}
              onChange={(e) =>
                setFormData({ ...formData, satuan: e.target.value })
              }
              maxLength="20"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Harga Satuan
            </label>
            <input
              type="number"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={formData.harga_satuan}
              onChange={(e) =>
                setFormData({ ...formData, harga_satuan: e.target.value })
              }
              required
              min="0"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Stok</label>
            <input
              type="number"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={formData.stok}
              onChange={(e) =>
                setFormData({ ...formData, stok: e.target.value })
              }
              required
              min="0"
            />
          </div>

          {obat && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Status</label>
              <select
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                value={formData.is_active}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    is_active: e.target.value === "true",
                  })
                }
              >
                <option value={true}>Aktif</option>
                <option value={false}>Nonaktif</option>
              </select>
            </div>
          )}

          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              {obat ? "Update" : "Simpan"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ObatForm;