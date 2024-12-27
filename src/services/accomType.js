import api from './api';

export const accomTypeService = {
  getAll: () => api.get('/accomtype'),
  getById: (id) => api.get(`/accomtype/${id}`),
  create: (data) => api.post('/accomtype', data),
  update: (id, data) => api.put(`/accomtype/${id}`, data),
  delete: (id) => api.delete(`/accomtype/${id}`),
};