
import api from './api';
import { formatProfilePic } from '../utils/formatProfilePic';

// ==============================
// Register user with profilePic
// ==============================
export const registerUser = async (data) => {
  const response = await api.post('/auth/register', data);

  return {
    ...response.data,
    user: {
      ...response.data.user,
      profilePic: formatProfilePic(response.data.user.profilePic),
    }
  };
};

// ==============================
// Login User
// ==============================
export const loginUser = async (data) => {
  const response = await api.post('/auth/login', data);

  return {
    ...response.data,
    user: {
      ...response.data.user,
      profilePic: formatProfilePic(response.data.user.profilePic),
    }
  };
};

// ==============================
// Get Profile
// ==============================
export const getProfile = async () => {
  const response = await api.get('/auth/profile');

  return {
    ...response.data,
    profilePic: formatProfilePic(response.data.profilePic),
  };
};

// ==============================
// Update Profile
// ==============================
export const updateProfile = async (data) => {
  const response = await api.put('/auth/profile', data);

  return {
    ...response.data,
    user: {
      ...response.data.user,
      profilePic: formatProfilePic(response.data.user.profilePic),
    }
  };
};

// ==============================
// Other Routes (Unchanged)
// ==============================
export const changePassword = async (data) => {
  const response = await api.put('/auth/change-password', data);
  return response.data;
};

export const forgetPassword = async (email) => {
  const response = await api.post('/auth/forget-password', { email });
  return response.data;
};

export const resetPassword = async (data) => {
  const response = await api.post('/auth/reset-password', data);
  return response.data;
};

export const logoutUser = () => {
  localStorage.removeItem('token');
};

// ==============================
// Admin APIs
// ==============================

export const getAllUsers = async () => {
  const response = await api.get('/auth/users');

  // Format profilePic for each user
  const users = response.data.map(u => ({
    ...u,
    profilePic: formatProfilePic(u.profilePic),
  }));

  return users;
};


export const updateUserRole = async (id, data) => {
  const response = await api.put(`/auth/users/${id}`, data);
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await api.delete(`/auth/users/${id}`);
  return response.data;
};

// ==============================
// Dashboard Stats APIs
// ==============================

export const getAdminDashboardStats = async () => {
  const response = await api.get('/auth/dashboard/stats');
  return response.data;
};
