import Parcel from '../models/Parcel.js';
import User from '../models/User.js';

// ─────────────────────────────────────────────
// ADMIN ROUTES
// ─────────────────────────────────────────────

// @desc    Create a new parcel (Admin)
// @route   POST /api/parcels
// @access  Admin
export const createParcel = async (req, res) => {
  try {
    const parcel = new Parcel(req.body);
    await parcel.save();
    res.status(201).json({ success: true, data: parcel });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get all parcels (Admin)
// @route   GET /api/parcels
// @access  Admin
export const getAllParcels = async (req, res) => {
  try {
    const parcels = await Parcel.find()
      .populate('assignedDriver', 'name email profilePic')
      .populate('customer', 'name email')
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: parcels });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single parcel
// @route   GET /api/parcels/:id
// @access  Admin / Driver / Customer
export const getParcelById = async (req, res) => {
  try {
    const parcel = await Parcel.findById(req.params.id)
      .populate('assignedDriver', 'name email profilePic')
      .populate('customer', 'name email');
    if (!parcel) {
      return res.status(404).json({ success: false, message: 'Parcel not found' });
    }
    res.status(200).json({ success: true, data: parcel });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update parcel (Admin)
// @route   PUT /api/parcels/:id
// @access  Admin
export const updateParcel = async (req, res) => {
  try {
    const parcel = await Parcel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!parcel) {
      return res.status(404).json({ success: false, message: 'Parcel not found' });
    }
    res.status(200).json({ success: true, data: parcel });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete parcel (Admin)
// @route   DELETE /api/parcels/:id
// @access  Admin
export const deleteParcel = async (req, res) => {
  try {
    const parcel = await Parcel.findByIdAndDelete(req.params.id);
    if (!parcel) {
      return res.status(404).json({ success: false, message: 'Parcel not found' });
    }
    res.status(200).json({ success: true, message: 'Parcel removed' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Assign driver to parcel (Admin)
// @route   PATCH /api/parcels/:id/assign-driver
// @access  Admin
export const assignDriver = async (req, res) => {
  try {
    const { driverId } = req.body;

    const driver = await User.findOne({ _id: driverId, role: 'driver' });
    if (!driver && driverId !== null) {
      return res.status(400).json({ success: false, message: 'Invalid driver ID' });
    }

    const parcel = await Parcel.findByIdAndUpdate(
      req.params.id,
      { assignedDriver: driverId, status: 'Picked Up' },
      { new: true }
    ).populate('assignedDriver', 'name email profilePic');

    if (!parcel) {
      return res.status(404).json({ success: false, message: 'Parcel not found' });
    }

    res.status(200).json({ success: true, data: parcel });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────────
// CUSTOMER ROUTES
// ─────────────────────────────────────────────

// @desc    Customer creates a parcel request
// @route   POST /api/parcels/customer/create
// @access  Customer
export const customerCreateParcel = async (req, res) => {
  try {
    const parcel = new Parcel({
      ...req.body,
      customer: req.user._id,
      status: 'Pending'
    });
    await parcel.save();
    res.status(201).json({ success: true, data: parcel, trackingNumber: parcel.trackingNumber });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Customer gets their own parcels
// @route   GET /api/parcels/customer/my-parcels
// @access  Customer
export const getMyParcels = async (req, res) => {
  try {
    const parcels = await Parcel.find({ customer: req.user._id })
      .populate('assignedDriver', 'name email profilePic')
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: parcels });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────────
// PUBLIC TRACKING
// ─────────────────────────────────────────────

// @desc    Track parcel by tracking number (no auth required)
// @route   GET /api/parcels/track/:trackingNumber
// @access  Public
export const trackParcel = async (req, res) => {
  try {
    const parcel = await Parcel.findOne({ trackingNumber: req.params.trackingNumber })
      .populate('assignedDriver', 'name')
      .select('-customer -cost');

    if (!parcel) {
      return res.status(404).json({ success: false, message: 'No parcel found with that tracking number' });
    }
    res.status(200).json({ success: true, data: parcel });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────────
// DRIVER ROUTES
// ─────────────────────────────────────────────

// @desc    Driver gets their assigned parcels
// @route   GET /api/parcels/driver/assigned
// @access  Driver
export const getDriverParcels = async (req, res) => {
  try {
    const parcels = await Parcel.find({
      assignedDriver: req.user._id,
      status: { $ne: 'Cancelled' }
    }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: parcels });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Driver updates parcel delivery status
// @route   PATCH /api/parcels/:id/status
// @access  Driver
export const updateParcelStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = ['Picked Up', 'In Transit', 'Out for Delivery', 'Delivered'];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status transition' });
    }

    // Ensure this driver owns the parcel
    const parcel = await Parcel.findOne({
      _id: req.params.id,
      assignedDriver: req.user._id
    });

    if (!parcel) {
      return res.status(404).json({ success: false, message: 'Parcel not found or not assigned to you' });
    }

    parcel.status = status;
    await parcel.save();

    res.status(200).json({ success: true, data: parcel });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
