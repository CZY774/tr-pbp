// obatApi.js
const API_OBAT_BASE = "http://localhost:8003/api";

const obatApi = {
  get: (endpoint, token) =>
    fetch(`${API_OBAT_BASE}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }),

  post: (endpoint, data, token) =>
    fetch(`${API_OBAT_BASE}${endpoint}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }),

  put: (endpoint, data, token) =>
    fetch(`${API_OBAT_BASE}${endpoint}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }),

  delete: (endpoint, token) =>
    fetch(`${API_OBAT_BASE}${endpoint}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }),
};

export default obatApi;
