import React, { useState } from "react";
import ForgotPasswordForm from "./ForgotPasswordForm";

const LoginForm = ({ onLogin, loading }) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [showForgot, setShowForgot] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(credentials);
  };

  if (showForgot) {
    return <ForgotPasswordForm onBack={() => setShowForgot(false)} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <button
          type="button"
          className="mb-4 text-blue-500 hover:underline text-sm flex items-center"
          onClick={() => window.location.href = "/"}
        >
          ← Kembali ke Landing Page
        </button>
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
          Sistem Informasi Rumah Sakit Étoile Santé
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Username
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={credentials.username}
              onChange={(e) =>
                setCredentials({ ...credentials, username: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="mt-4 mb-10 text-center">
          <button
            type="button"
            className="text-blue-500 hover:underline text-sm"
            onClick={() => setShowForgot(true)}
          >
            Lupa Password?
          </button>
        </div>
        <div className="mt-4 text-sm text-gray-600">
          <p>Demo accounts:</p>
          <p>admin / password</p>
          <p>dr_budi / password</p>
          <p>apt_sari / password</p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
