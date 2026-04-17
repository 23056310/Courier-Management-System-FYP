import mongoose from 'mongoose';

const parcelSchema = new mongoose.Schema({
  trackingNumber: {
    type: String,
    required: true,
    unique: true
  },
  sender: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true }
  },
  recipient: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true }
  },
  parcelDetails: {
    weight: { type: Number, required: true }, // in kg
    dimensions: { type: String }, // e.g., 20x20x20
    type: { 
      type: String, 
      enum: ['Document', 'Electronics', 'Clothing', 'Fragile', 'Other'],
      default: 'Other'
    },
    description: { type: String }
  },
  status: {
    type: String,
    enum: ['Pending', 'Picked Up', 'In Transit', 'Out for Delivery', 'Delivered', 'Cancelled'],
    default: 'Pending'
  },
  assignedDriver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  cost: {
    type: Number,
    default: 0
  },
  deliveryMethod: {
    type: String,
    enum: ['Standard', 'Express'],
    default: 'Standard'
  },
  estimatedDelivery: {
    type: Date
  }
}, { timestamps: true });

// Generate a random tracking number before saving
parcelSchema.pre('save', async function(next) {
  if (!this.trackingNumber) {
    this.trackingNumber = 'TRK' + Math.random().toString(36).substr(2, 9).toUpperCase();
  }
  next();
});

const Parcel = mongoose.model('Parcel', parcelSchema);
export default Parcel;
