import api from './api';

export const quoteService = {
  getAll: () => api.get('/quotess'),
  getById: (id) => api.get(`/quotess/${id}`),
  getByOrderId: (id) => api.get(`/quotess/orderId/${id}`),
  create: (data) => api.post('/quotess', data),
  update: (id, data) => api.put(`/quotess/${id}`, data),
  delete: (id) => api.delete(`/quotess/${id}`),
};