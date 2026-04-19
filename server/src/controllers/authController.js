import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Parcel from "../models/Parcel.js";
import Inquiry from "../models/Inquiry.js";
import { generateToken } from "../utils/generateToken.js";
import { createNotification } from "./notificationController.js";
import { sendSocketNotification } from "../config/socket.js";


/* ===============================
   REGISTER USER
================================ */
export const registerUser = async (req, res) => {
  try {
    console.log("--- REGISTRATION START ---");
    console.log("Body:", req.body);
    console.log("File:", req.file);

    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email already registered" });
    }

    console.log("Hashing password...");
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Password hashed.");

    const userData = {
      name,
      email,
      password: hashedPassword,
      role: role || 'customer'
    };

    if (req.file) {
      userData.profilePic = req.file.path.replace(/\\/g, "/");
    }

    console.log("Creating user in DB...");
    const user = await User.create(userData);
    console.log("User created successfully:", user._id);

    const token = generateToken(user._id);
    console.log("Token generated.");

    // Notify Admin if it's a driver
    if (user.role === 'driver') {
      const admins = await User.find({ role: 'admin' });
      const msg = `New driver ${user.name} registered and is pending verification.`;
      for (const admin of admins) {
        const notif = await createNotification(admin._id, 'DriverRegistered', msg);
        sendSocketNotification(admin._id.toString(), notif);
      }
    }

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profilePic: user.profilePic,
        driverStatus: user.driverStatus,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    console.error("DEBUG: Registration error detail:", error);
    res.status(500).json({
      message: "Internal Server Error during registration",
      error: error.message,
      stack: error.stack,
      requestBody: req.body,
      requestFile: req.file
    });
  }
};

/* ===============================
   LOGIN USER
================================ */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({
      message: "Login successful",
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profilePic: user.profilePic,
        driverStatus: user.driverStatus,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Logout (handled client-side by removing token)
export const logoutUser = (req, res) => {
  res.json({ message: "Logout successful" });
};

/* ===============================
   FORGOT PASSWORD
================================ */
export const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }

    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    // In real apps → email this token
    res.json({
      message: "Password reset token generated",
      resetToken,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   RESET PASSWORD (TOKEN)
================================ */
export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (error) {
    res.status(400).json({ message: "Invalid or expired token" });
  }
};

/* ===============================
   CHANGE PASSWORD (LOGGED-IN)
================================ */
export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id);

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password incorrect" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   GET OWN PROFILE
================================ */
export const getProfile = async (req, res) => {
  res.json({
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
    profilePic: req.user.profilePic,
    driverStatus: req.user.driverStatus,
    isVerified: req.user.isVerified,
  });
};
/* ===============================
   UPDATE OWN PROFILE
================================ */
export const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    // Update name if provided
    if (name) {
      req.user.name = name;
    }

    // Update email only if changed & unique
    if (email && email !== req.user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).json({ message: "Email already in use" });
      }
      req.user.email = email;
    }

    if (req.file) {
      req.user.profilePic = req.file.path.replace(/\\/g, "/");
    }

    await req.user.save();

    res.json({
      message: "Profile updated successfully",
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
        profilePic: req.user.profilePic,
        driverStatus: req.user.driverStatus,
        isVerified: req.user.isVerified,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   ADMIN: GET ALL USERS
================================ */
export const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};
/* ===============================
   Admin: Update User Role
================================ */
export const updateUserRole = async (req, res) => {
  const { role, isVerified, driverStatus } = req.body;

  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (role) user.role = role;
  if (isVerified !== undefined) user.isVerified = isVerified;

  const oldStatus = user.driverStatus;
  if (driverStatus) user.driverStatus = driverStatus;

  await user.save();

  // Notify driver about status change
  if (driverStatus && driverStatus !== oldStatus) {
    const msg = `Your driver account status has been updated to ${driverStatus}.`;
    const notif = await createNotification(user._id, 'DriverStatusUpdate', msg);
    sendSocketNotification(user._id.toString(), notif);
  }

  res.json({ message: "User details updated successfully", user });
};

/* ===============================
   ADMIN: DELETE USER
================================ */
export const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  await user.deleteOne();
  res.json({ message: "User deleted successfully" });
};

/* ===============================
   ADMIN: GET DASHBOARD STATS
================================ */
export const getAdminDashboardStats = async (req, res) => {
  try {
    const [totalUsers, totalParcels, totalDrivers, totalInquiries, recentParcels] = await Promise.all([
      User.countDocuments(),
      Parcel.countDocuments(),
      User.countDocuments({ role: 'driver', driverStatus: 'Active' }),
      Inquiry.countDocuments({ status: 'Pending' }),
      Parcel.find().sort({ createdAt: -1 }).limit(5)
        .populate('assignedDriver', 'name')
        .populate('customer', 'name'),
    ]);

    // Calculate performance data (Delivered vs Others)
    const deliveredCount = await Parcel.countDocuments({ status: 'Delivered' });
    const inTransitCount = await Parcel.countDocuments({ status: 'In Transit' });
    const pendingCount = await Parcel.countDocuments({ status: 'Pending' });

    // Calculate revenue (Mocked or based on weight/cost if you have it)
    const revenueSum = await Parcel.aggregate([
      { $match: { status: 'Delivered' } },
      { $group: { _id: null, total: { $sum: "$cost" } } }
    ]);
    const totalRevenue = revenueSum.length > 0 ? revenueSum[0].total : 0;

    // Calculate analytics for the last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const dailyStats = await Parcel.aggregate([
      { $match: { createdAt: { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    // Format for chart (fill missing dates if any)
    const analytics = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const match = dailyStats.find(s => s._id === dateStr);
      analytics.push({
        name: d.toLocaleDateString('en-US', { weekday: 'short' }),
        parcels: match ? match.count : 0
      });
    }

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalParcels,
        totalDrivers,
        totalInquiries,
        deliveredCount,
        inTransitCount,
        pendingCount,
        totalRevenue
      },
      analytics
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
