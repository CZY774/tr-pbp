import React, { useState, useEffect } from "react";

// Helper to format date to yyyy-MM-dd
function formatDateToInput(date) {
  if (!date) return "";
  if (typeof date === "string" && date.length === 10 && date.match(/^\d{4}-\d{2}-\d{2}$/)) {
    return date;
  }
  const d = new Date(date);
  if (isNaN(d)) return "";
  return d.toISOString().split("T")[0];
}

const ResepForm = ({
  resep,
  kunjungans,
  dokters,
  apotekers,
  obats,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    kunjungan_id: resep?.kunjungan_id || "",
    dokter_id: resep?.dokter_id || "",
    obat_id: resep?.obat_id || "",
    jumlah_obat: resep?.jumlah_obat || 1,
    dosis: resep?.dosis || "",
    aturan_pakai: resep?.aturan_pakai || "",
    status_resep: resep?.status_resep || "menunggu",
    apoteker_id: resep?.apoteker_id || "",
    tanggal_resep: formatDateToInput(resep?.tanggal_resep) || formatDateToInput(new Date()),
  });

  const [selectedObat, setSelectedObat] = useState(null);

  // Ambil role dari localStorage
  const userRole = localStorage.getItem("userRole");
  const isApoteker = userRole === "apoteker";
  const isDokter = userRole === "dokter";

  useEffect(() => {
    if (formData.obat_id) {
      const obat = obats.find((o) => o.id == formData.obat_id);
      setSelectedObat(obat);
    } else {
      setSelectedObat(null);
    }
  }, [formData.obat_id, obats]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isApoteker) onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-auto">
        <h3 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
          {resep ? "Edit Resep" : "Tambah Resep"}
        </h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          {/* Kunjungan */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Kunjungan</label>
            <select
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-400"
              value={formData.kunjungan_id}
              onChange={(e) =>
                setFormData({ ...formData, kunjungan_id: e.target.value })
              }
              disabled={isApoteker}
              required
            >
              <option value="">Pilih Kunjungan</option>
              {kunjungans.map((kunjungan) => (
                <option key={kunjungan.id} value={kunjungan.id}>
                  {kunjungan.pasien?.nama_pasien} -{" "}
                  {new Date(kunjungan.tanggal_kunjungan).toLocaleDateString()}
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
              onChange={(e) =>
                setFormData({ ...formData, dokter_id: e.target.value })
              }
              disabled={isApoteker}
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

          {/* Apoteker */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Apoteker</label>
            <select
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-400"
              value={formData.apoteker_id}
              onChange={(e) =>
                setFormData({ ...formData, apoteker_id: e.target.value })
              }
              disabled={isApoteker}
              required
            >
              <option value="">Pilih Apoteker</option>
              {apotekers.map((apoteker) => (
                <option key={apoteker.id} value={apoteker.id}>
                  {apoteker.nama_lengkap}
                </option>
              ))}
            </select>
          </div>

          {/* Obat */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Obat</label>
            <select
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-400"
              value={formData.obat_id}
              onChange={(e) =>
                setFormData({ ...formData, obat_id: e.target.value })
              }
              disabled={isApoteker}
              required
            >
              <option value="">Pilih Obat</option>
              {obats.map((obat) => (
                <option key={obat.id} value={obat.id}>
                  {obat.nama_obat} (Stok: {obat.stok} {obat.satuan})
                </option>
              ))}
            </select>
            {selectedObat && (
              <div className="mt-2 text-xs text-gray-600">
                <p>Harga: Rp {selectedObat.harga_satuan?.toLocaleString()}</p>
                <p>
                  Stok tersedia: {selectedObat.stok} {selectedObat.satuan}
                </p>
              </div>
            )}
          </div>

          {/* Jumlah Obat */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Jumlah Obat</label>
            <input
              type="number"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-400"
              value={formData.jumlah_obat}
              onChange={(e) =>
                setFormData({ ...formData, jumlah_obat: e.target.value })
              }
              disabled={isApoteker}
              required
              min="1"
              max={selectedObat?.stok || 1000}
            />
            {selectedObat && (
              <div className="mt-2 text-xs text-gray-600">
                <p>
                  Total Harga: Rp{" "}
                  {(
                    formData.jumlah_obat * selectedObat.harga_satuan
                  ).toLocaleString()}
                </p>
              </div>
            )}
          </div>

          {/* Dosis */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Dosis</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-400"
              placeholder="Contoh: 1x sehari"
              value={formData.dosis}
              onChange={(e) =>
                setFormData({ ...formData, dosis: e.target.value })
              }
              disabled={isApoteker}
              maxLength="100"
            />
          </div>

          {/* Aturan Pakai */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Aturan Pakai</label>
            <textarea
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-400"
              placeholder="Contoh: Setelah makan"
              rows="2"
              value={formData.aturan_pakai}
              onChange={(e) =>
                setFormData({ ...formData, aturan_pakai: e.target.value })
              }
              disabled={isApoteker}
            />
          </div>

          {/* Tanggal Resep */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Tanggal Resep</label>
            <input
              type="date"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-400"
              value={formatDateToInput(formData.tanggal_resep)}
              onChange={(e) =>
                setFormData({ ...formData, tanggal_resep: formatDateToInput(e.target.value) })
              }
              disabled={isApoteker}
              required
            />
          </div>

          {/* Status Resep */}
          {resep && (
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Status Resep</label>
              <select
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-400"
                value={formData.status_resep}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status_resep: e.target.value,
                  })
                }
                disabled={isDokter}
              >
                <option value="menunggu">Menunggu</option>
                <option value="diproses">Diproses</option>
                <option value="selesai">Selesai</option>
              </select>
            </div>
          )}

          {/* Tombol */}
          <div className="col-span-2 flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-300 text-gray-800 px-5 py-2 rounded-md hover:bg-gray-400 transition"
            >
              Batal
            </button>
            {!isApoteker && (
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
              >
                {resep ? "Update" : "Simpan"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResepForm;