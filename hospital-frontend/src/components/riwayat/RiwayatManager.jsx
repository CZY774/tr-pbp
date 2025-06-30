import React, { useState, useEffect } from "react";
import { Search, Calendar, User, Stethoscope, Pill, FileText, Eye, X, Clock, DollarSign } from "lucide-react";
import api from "../../api/api";

const RiwayatManager = ({ token }) => {
  const [riwayat, setRiwayat] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  useEffect(() => {
    fetchRiwayat();
  }, []);

  const fetchRiwayat = async () => {
    try {
      setLoading(true);
      // Menggunakan endpoint public tanpa token
      const response = await api.get("/riwayat", token);
      const data = await response.json();
      setRiwayat(data);
    } catch (error) {
      console.error("Error fetching riwayat:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }),
      time: date.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit'
      })
    };
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount || 0);
  };

  const calculateTotalObat = (reseps) => {
    return reseps.reduce((total, resep) => {
      // Menggunakan harga_obat dari resep, bukan dari obat.harga
      const hargaObat = parseFloat(resep.harga_obat || 0);
      const jumlah = resep.jumlah_obat || 0;
      return total + (hargaObat * jumlah);
    }, 0);
  };

  const calculateGrandTotal = (item) => {
    // Menggunakan biaya_konsultasi, bukan biaya_kunjungan
    const biayaKonsultasi = parseFloat(item.biaya_konsultasi || 0);
    const totalObat = calculateTotalObat(item.reseps || []);
    return biayaKonsultasi + totalObat;
  };

  const handleShowDetail = (item) => {
    setSelectedDetail(item);
    setShowDetailModal(true);
  };

  const filteredRiwayat = riwayat.filter(
    (item) =>
      item.pasien?.nama_pasien
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      item.dokter?.nama_lengkap
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      item.keluhan?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.diagnosis?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.no_antrian?.toString().includes(searchTerm)
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
        <h2 className="text-2xl font-bold">Riwayat Pasien</h2>
        <div className="text-sm text-gray-500">
          {filteredRiwayat.length} riwayat kunjungan
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Cari berdasarkan nomor antrian, nama pasien, dokter, keluhan, atau diagnosis..."
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
                  Tanggal & Waktu
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  Total Biaya
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredRiwayat.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
                    <FileText size={48} className="mx-auto mb-4 text-gray-300" />
                    <p>Tidak ada riwayat yang ditemukan</p>
                  </td>
                </tr>
              ) : (
                filteredRiwayat.map((item) => {
                  const dateTime = formatDateTime(item.tanggal_kunjungan);
                  const grandTotal = calculateGrandTotal(item);
                  
                  return (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium">
                        #{item.no_antrian}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <div>
                          <div className="font-medium">{item.pasien?.nama_pasien}</div>
                          <div className="text-xs text-gray-500">{item.pasien?.no_telepon}</div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {item.dokter?.nama_lengkap}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <div>
                          <div className="flex items-center space-x-1">
                            <Calendar size={14} />
                            <span>{dateTime.date}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-gray-500">
                            <Clock size={14} />
                            <span>{item.jam_kunjungan || dateTime.time}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <div className="font-medium text-green-600">
                          {formatCurrency(grandTotal)}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <button
                          onClick={() => handleShowDetail(item)}
                          className="text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                        >
                          <Eye size={16} />
                          <span>Detail</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedDetail && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold">Detail Kunjungan</h3>
                <p className="text-gray-600">#{selectedDetail.no_antrian} - {selectedDetail.pasien?.nama_pasien}</p>
              </div>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Informasi Kunjungan */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-800 border-b pb-2">Informasi Pasien & Kunjungan</h4>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-600">Nomor Antrian</label>
                    <p className="text-gray-800">#{selectedDetail.no_antrian}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-600">No. Rekam Medis</label>
                    <p className="text-gray-800">{selectedDetail.pasien?.no_rm}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-600">Nama Pasien</label>
                    <p className="text-gray-800">{selectedDetail.pasien?.nama_pasien}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-600">NIK</label>
                    <p className="text-gray-800">{selectedDetail.pasien?.nik}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-600">Dokter Pemeriksa</label>
                    <p className="text-gray-800">{selectedDetail.dokter?.nama_lengkap}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-600">Tanggal & Waktu Kunjungan</label>
                    <p className="text-gray-800">
                      {formatDateTime(selectedDetail.tanggal_kunjungan).date} - {selectedDetail.jam_kunjungan || formatDateTime(selectedDetail.tanggal_kunjungan).time}
                    </p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-600">Status Kunjungan</label>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                      selectedDetail.status_kunjungan === 'selesai' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {selectedDetail.status_kunjungan}
                    </span>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-600">Biaya Konsultasi</label>
                    <p className="text-gray-800 font-medium">{formatCurrency(selectedDetail.biaya_konsultasi)}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-800 border-b pb-2">Kondisi Medis</h4>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-600">Keluhan</label>
                    <p className="text-gray-800">{selectedDetail.keluhan || "Tidak ada keluhan tercatat"}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-600">Diagnosis</label>
                    <p className="text-gray-800">{selectedDetail.diagnosis || "Belum ada diagnosis tercatat"}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-600">Tindakan</label>
                    <p className="text-gray-800">{selectedDetail.tindakan || "Belum ada tindakan tercatat"}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">Data Pasien</label>
                    <div className="text-sm text-gray-700">
                      <p>Alamat: {selectedDetail.pasien?.alamat}</p>
                      <p>No. Telepon: {selectedDetail.pasien?.no_telepon}</p>
                      <p>Tanggal Lahir: {selectedDetail.pasien?.tanggal_lahir ? formatDateTime(selectedDetail.pasien.tanggal_lahir).date : '-'}</p>
                      <p>Jenis Kelamin: {selectedDetail.pasien?.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Resep & Obat */}
              <div>
                <h4 className="font-semibold text-gray-800 border-b pb-2 mb-4">Resep & Obat</h4>
                
                {selectedDetail.reseps && selectedDetail.reseps.length > 0 ? (
                  <div className="space-y-4">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-3 py-2 text-left">Kode Obat</th>
                            <th className="px-3 py-2 text-left">Nama Obat</th>
                            <th className="px-3 py-2 text-left">Jenis Obat</th>
                            <th className="px-3 py-2 text-left">Jumlah</th>
                            <th className="px-3 py-2 text-left">Harga Satuan</th>
                            <th className="px-3 py-2 text-left">Total Harga</th>
                            <th className="px-3 py-2 text-left">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedDetail.reseps.map((resep) => {
                            const hargaSatuan = parseFloat(resep.obat?.harga_satuan || 0);
                            const jumlah = resep.jumlah_obat || 0;
                            const totalHarga = parseFloat(resep.total_harga || 0);
                            
                            return (
                              <tr key={resep.id} className="border-b">
                                <td className="px-3 py-2">{resep.obat?.kode_obat || "-"}</td>
                                <td className="px-3 py-2">{resep.obat?.nama_obat || "Obat tidak tersedia"}</td>
                                <td className="px-3 py-2">{resep.obat?.jenis_obat || "-"}</td>
                                <td className="px-3 py-2">{jumlah} {resep.obat?.satuan || ""}</td>
                                <td className="px-3 py-2">{formatCurrency(hargaSatuan)}</td>
                                <td className="px-3 py-2 font-medium">{formatCurrency(totalHarga)}</td>
                                <td className="px-3 py-2">
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
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    {/* Instruksi Penggunaan */}
                    <div className="mt-4">
                      <h5 className="font-medium text-gray-700 mb-2">Instruksi Penggunaan:</h5>
                      <div className="space-y-2">
                        {selectedDetail.reseps.map((resep) => (
                          <div key={resep.id} className="bg-blue-50 p-3 rounded">
                            <p className="font-medium text-sm">{resep.obat?.nama_obat}</p>
                            {resep.dosis && <p className="text-sm text-gray-700">Dosis: {resep.dosis}</p>}
                            {resep.aturan_pakai && <p className="text-sm text-gray-700">Aturan Pakai: {resep.aturan_pakai}</p>}
                            {!resep.dosis && !resep.aturan_pakai && (
                              <p className="text-sm text-gray-500">Tidak ada instruksi khusus</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">Tidak ada resep tercatat</p>
                )}
              </div>

              {/* Total Biaya */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-3">Ringkasan Biaya</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Biaya Konsultasi:</span>
                    <span>{formatCurrency(selectedDetail.biaya_konsultasi)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Harga Obat:</span>
                    <span>{formatCurrency(calculateTotalObat(selectedDetail.reseps || []))}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-semibold text-lg">
                    <span>Total Semua:</span>
                    <span className="text-green-600">{formatCurrency(calculateGrandTotal(selectedDetail))}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RiwayatManager;