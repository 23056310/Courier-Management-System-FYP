// utils/notification.js
import Notification from "../models/Notification.js";
import { sendSocketNotification } from "../server.js"; // ✅ import socket emitter

export const sendNotification = async (userId, type, message) => {
  try {
    // Save to MongoDB
    const notification = await Notification.create({
      userId,
      type,
      message,
      read: false,
      createdAt: new Date()
    });

    // Emit via Socket.IO for real-time update
    sendSocketNotification(userId, notification);

    return notification;
  } catch (error) {
    console.error("Notification error:", error);
  }
};
