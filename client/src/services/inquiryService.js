import api from './api';

// Submit a new inquiry (Public)
export const submitInquiry = async (data) => {
  const response = await api.post('/inquiries/submit', data);
  return response.data;
};

// Get all inquiries (Admin)
export const getAllInquiries = async () => {
  const response = await api.get('/inquiries');
  return response.data;
};

// Respond to an inquiry (Admin)
export const respondToInquiry = async (id, message) => {
  const response = await api.post(`/inquiries/respond/${id}`, { message });
  return response.data;
};

// Delete an inquiry (Admin)
export const deleteInquiry = async (id) => {
  const response = await api.delete(`/inquiries/${id}`);
  return response.data;
};
