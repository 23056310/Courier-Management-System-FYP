
import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  forgetPassword,
  resetPassword,
  changePassword,
  getProfile,
  updateProfile,
  getAllUsers,
  updateUserRole,
  deleteUser,
  getAdminDashboardStats
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

// ✅ Public routes
router.post("/register", upload.single("profilePic"), registerUser); // ✅ Allow profilePic during registration
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/forget-password", forgetPassword);
router.post("/reset-password", resetPassword);

// ✅ Protected routes
router.get("/profile", protect, getProfile);
router.put("/profile", protect, upload.single("profilePic"), updateProfile); // ✅ Update name, email, profilePic
router.put("/change-password", protect, changePassword);

// ✅ Admin routes
router.get("/users", protect, authorizeRoles("admin"), getAllUsers);
router.put("/users/:id", protect, authorizeRoles("admin"), updateUserRole);
router.delete("/users/:id", protect, authorizeRoles("admin"), deleteUser);
router.get("/dashboard/stats", protect, authorizeRoles("admin"), getAdminDashboardStats);

export default router;
