import api from './api';

export const categoryService = {
  getAll: () => api.get('/category'),
  getById: (id) => api.get(`/category/${id}`),
  create: (data) => api.post('/category', data),
  update: (id, data) => api.put(`/category/${id}`, data),
  delete: (id) => api.delete(`/category/${id}`),
};