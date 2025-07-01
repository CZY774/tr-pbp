const API_BASE = "http://localhost:8004/api";

const kunjunganApi = {
  getAll: (token) =>
    fetch(`${API_BASE}/kunjungans`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }),

  getById: (id, token) =>
    fetch(`${API_BASE}/kunjungans/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }),

  create: (data, token) =>
    fetch(`${API_BASE}/kunjungans`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }),

  update: (id, data, token) =>
    fetch(`${API_BASE}/kunjungans/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }),

  remove: (id, token) =>
    fetch(`${API_BASE}/kunjungans/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }),
};

export default kunjunganApi;
