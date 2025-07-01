import React, { useState } from "react";

const PasienForm = ({ pasien, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    nama_pasien: pasien?.nama_pasien || "",
    nik: pasien?.nik || "",
    tanggal_lahir: pasien?.tanggal_lahir || "",
    jenis_kelamin: pasien?.jenis_kelamin || "L",
    alamat: pasien?.alamat || "",
    no_telepon: pasien?.no_telepon || "",
  });

  const [errors, setErrors] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!/^\d{16}$/.test(formData.nik)) {
      newErrors.nik = "NIK harus terdiri dari 16 digit angka";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 max-h-screen overflow-y-auto">
        <h3 className="text-lg font-bold mb-4">
          {pasien ? "Edit Pasien" : "Tambah Pasien"}
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Nama Pasien
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={formData.nama_pasien}
              onChange={(e) =>
                setFormData({ ...formData, nama_pasien: e.target.value })
              }
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">NIK</label>
            <input
              type="text"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${
                errors.nik ? "border-red-500" : "focus:border-blue-500"
              }`}
              value={formData.nik}
              onChange={(e) =>
                setFormData({ ...formData, nik: e.target.value })
              }
              maxLength="16"
              required
            />
            {errors.nik && (
              <p className="text-red-500 text-sm mt-1">{errors.nik}</p>
            )}
            {errors.nik && (
              <p className="text-red-500 text-sm mt-1">{errors.nik}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Tanggal Lahir
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={formData.tanggal_lahir}
              onChange={(e) =>
                setFormData({ ...formData, tanggal_lahir: e.target.value })
              }
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Jenis Kelamin
            </label>
            <select
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={formData.jenis_kelamin}
              onChange={(e) =>
                setFormData({ ...formData, jenis_kelamin: e.target.value })
              }
            >
              <option value="L">Laki-laki</option>
              <option value="P">Perempuan</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Alamat</label>
            <textarea
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              rows="3"
              value={formData.alamat}
              onChange={(e) =>
                setFormData({ ...formData, alamat: e.target.value })
              }
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              No. Telepon
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={formData.no_telepon}
              onChange={(e) =>
                setFormData({ ...formData, no_telepon: e.target.value })
              }
            />
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              {pasien ? "Update" : "Simpan"}
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

export default PasienForm;
