import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  parcelId: { type: mongoose.Schema.Types.ObjectId, ref: "Parcel" },
  type: { type: String, required: true }, // e.g. ParcelCreated, ParcelStatusUpdate, DriverAssigned
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Notification", notificationSchema);
