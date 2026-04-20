// Load environment variables
import 'dotenv/config';

// ✅ DNS FIX FOR MONGODB SRV LOOKUP
import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

// Core packages
import express from 'express';
import path from 'path';
import cors from 'cors';
import http from 'http';

// Socket
import { initSocket } from './config/socket.js';

// DB + Routes
import connectDB from './config/db.js'; 
import authRoutes from './routes/authRoutes.js';
import inquiryRoutes from './routes/inquiryRoutes.js';
import websiteSettingsRoutes from './routes/websiteSettingsRoutes.js';
import parcelRoutes from './routes/parcelRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';

// Init app
const app = express();
const server = http.createServer(app);

// ✅ IMPORTANT: Render PORT
const PORT = process.env.PORT || 5000;

console.log("✅ Server file loaded...");

// ================= MIDDLEWARE =================
app.use(cors({
  origin: "*", // later replace with frontend URL
}));
app.use(express.json());

// ================= STATIC =================
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// ================= ROUTES =================
app.get('/', (req, res) => {
  res.send('🚀 Courier Management System Backend is running!');
});

app.use('/api/auth', authRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/settings', websiteSettingsRoutes);
app.use('/api/parcels', parcelRoutes);
app.use('/api/notifications', notificationRoutes);

// ================= SOCKET =================
initSocket(server);

// ================= START SERVER SAFELY =================
const startServer = async () => {
  try {
    await connectDB(); // wait for DB connection

    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();