
import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ["Pending", "Responded"],
      default: "Pending",
    },
    responseMessage: { type: String },
    }
);
export default mongoose.model("Inquiry", inquirySchema);