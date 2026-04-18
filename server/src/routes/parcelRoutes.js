import express from 'express';
const router = express.Router();
import { 
  createParcel, 
  getAllParcels, 
  getParcelById, 
  updateParcel, 
  deleteParcel,
  assignDriver,
  customerCreateParcel,
  getMyParcels,
  customerUpdateParcel,
  customerDeleteParcel,
  trackParcel,
  getDriverParcels,
  updateParcelStatus
} from '../controllers/parcelController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

// ── PUBLIC ──────────────────────────────────────
// Track parcel by tracking number (no login needed)
router.get('/track/:trackingNumber', trackParcel);

// ── PROTECTED ───────────────────────────────────
router.use(protect);

// ── CUSTOMER ────────────────────────────────────
router.post('/customer/create', authorizeRoles('customer'), customerCreateParcel);
router.get('/customer/my-parcels', authorizeRoles('customer'), getMyParcels);
router.put('/customer/:id', authorizeRoles('customer'), customerUpdateParcel);
router.delete('/customer/:id', authorizeRoles('customer'), customerDeleteParcel);

// ── DRIVER ──────────────────────────────────────
router.get('/driver/assigned', authorizeRoles('driver'), getDriverParcels);
router.patch('/:id/status', authorizeRoles('driver'), updateParcelStatus);

// ── ADMIN ───────────────────────────────────────
router.route('/')
  .post(authorizeRoles('admin'), createParcel)
  .get(authorizeRoles('admin'), getAllParcels);

router.route('/:id')
  .get(getParcelById)
  .put(authorizeRoles('admin'), updateParcel)
  .delete(authorizeRoles('admin'), deleteParcel);

router.patch('/:id/assign-driver', authorizeRoles('admin'), assignDriver);

export default router;
