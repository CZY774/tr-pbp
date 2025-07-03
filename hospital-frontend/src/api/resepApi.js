// resepApi.js
const API_RESEP_BASE = "http://localhost:8004/api";

const resepApi = {
  get: (endpoint, token) =>
    fetch(`${API_RESEP_BASE}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }),

  post: (endpoint, data, token) =>
    fetch(`${API_RESEP_BASE}${endpoint}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }),

  put: (endpoint, data, token) =>
    fetch(`${API_RESEP_BASE}${endpoint}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }),

  delete: (endpoint, token) =>
    fetch(`${API_RESEP_BASE}${endpoint}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }),
};

export default resepApi;
