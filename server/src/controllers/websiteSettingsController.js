import WebsiteSettings from "../models/websiteSettings.js";

// GET settings (Public/Admin)
export const getSettings = async (req, res) => {
  try {
    let settings = await WebsiteSettings.findOne();
    if (!settings) {
      settings = await WebsiteSettings.create({});
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE settings (Admin)
export const updateSettings = async (req, res) => {
  try {
    let settingsData = { ...req.body };
    
    // Handle logo upload if present
    if (req.file) {
      const baseUrl = `${req.protocol}://${req.get("host")}`;
      settingsData.siteLogo = `${baseUrl}/uploads/${req.file.filename}`;
    }

    let settings = await WebsiteSettings.findOne();
    if (settings) {
      settings = await WebsiteSettings.findByIdAndUpdate(settings._id, settingsData, { new: true });
    } else {
      settings = await WebsiteSettings.create(settingsData);
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// RESET settings to default (Admin)
export const resetSettings = async (req, res) => {
  try {
    await WebsiteSettings.deleteMany({});
    const settings = await WebsiteSettings.create({});
    res.json({ message: "Settings reset to default", settings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
