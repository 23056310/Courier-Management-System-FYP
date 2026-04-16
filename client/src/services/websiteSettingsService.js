import api from './api';

// Get settings
export const getSettings = async () => {
  const response = await api.get('/settings');
  return response.data;
};

// Update settings
export const updateSettings = async (data) => {
  const isFormData = data instanceof FormData;
  const response = await api.put('/settings', data, {
    headers: {
      'Content-Type': isFormData ? 'multipart/form-data' : 'application/json'
    }
  });
  return response.data;
};

// Reset settings
export const resetSettings = async () => {
  const response = await api.delete('/settings/reset');
  return response.data;
};
