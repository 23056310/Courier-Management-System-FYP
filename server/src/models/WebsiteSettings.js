
import mongoose from "mongoose";

const websiteSettingsSchema = new mongoose.Schema(
  {
    siteLogo: { type: String, default: "" },
    banner: { type: String, default: "" },

    siteTitle: { type: String, default: "HostelBooking" },
    siteDescription: { type: String, default: "" },

    facebook: { type: String, default: "" },
    twitter: { type: String, default: "" },
    instagram: { type: String, default: "" },
    linkedin: { type: String, default: "" },

    contactEmail: { type: String, default: "" },
    contactPhone: { type: String, default: "" },
    contactAddress: { type: String, default: "" },

    copyright: { type: String, default: "" },
    openingHours: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("WebsiteSettings", websiteSettingsSchema);
