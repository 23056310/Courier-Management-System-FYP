import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "./AuthContext";
import notificationService from "../services/notificationService";
import toast from "react-hot-toast";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [socket, setSocket] = useState(null);

  const fetchNotifications = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (user && token) {
      try {
        console.log("🔄 Fetching notifications...");
        const data = await notificationService.getNotifications(token);
        setNotifications(data);
        setUnreadCount(data.filter((n) => !n.read).length);
        console.log(`✅ Fetched ${data.length} notifications`);
      } catch (error) {
        console.error("❌ Error fetching notifications:", error);
      }
    }
  }, [user]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  useEffect(() => {
    const currentUserId = user?._id || user?.id;
    if (user && currentUserId) {
      // Use websocket transport for better stability and to avoid proxy polling issues
      const newSocket = io("/", {
        transports: ["websocket"],
        reconnectionAttempts: 5,
      });
      
      setSocket(newSocket);

      newSocket.on("connect", () => {
        console.log("✅ Socket connected to server");
        newSocket.emit("join", currentUserId);
      });

      newSocket.on("connect_error", (err) => {
        console.error("❌ Socket connection error:", err.message);
      });

      newSocket.on("newNotification", (notification) => {
        console.log("📨 Received notification via socket:", notification);
        setNotifications((prev) => [notification, ...prev]);
        setUnreadCount((prev) => prev + 1);
        toast.success(notification.message, {
          icon: '🔔',
          duration: 4000,
        });
      });

      return () => {
        if (newSocket) newSocket.close();
      };
    }
  }, [user]);

  const markAsRead = async (id) => {
    const token = localStorage.getItem("token");
    if (user && token) {
      try {
        await notificationService.markAsRead(id, token);
        setNotifications((prev) =>
          prev.map((n) => (n._id === id ? { ...n, read: true } : n))
        );
        setUnreadCount((prev) => Math.max(0, prev - 1));
      } catch (error) {
        toast.error("Failed to mark as read");
      }
    }
  };

  const markAllAsRead = async () => {
    const token = localStorage.getItem("token");
    if (user && token) {
      try {
        await notificationService.markAllAsRead(token);
        setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
        setUnreadCount(0);
        toast.success("All marked as read");
      } catch (error) {
        toast.error("Failed to mark all as read");
      }
    }
  };

  const deleteNotification = async (id) => {
    const token = localStorage.getItem("token");
    if (user && token) {
      try {
        await notificationService.deleteNotification(id, token);
        const wasUnread = !notifications.find(n => n._id === id)?.read;
        setNotifications((prev) => prev.filter((n) => n._id !== id));
        if (wasUnread) {
          setUnreadCount((prev) => Math.max(0, prev - 1));
        }
        toast.success("Notification deleted");
      } catch (error) {
        toast.error("Failed to delete notification");
      }
    }
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        fetchNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
