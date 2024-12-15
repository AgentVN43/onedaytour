import api from './api';

export const provincesService = {
  getAll: () => api.get('/provinces'),
  getById: (id) => api.get(`/provinces/${id}`),
  create: (data) => api.post('/provinces', data),
  update: (id, data) => api.put(`/provinces/${id}`, data),
  delete: (id) => api.delete(`/provinces/${id}`),
};