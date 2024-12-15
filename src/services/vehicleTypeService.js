import api from './api';

export const vehicleTypeService = {
  getAll: () => api.get('/vehicletype'),
  getById: (id) => api.get(`/vehicletype/${id}`),
  create: (data) => api.post('/vehicletype', data),
  update: (id, data) => api.put(`/vehicletype/${id}`, data),
  delete: (id) => api.delete(`/vehicletype/${id}`),
};