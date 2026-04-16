import api from './api';

export const createParcel = async (parcelData) => {
  const response = await api.post('/parcels', parcelData);
  return response.data;
};

export const getAllParcels = async () => {
  const response = await api.get('/parcels');
  return response.data;
};

export const getParcelById = async (id) => {
  const response = await api.get(`/parcels/${id}`);
  return response.data;
};

export const updateParcel = async (id, parcelData) => {
  const response = await api.put(`/parcels/${id}`, parcelData);
  return response.data;
};

export const deleteParcel = async (id) => {
  const response = await api.delete(`/parcels/${id}`);
  return response.data;
};

export const assignDriver = async (id, driverId) => {
  const response = await api.patch(`/parcels/${id}/assign-driver`, { driverId });
  return response.data;
};