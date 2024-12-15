import api from './api';

export const orderService = {
  getAll: () => api.get('/order'),
  getById: (id) => api.get(`/order/${id}`),
  create: (data) => api.post('/order', data),
  update: (id, data) => api.put(`/order/${id}`, data),
  delete: (id) => api.delete(`/order/${id}`),
};