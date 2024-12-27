import api from "./api";

export const accomService = {
  getAll: () => api.get("/accom"),
  getById: (id) => api.get(`/accom/${id}`),
  create: (data) => api.post("/accom", data),
  update: (id, data) => api.put(`/accom/${id}`, data),
  delete: (id) => api.delete(`/accom/${id}`),
  getByType: (type) => api.get(`/accom/type/${type}`),
};
