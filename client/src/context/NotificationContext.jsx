import React, { createContext, useState, useEffect, useContext } from "react";
import { getNotifications, markNotificationAsRead, deleteNotification } from "../services/notificationService";
import { AuthContext } from "./AuthContext";
import { io } from "socket.io-client";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let socket;

    const fetchNotifications = async () => {
      try {
        const data = await getNotifications();
        setNotifications(data);
      } catch {
        setNotifications([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();

    if (user?._id) {
      socket = io(import.meta.env.VITE_API_BASE_URL.replace("/api", ""));
      socket.emit("join", user._id);

      socket.on("newNotification", (notification) => {
        setNotifications((prev) => [notification, ...prev]);
      });
    }

    return () => {
      if (socket) socket.disconnect();
    };
  }, [user]);

  const markAsRead = async (id) => {
    const updated = await markNotificationAsRead(id);
    setNotifications((prev) =>
      prev.map((n) => (n._id === id ? { ...n, read: true } : n))
    );
    return updated;
  };

  const deleteNotif = async (id) => {
    await deleteNotification(id);
    setNotifications((prev) => prev.filter((n) => n._id !== id));
  };

  return (
    <NotificationContext.Provider value={{ notifications, loading, markAsRead, deleteNotif }}>
      {children}
    </NotificationContext.Provider>
  );
};
