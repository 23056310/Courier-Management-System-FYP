import api from './api';

// Get all notifications for logged-in user
export const getNotifications = async () => {
  const response = await api.get('/notifications');
  return response.data.notifications;
};

// Mark a notification as read
export const markNotificationAsRead = async (id) => {
  const response = await api.put(`/notifications/${id}/read`);
  return response.data.notification;
};

// Delete a notification
export const deleteNotification = async (id) => {
  const response = await api.delete(`/notifications/${id}`);
  return response.data;
};
