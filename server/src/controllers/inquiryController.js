
import Inquiry from "../models/Inquiry.js";
import nodemailer from "nodemailer";

/* ===============================
   PUBLIC: Submit Inquiry
================================ */
export const submitInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.create(req.body);

    res.status(201).json({
      message: "Inquiry submitted successfully",
      inquiry,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   ADMIN: Get all inquiries
================================ */
export const getAllInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find();
    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   ADMIN: Delete inquiry
================================ */
export const deleteInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndDelete(req.params.id);

    if (!inquiry) {
      return res.status(404).json({ message: "Inquiry not found" });
    }

    res.json({ message: "Inquiry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   ADMIN: Respond to inquiry via email
================================ */
export const respondInquiry = async (req, res) => {
  try {
    const { message } = req.body;
    const inquiry = await Inquiry.findById(req.params.id);

    if (!inquiry) {
      return res.status(404).json({ message: "Inquiry not found" });
    }

    // Email transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,  
        pass: process.env.EMAIL_PASS,  
      },
    });

    // Send mail
    await transporter.sendMail({
      from: `"Hostel Booking" <${process.env.EMAIL_USER}>`,
      to: inquiry.email,
      subject: inquiry.subject,
      text: message,
    });

    inquiry.status = "Responded";
    inquiry.responseMessage = message;
    await inquiry.save();

    res.json({ message: "Response sent successfully", inquiry });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
