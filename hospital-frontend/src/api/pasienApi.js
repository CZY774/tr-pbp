// src/api/pasienApi.js
const API_PASIEN_BASE = "http://localhost:8000/api";

const pasienApi = {
  getAll: (token) =>
    fetch(`${API_PASIEN_BASE}/pasiens`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }),

  create: (data, token) =>
    fetch(`${API_PASIEN_BASE}/pasiens`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }),

  update: (id, data, token) =>
    fetch(`${API_PASIEN_BASE}/pasiens/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }),

  remove: (id, token) =>
    fetch(`${API_PASIEN_BASE}/pasiens/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }),
};

export default pasienApi;
