import React, { useState, useEffect } from "react";

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
  });

  const [selectedObat, setSelectedObat] = useState(null);

  // Ambil role dari localStorage
  const userRole = localStorage.getItem("userRole");
  const isReadOnly = userRole === "apoteker";

  // Ambil role dari localStorage
  const userRole = localStorage.getItem("userRole");
  const isReadOnly = userRole === "apoteker";

  useEffect(() => {
    if (formData.obat_id) {
      const obat = obats.find((o) => o.id == formData.obat_id);
      setSelectedObat(obat);
    } else {
      setSelectedObat(null);
    }
  }, [formData.obat_id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isReadOnly) onSubmit(formData);
    if (!isReadOnly) onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 max-h-screen overflow-y-auto">
        <h3 className="text-lg font-bold mb-4">
          {resep ? "Edit Resep" : "Tambah Resep"}
        </h3>

        <form onSubmit={handleSubmit}>
          {/* Kunjungan */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Kunjungan</label>
            <select
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={formData.kunjungan_id}
              onChange={(e) =>
                setFormData({ ...formData, kunjungan_id: e.target.value })
              }
              disabled={isReadOnly}
              disabled={isReadOnly}
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
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Dokter</label>
            <select
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={formData.dokter_id}
              onChange={(e) =>
                setFormData({ ...formData, dokter_id: e.target.value })
              }
              disabled={isReadOnly}
              disabled={isReadOnly}
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
            <label className="block text-sm font-medium mb-2">Apoteker</label>
            <select
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={formData.apoteker_id}
              onChange={(e) =>
                setFormData({ ...formData, apoteker_id: e.target.value })
              }
              disabled={isReadOnly}
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

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Obat</label>
            <select
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={formData.obat_id}
              onChange={(e) =>
                setFormData({ ...formData, obat_id: e.target.value })
              }
              disabled={isReadOnly}
              disabled={isReadOnly}
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
              <div className="mt-2 text-sm text-gray-600">
                <p>Harga: Rp {selectedObat.harga_satuan?.toLocaleString()}</p>
                <p>
                  Stok tersedia: {selectedObat.stok} {selectedObat.satuan}
                </p>
              </div>
            )}
          </div>

          {/* Jumlah Obat */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Jumlah Obat
            </label>
            <input
              type="number"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={formData.jumlah_obat}
              onChange={(e) =>
                setFormData({ ...formData, jumlah_obat: e.target.value })
              }
              disabled={isReadOnly}
              disabled={isReadOnly}
              required
              min="1"
              max={selectedObat?.stok || 1000}
              />
              {/* Mirip seperti di Pilih Obat, menampilkan total harga sesuai jumlah obat */}
              {selectedObat && (
                <div className="mt-2 text-sm text-gray-600">
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
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Dosis</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Contoh: 1x sehari"
              value={formData.dosis}
              onChange={(e) =>
                setFormData({ ...formData, dosis: e.target.value })
              }
              disabled={isReadOnly}
              disabled={isReadOnly}
              maxLength="100"
            />
          </div>

          {/* Aturan Pakai */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Aturan Pakai
            </label>
            <textarea
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Contoh: Setelah makan"
              rows="3"
              value={formData.aturan_pakai}
              onChange={(e) =>
                setFormData({ ...formData, aturan_pakai: e.target.value })
              }
              disabled={isReadOnly}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Tanggal Resep
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={formData.tanggal_resep}
              onChange={(e) =>
                setFormData({ ...formData, tanggal_resep: e.target.value })
              }
              disabled={isReadOnly}
              required
            />
          </div>

          {/* Status dan Apoteker (jika resep sudah ada) */}
          {resep && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Status Resep
                </label>
                <select
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  value={formData.status_resep}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      status_resep: e.target.value,
                    })
                  }
                  disabled={isReadOnly}
                  disabled={isReadOnly}
                >
                  <option value="menunggu">Menunggu</option>
                  <option value="diproses">Diproses</option>
                  <option value="selesai">Selesai</option>
                </select>
              </div>
            </>
          )}

          {/* Tombol */}
          <div className="flex space-x-4">
            {!isReadOnly && (
              <button
                type="submit"
                className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
              >
                {resep ? "Update" : "Simpan"}
              </button>
            )}
            {!isReadOnly && (
              <button
                type="submit"
                className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
              >
                {resep ? "Update" : "Simpan"}
              </button>
            )}
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

export default ResepForm;

