// src/api/userApi.js
const API_USER_BASE = "http://localhost:8002/api";

const apiUser = {
  getUsers: (token) =>
    fetch(`${API_USER_BASE}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }),

  createUser: (data, token) =>
    fetch(`${API_USER_BASE}/users`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }),

  updateUser: (id, data, token) =>
    fetch(`${API_USER_BASE}/users/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }),

  deleteUser: (id, token) =>
    fetch(`${API_USER_BASE}/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }),
};

export default apiUser;
