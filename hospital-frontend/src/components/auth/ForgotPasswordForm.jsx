import React, { useState } from "react";
import authApi from "../../api/authApi";

const ForgotPasswordForm = ({ onBack }) => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    new_password: "",
    confirm_password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");
    if (form.new_password !== form.confirm_password) {
      setError("Password confirmation does not match.");
      setLoading(false);
      return;
    }
    try {
      const res = await authApi.forgotPassword({
        username: form.username,
        email: form.email,
        new_password: form.new_password,
        new_password_confirmation: form.confirm_password,
      });
      if (res.ok) {
        setMessage("Password updated successfully. Silakan login.");
      } else {
        const data = await res.json();
        setError(data.message || "Gagal reset password.");
      }
    } catch (err) {
      setError("Terjadi kesalahan jaringan.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
          Lupa Password
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Username
            </label>
            <input
              type="text"
              name="username"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              New Password
            </label>
            <input
              type="password"
              name="new_password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={form.new_password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirm_password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={form.confirm_password}
              onChange={handleChange}
              required
            />
          </div>
          {error && <div className="text-red-500 mb-2 text-sm">{error}</div>}
          {message && <div className="text-green-600 mb-2 text-sm">{message}</div>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:opacity-50 mb-2"
          >
            {loading ? "Memproses..." : "Reset Password"}
          </button>
          <button
            type="button"
            onClick={onBack}
            className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300"
          >
            Kembali ke Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
