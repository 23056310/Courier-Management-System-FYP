import express from 'express';
const router = express.Router();
import { 
  createParcel, 
  getAllParcels, 
  getParcelById, 
  updateParcel, 
  deleteParcel,
  assignDriver
} from '../controllers/parcelController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

// All routes require authentication
router.use(protect);

// Admin only routes for bulk management
router.route('/')
  .post(authorizeRoles('admin'), createParcel)
  .get(authorizeRoles('admin'), getAllParcels);

router.route('/:id')
  .get(getParcelById)
  .put(authorizeRoles('admin'), updateParcel)
  .delete(authorizeRoles('admin'), deleteParcel);

router.patch('/:id/assign-driver', authorizeRoles('admin'), assignDriver);

export default router;
