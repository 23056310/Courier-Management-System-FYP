import { Server } from "socket.io";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: { origin: "*" },
  });

  io.on("connection", (socket) => {
    console.log("🔌 User connected:", socket.id);

    socket.on("join", (userId) => {
      socket.join(userId);
      console.log(`User ${userId} joined their room`);
    });

    socket.on("disconnect", () => {
      console.log("❌ User disconnected:", socket.id);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};

export const sendSocketNotification = (userId, notification) => {
  if (io) {
    io.to(userId).emit("newNotification", notification);
    console.log(`📡 Emitted notice to ${userId}`);
  } else {
    console.error("❌ Cannot emit: Socket.io not initialized");
  }
};
