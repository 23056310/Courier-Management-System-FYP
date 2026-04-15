import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Hostel from "../models/Hostel.js";
import Room from "../models/Room.js";
import Booking from "../models/Booking.js";
import { generateToken } from "../utils/generateToken.js";

/* ===============================
   REGISTER USER
================================ */
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    if (req.file) {
      userData.profilePic = req.file.path.replace(/\\/g, "/");
    }

    const user = await User.create(userData);

    res.status(201).json({
      message: "User registered successfully",
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role, // default: student
        profilePic: user.profilePic,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
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
  const { role } = req.body;

  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.role = role;
  await user.save();

  res.json({ message: "User role updated" });
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
    const totalUsers = await User.countDocuments();
    const totalHostels = await Hostel.countDocuments();
    const totalRooms = await Room.countDocuments();
    const totalBookings = await Booking.countDocuments();
    
    // Recent activity (last 5)
    const recentUsers = await User.find().sort({ createdAt: -1 }).limit(5).select('name email createdAt');
    const recentHostels = await Hostel.find().sort({ createdAt: -1 }).limit(5).select('name status createdAt').populate('ownerId', 'name');
    const recentBookings = await Booking.find().sort({ createdAt: -1 }).limit(5)
      .populate('studentId', 'name')
      .populate('hostelId', 'name')
      .select('status createdAt');
    
    // Monthly bookings data for chart
    const bookingsByMonth = await Booking.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id": 1 } }
    ]);
    
    // Format monthly data
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const chartData = months.map((month, index) => {
      const monthData = bookingsByMonth.find(item => item._id === index + 1);
      return {
        label: month,
        value: monthData ? monthData.count : 0
      };
    });

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalHostels,
        totalRooms,
        totalBookings
      },
      recentActivity: {
        users: recentUsers,
        hostels: recentHostels,
        bookings: recentBookings
      },
      chartData
    });
  } catch (error) {
    console.error("Admin dashboard stats error:", error);
    res.status(500).json({ message: error.message });
  }
};
