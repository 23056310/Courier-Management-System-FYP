import mongoose from "mongoose";

const websiteSettingsSchema = new mongoose.Schema(
  {
    siteName: { type: String, default: "CourierMS" },
    siteLogo: { type: String, default: "" },
    siteEmail: { type: String, default: "support@courierms.com" },
    sitePhone: { type: String, default: "+977-9800000000" },
    siteAddress: { type: String, default: "New Baneshwor, Kathmandu, Nepal" },
    
    // Social Media Links
    facebook: { type: String, default: "" },
    twitter: { type: String, default: "" },
    instagram: { type: String, default: "" },
    linkedin: { type: String, default: "" },

    // Footer & SEO
    footerText: { type: String, default: "© 2026 CourierMS. All rights reserved." },
    metaDescription: { type: String, default: "Premium Courier Management System" },
  },
  { timestamps: true }
);

export default mongoose.model("WebsiteSettings", websiteSettingsSchema);
