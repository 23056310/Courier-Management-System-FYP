import api from './api';

// ── ADMIN ────────────────────────────────────────
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

// ── CUSTOMER ─────────────────────────────────────
export const customerCreateParcel = async (parcelData) => {
  const response = await api.post('/parcels/customer/create', parcelData);
  return response.data;
};

export const getMyParcels = async () => {
  const response = await api.get('/parcels/customer/my-parcels');
  return response.data;
};

// ── PUBLIC TRACKING ───────────────────────────────
export const trackParcelByNumber = async (trackingNumber) => {
  const response = await api.get(`/parcels/track/${trackingNumber}`);
  return response.data;
};

// ── DRIVER ───────────────────────────────────────
export const getDriverParcels = async () => {
  const response = await api.get('/parcels/driver/assigned');
  return response.data;
};

export const updateParcelStatus = async (id, status) => {
  const response = await api.patch(`/parcels/${id}/status`, { status });
  return response.data;
};