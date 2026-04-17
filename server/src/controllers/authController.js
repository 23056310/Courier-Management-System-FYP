import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";

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

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profilePic: user.profilePic,
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
    // Assuming you have a Parcel model imported above or we just don't have these
    // Since Parcel isn't imported here, let's just return what we have without crashing
    
    // Recent activity (last 5)
    const recentUsers = await User.find().sort({ createdAt: -1 }).limit(5).select('name email createdAt');
    
    const chartData = [
      { label: 'Jan', value: 0 }, { label: 'Feb', value: 0 }, { label: 'Mar', value: 0 },
      { label: 'Apr', value: 0 }, { label: 'May', value: 0 }, { label: 'Jun', value: 0 },
      { label: 'Jul', value: 0 }, { label: 'Aug', value: 0 }, { label: 'Sep', value: 0 },
      { label: 'Oct', value: 0 }, { label: 'Nov', value: 0 }, { label: 'Dec', value: 0 },
    ];

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalHostels: 0, // Mocked to avoid frontend crash if expected
        totalRooms: 0,
        totalBookings: 0
      },
      recentActivity: {
        users: recentUsers,
        hostels: [],
        bookings: []
      },
      chartData
    });
  } catch (error) {
    console.error("Admin dashboard stats error:", error);
    res.status(500).json({ message: error.message });
  }
};
