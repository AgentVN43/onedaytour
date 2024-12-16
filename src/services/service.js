import api from "./api";

export const service = {
  getAllServices: () => api.get("/services"),
  getServiceById: (id) => api.get(`/services/${id}`),
  createService: (data) => api.post("/services", data),
  updateService: (id, data) => api.put(`/services/${id}`, data),
  deleteService: (id) => api.delete(`/services/${id}`),
};
