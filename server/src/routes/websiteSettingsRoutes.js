
import express from "express";
import {
  getSettings,
  updateSettings,
  deleteSettings,
  getPublicSettings
} from "../controllers/websiteSettingsController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

// PUBLIC
router.get("/public", getPublicSettings);

// ADMIN
router.get("/", protect, authorizeRoles("admin"), getSettings);

router.put(
  "/",
  protect,
  authorizeRoles("admin"),
  upload.fields([
    { name: "siteLogo", maxCount: 1 },
    { name: "banner", maxCount: 1 },
  ]),
  updateSettings
);

router.delete("/", protect, authorizeRoles("admin"), deleteSettings);

export default router;
