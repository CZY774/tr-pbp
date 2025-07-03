// pasienApi.js
const API_PASIEN_BASE = "http://localhost:8002/api";

const pasienApi = {
  get: (endpoint, token) =>
    fetch(`${API_PASIEN_BASE}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }),

  post: (endpoint, data, token) =>
    fetch(`${API_PASIEN_BASE}${endpoint}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }),

  put: (endpoint, data, token) =>
    fetch(`${API_PASIEN_BASE}${endpoint}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }),

  delete: (endpoint, token) =>
    fetch(`${API_PASIEN_BASE}${endpoint}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }),
};

export default pasienApi;
