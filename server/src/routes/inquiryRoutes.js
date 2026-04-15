
import express from "express";
import {
  submitInquiry,
  getAllInquiries,
  deleteInquiry,
  respondInquiry,
} from "../controllers/inquiryController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// PUBLIC ROUTE
router.post("/submit", submitInquiry);

// ADMIN ROUTES
router.get("/", protect, authorizeRoles("admin"), getAllInquiries);
router.post("/respond/:id", protect, authorizeRoles("admin"), respondInquiry);
router.delete("/:id", protect, authorizeRoles("admin"), deleteInquiry);

export default router;
