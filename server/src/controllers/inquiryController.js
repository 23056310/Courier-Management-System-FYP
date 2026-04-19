
import Inquiry from "../models/Inquiry.js";
import nodemailer from "nodemailer";

/* ===============================
   PUBLIC: Submit Inquiry
================================ */
export const submitInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.create(req.body);

    // Auto-reply email logic
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Courier Management System" <${process.env.EMAIL_USER}>`,
      to: inquiry.email,
      subject: "Thank you for contacting us - Courier Management System",
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e2e8f0; rounded-lg: 1rem;">
          <h2 style="color: #2563eb; font-style: italic;">Thank You for Reaching Out!</h2>
          <p style="color: #4b5563; font-size: 16px; line-height: 1.5;">Hello <strong>${inquiry.name}</strong>,</p>
          <p style="color: #4b5563; font-size: 14px; line-height: 1.5;">
            We have received your inquiry regarding "<strong>${inquiry.subject}</strong>".
          </p>
          <p style="color: #4b5563; font-size: 14px; line-height: 1.5;">
            Our team members will contact you as soon as possible. We appreciate your patience.
          </p>
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;">
          <p style="color: #9ca3af; font-size: 12px; text-align: center;">
            &copy; ${new Date().getFullYear()} Courier Management System. All rights reserved.
          </p>
        </div>
      `,
    };

    // We don't await this to avoid delaying the response to the user,
    // but in a production app you might want to handle failures.
    transporter.sendMail(mailOptions).catch(err => console.error("Auto-reply failed:", err));

    res.status(201).json({
      message: "Inquiry submitted successfully. An automated reply has been sent to your email.",
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
      from: `"Courier Management System" <${process.env.EMAIL_USER}>`,
      to: inquiry.email,
      subject: `RE: ${inquiry.subject}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 1rem;">
          <h2 style="color: #2563eb; font-style: italic;">Response to Your Inquiry</h2>
          <p style="color: #4b5563; font-size: 16px; line-height: 1.5;">Hello <strong>${inquiry.name}</strong>,</p>
          <p style="color: #4b5563; font-size: 14px; line-height: 1.5;">
            Our support team has reviewed your inquiry "<strong>${inquiry.subject}</strong>" and has the following response:
          </p>
          <div style="background-color: #f8fafc; padding: 20px; border-left: 4px solid #2563eb; margin: 20px 0; border-radius: 0.5rem;">
            <p style="color: #1e293b; font-size: 14px; margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="color: #4b5563; font-size: 14px; line-height: 1.5;">
            If you have any further questions, please feel free to reach out.
          </p>
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;">
          <p style="color: #9ca3af; font-size: 12px; text-align: center;">
            &copy; ${new Date().getFullYear()} Courier Management System. All rights reserved.
          </p>
        </div>
      `,
    });

    inquiry.status = "Responded";
    inquiry.responseMessage = message;
    await inquiry.save();

    res.json({ message: "Response sent successfully", inquiry });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
