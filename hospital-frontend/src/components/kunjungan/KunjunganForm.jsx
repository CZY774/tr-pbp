import React, { useState } from "react";

const KunjunganForm = ({ kunjungan, pasiens, dokters, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    pasien_id: kunjungan?.pasien_id || "",
    dokter_id: kunjungan?.dokter_id || "",
    tanggal_kunjungan: kunjungan?.tanggal_kunjungan || new Date().toISOString().split("T")[0],
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
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-auto">
        <h3 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
          {kunjungan ? "Edit Kunjungan" : "Tambah Kunjungan"}
        </h3>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          {/* Pasien */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Pasien</label>
            <select
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-400"
              value={formData.pasien_id}
              onChange={(e) => setFormData({ ...formData, pasien_id: e.target.value })}
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

          {/* Dokter */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Dokter</label>
            <select
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-400"
              value={formData.dokter_id}
              onChange={(e) => setFormData({ ...formData, dokter_id: e.target.value })}
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

          {/* Tanggal Kunjungan */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Tanggal Kunjungan</label>
            <input
              type="date"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-400"
              value={formData.tanggal_kunjungan}
              onChange={(e) => setFormData({ ...formData, tanggal_kunjungan: e.target.value })}
              required
            />
          </div>

          {/* Jam Kunjungan */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Jam Kunjungan</label>
            <input
              type="time"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-400"
              value={formData.jam_kunjungan}
              onChange={(e) => setFormData({ ...formData, jam_kunjungan: e.target.value })}
              required
            />
          </div>

          {/* Keluhan */}
          <div className="col-span-2">
            <label className="block text-sm font-medium mb-1 text-gray-700">Keluhan</label>
            <textarea
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-400"
              rows="2"
              placeholder="Contoh: Demam, batuk, pilek, dll"
              value={formData.keluhan}
              onChange={(e) => setFormData({ ...formData, keluhan: e.target.value })}
            />
          </div>

          {/* Diagnosis */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Diagnosis</label>
            <textarea
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-400"
              rows="2"
              placeholder="Contoh: Tipes, flu, dll"
              value={formData.diagnosis}
              onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
            />
          </div>

          {/* Tindakan */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Tindakan</label>
            <textarea
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-400"
              rows="2"
              placeholder="Contoh: Obat, pemeriksaan, dll"
              value={formData.tindakan}
              onChange={(e) => setFormData({ ...formData, tindakan: e.target.value })}
            />
          </div>

          {/* Biaya Konsultasi */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Biaya Konsultasi</label>
            <input
              type="number"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-400"
              value={formData.biaya_konsultasi}
              onChange={(e) => setFormData({ ...formData, biaya_konsultasi: e.target.value })}
              min="0"
            />
          </div>

          {/* Status Kunjungan */}
          {kunjungan && (
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Status Kunjungan</label>
              <select
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-400"
                value={formData.status_kunjungan}
                onChange={(e) => setFormData({ ...formData, status_kunjungan: e.target.value })}
              >
                <option value="menunggu">Menunggu</option>
                <option value="selesai">Selesai</option>
                <option value="batal">Batal</option>
              </select>
            </div>
          )}

          {/* Buttons */}
          <div className="col-span-2 flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-300 text-gray-800 px-5 py-2 rounded-md hover:bg-gray-400 transition"
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            >
              {kunjungan ? "Update" : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default KunjunganForm;
