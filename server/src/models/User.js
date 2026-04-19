
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["customer", "driver", "admin"], default: "customer" },
  profilePic: { type: String, default: "" }, // optional profile picture
  isVerified: { type: Boolean, default: false }, // for drivers
  driverStatus: { type: String, enum: ["Pending", "Active", "Rejected"], default: "Pending" },
}, { timestamps: true });

export default mongoose.model("User", userSchema);
