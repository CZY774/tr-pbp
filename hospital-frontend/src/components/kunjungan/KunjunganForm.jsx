import React, { useState } from "react";

const KunjunganForm = ({ kunjungan, pasiens, dokters, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    pasien_id: kunjungan?.pasien_id || "",
    dokter_id: kunjungan?.dokter_id || "",
    tanggal_kunjungan:
      kunjungan?.tanggal_kunjungan || new Date().toISOString().split("T")[0],
    jam_kunjungan: kunjungan?.jam_kunjungan || "08:00",
    keluhan: kunjungan?.keluhan || "",
    diagnosis: kunjungan?.diagnosis || "",
    tindakan: kunjungan?.tindakan || "",
    biaya_konsultasi: kunjungan?.biaya_konsultasi || 0,
    status_kunjungan: kunjungan?.status_kunjungan || "menunggu",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 max-h-screen overflow-y-auto">
        <h3 className="text-lg font-bold mb-4">
          {kunjungan ? "Edit Kunjungan" : "Tambah Kunjungan"}
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Pasien</label>
            <select
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={formData.pasien_id}
              onChange={(e) =>
                setFormData({ ...formData, pasien_id: e.target.value })
              }
              required
            >
              <option value="">Pilih Pasien</option>
              {pasiens.map((pasien) => (
                <option key={pasien.id} value={pasien.id}>
                  {pasien.nama_pasien} ({pasien.no_rm})
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Dokter</label>
            <select
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={formData.dokter_id}
              onChange={(e) =>
                setFormData({ ...formData, dokter_id: e.target.value })
              }
              required
            >
              <option value="">Pilih Dokter</option>
              {dokters.map((dokter) => (
                <option key={dokter.id} value={dokter.id}>
                  {dokter.nama_lengkap}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Tanggal Kunjungan
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={formData.tanggal_kunjungan}
              onChange={(e) =>
                setFormData({ ...formData, tanggal_kunjungan: e.target.value })
              }
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Jam Kunjungan
            </label>
            <input
              type="time"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={formData.jam_kunjungan}
              onChange={(e) =>
                setFormData({ ...formData, jam_kunjungan: e.target.value })
              }
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Keluhan</label>
            <textarea
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Contoh: Demam, batuk, pilek, dll"
              rows="3"
              value={formData.keluhan}
              onChange={(e) =>
                setFormData({ ...formData, keluhan: e.target.value })
              }
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Diagnosis</label>
            <textarea
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Contoh: Tipes, flu, dll"
              rows="3"
              value={formData.diagnosis}
              onChange={(e) =>
                setFormData({ ...formData, diagnosis: e.target.value })
              }
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Tindakan</label>
            <textarea
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Contoh: Obat, pemeriksaan, dll"
              rows="3"
              value={formData.tindakan}
              onChange={(e) =>
                setFormData({ ...formData, tindakan: e.target.value })
              }
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Biaya Konsultasi
            </label>
            <input
              type="number"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={formData.biaya_konsultasi}
              onChange={(e) =>
                setFormData({ ...formData, biaya_konsultasi: e.target.value })
              }
              min="0"
            />
          </div>

          {kunjungan && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Status Kunjungan
              </label>
              <select
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                value={formData.status_kunjungan}
                onChange={(e) =>
                  setFormData({ ...formData, status_kunjungan: e.target.value })
                }
              >
                <option value="menunggu">Menunggu</option>
                <option value="selesai">Selesai</option>
                <option value="batal">Batal</option>
              </select>
            </div>
          )}

          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              {kunjungan ? "Update" : "Simpan"}
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

export default KunjunganForm;