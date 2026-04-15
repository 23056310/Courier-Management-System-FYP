// Load environment variables
import 'dotenv/config';

// ✅ DNS FIX FOR MONGODB SRV LOOKUP
import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]); // Google DNS (stable)

// Import packages
import express from 'express';
import path from 'path';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';

// DB + Routes
import connectDB from './config/db.js'; 
import authRoutes from './routes/authRoutes.js';
import inquiryRoutes from './routes/inquiryRoutes.js';
import websiteSettingsRoutes from "./routes/websiteSettingsRoutes.js";
import hotelRoutes from "./routes/hotelRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js"; 

// Express app + HTTP server
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 8000;

// ✅ Socket.IO setup
export const io = new Server(server, {
  cors: { origin: "*" }
});

io.on("connection", (socket) => {
  console.log("🔌 User connected:", socket.id);

  // Join room by userId
  socket.on("join", (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined their room`);
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

// ✅ Utility to emit notifications
export const sendSocketNotification = (userId, notification) => {
  io.to(userId).emit("newNotification", notification);
};

// Connect MongoDB
setTimeout(() => {
  connectDB();
}, 1000);

// Middleware
app.use(cors());
app.use(express.json());

// Static uploads
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/settings", websiteSettingsRoutes);
app.use("/api/hostels", hotelRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/notifications", notificationRoutes);

app.get('/', (req, res) => {
  res.send('🛎️ Hotel Booking Backend is running!');
});

// Start server
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
