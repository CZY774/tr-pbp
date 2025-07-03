// authApi.js
const API_AUTH_BASE = "http://localhost:8000/api";

const authApi = {
  login: (credentials) =>
    fetch(`${API_AUTH_BASE}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    }),

  logout: (token) =>
    fetch(`${API_AUTH_BASE}/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }),

  getProfile: (token) =>
    fetch(`${API_AUTH_BASE}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }),

  changePassword: (data, token) =>
    fetch(`${API_AUTH_BASE}/profile/change-password`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }),

  updateProfile: (data, token) =>
    fetch(`${API_AUTH_BASE}/profile`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }),

  forgotPassword: (data) =>
    fetch(`${API_AUTH_BASE}/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }),
};

export default authApi;
