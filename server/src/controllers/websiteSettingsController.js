
import WebsiteSettings from "../models/WebsiteSettings.js";

/* =====================================================
   PUBLIC: Get Website Settings
===================================================== */
export const getPublicSettings = async (req, res) => {
  try {
    let settings = await WebsiteSettings.findOne();
    if (!settings) settings = await WebsiteSettings.create({});
    res.json(settings);
  } catch (error) {
    console.error("Public settings error:", error);
    res.status(500).json({ message: error.message });
  }
};

/* =====================================================
   ADMIN: Get Settings
===================================================== */
export const getSettings = async (req, res) => {
  try {
    let settings = await WebsiteSettings.findOne();
    if (!settings) settings = await WebsiteSettings.create({});
    res.json(settings);
  } catch (error) {
    console.error("Admin get settings error:", error);
    res.status(500).json({ message: error.message });
  }
};

/* =====================================================
   ADMIN: Create or Update Settings
===================================================== */
export const updateSettings = async (req, res) => {
  try {
    let settings = await WebsiteSettings.findOne();
    const data = req.body;

    // Ensure req.files exists
    const files = req.files || {};

    // Handle uploaded images
    if (files.siteLogo && files.siteLogo[0]) {
      data.siteLogo = files.siteLogo[0].path.replace(/\\/g, "/");
    }

    if (files.banner && files.banner[0]) {
      data.banner = files.banner[0].path.replace(/\\/g, "/");
    }

    if (!settings) {
      settings = await WebsiteSettings.create(data);
    } else {
      Object.assign(settings, data);
      await settings.save();
    }

    res.json({
      message: "Settings updated successfully",
      settings,
    });

  } catch (error) {
    console.error("Update settings error:", error);
    res.status(500).json({ message: error.message });
  }
};

/* =====================================================
   ADMIN: Delete All Settings
===================================================== */
export const deleteSettings = async (req, res) => {
  try {
    await WebsiteSettings.deleteMany({});
    res.json({ message: "Website settings cleared" });
  } catch (error) {
    console.error("Delete settings error:", error);
    res.status(500).json({ message: error.message });
  }
};
