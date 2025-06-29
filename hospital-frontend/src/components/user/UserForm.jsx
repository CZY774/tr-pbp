import React, { useState } from "react";

const UserForm = ({ user, onSubmit, onCancel, authUserId }) => {
  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    password: "",
    nama_lengkap: user?.nama_lengkap || "",
    role: user?.role || "dokter",
    is_active: user?.is_active ?? true,
  });

  const isEditMode = !!user;
  const isSuperAdmin = user?.id === 1;
  const isNotSelfSuperAdmin = isSuperAdmin && authUserId !== 1;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isNotSelfSuperAdmin) {
      alert("Anda tidak memiliki izin untuk mengedit Super Admin.");
      return;
    }

    // Saat edit, kirim hanya role & is_active
    const dataToSubmit = isEditMode
      ? {
          role: formData.role,
          is_active: formData.is_active,
        }
      : formData;

    onSubmit(dataToSubmit);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 max-h-screen overflow-y-auto">
        <h3 className="text-lg font-bold mb-4">
          {user ? "Edit User" : "Tambah User"}
        </h3>

        {isNotSelfSuperAdmin && (
          <p className="text-red-500 text-sm mb-4">
            ⚠️ Anda tidak memiliki izin untuk mengubah data Super Admin.
          </p>
        )}

        <form onSubmit={handleSubmit}>
          {!isEditMode && (
            <>
              {/* Username */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Username
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  required
                />
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>

              {/* Password */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                  minLength={6}
                />
              </div>

              {/* Nama Lengkap */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={formData.nama_lengkap}
                  onChange={(e) =>
                    setFormData({ ...formData, nama_lengkap: e.target.value })
                  }
                  required
                />
              </div>
            </>
          )}

          {/* Role */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Role</label>
            <select
              className="w-full px-3 py-2 border rounded-lg"
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              required
              disabled={isNotSelfSuperAdmin}
            >
              <option value="admin">Admin</option>
              <option value="dokter">Dokter</option>
              <option value="apoteker">Apoteker</option>
            </select>
          </div>

          {/* Status */}
          {isEditMode && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Status</label>
              <select
                className="w-full px-3 py-2 border rounded-lg"
                value={formData.is_active}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    is_active: e.target.value === "true",
                  })
                }
                disabled={isNotSelfSuperAdmin}
              >
                <option value={true}>Aktif</option>
                <option value={false}>Nonaktif</option>
              </select>
            </div>
          )}

          <div className="flex space-x-4 mt-6">
            <button
              type="submit"
              className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
              disabled={isNotSelfSuperAdmin}
            >
              {user ? "Update" : "Simpan"}
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

export default UserForm;
