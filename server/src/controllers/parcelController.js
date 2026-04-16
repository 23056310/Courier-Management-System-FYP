import Parcel from '../models/Parcel.js';
import User from '../models/User.js';

// @desc    Create a new parcel
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

// @desc    Get all parcels
// @route   GET /api/parcels
// @access  Admin
export const getAllParcels = async (req, res) => {
  try {
    const parcels = await Parcel.find().populate('assignedDriver', 'name email profilePic');
    res.status(200).json({ success: true, data: parcels });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single parcel
// @route   GET /api/parcels/:id
// @access  Admin/Driver/Customer
export const getParcelById = async (req, res) => {
  try {
    const parcel = await Parcel.findById(req.params.id).populate('assignedDriver', 'name email profilePic');
    if (!parcel) {
      return res.status(404).json({ success: false, message: 'Parcel not found' });
    }
    res.status(200).json({ success: true, data: parcel });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update parcel
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

// @desc    Delete parcel
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

// @desc    Assign driver to parcel
// @route   PATCH /api/parcels/:id/assign-driver
// @access  Admin
export const assignDriver = async (req, res) => {
  try {
    const { driverId } = req.body;
    
    // Verify driver exists and is a driver
    const driver = await User.findOne({ _id: driverId, role: 'driver' });
    if (!driver && driverId !== null) {
      return res.status(400).json({ success: false, message: 'Invalid driver ID' });
    }

    const parcel = await Parcel.findByIdAndUpdate(
      req.params.id, 
      { assignedDriver: driverId }, 
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
