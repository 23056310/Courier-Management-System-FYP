import express from "express";
import { getSettings, updateSettings, resetSettings } from "../controllers/websiteSettingsController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Public: Get settings
router.get("/", getSettings);

// Admin: Update & Reset
router.put("/", protect, authorizeRoles("admin"), upload.single("siteLogo"), updateSettings);
router.delete("/reset", protect, authorizeRoles("admin"), resetSettings);

export default router;
