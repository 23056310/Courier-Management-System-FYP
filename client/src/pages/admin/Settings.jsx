
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import {
  getSettings,
  updateSettings,
  deleteSettings,
} from "../../services/websiteSettingsService";
import { getImageUrl } from "../../utils/imageUrl";

export default function Settings() {
  const [websiteSettings, setWebsiteSettings] = useState(null);
  const [originalSettings, setOriginalSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState(true);

  const [files, setFiles] = useState({
    siteLogo: null,
    banner: null,
  });

  // Load settings
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await getSettings();
        setWebsiteSettings(data);
        setOriginalSettings(data);
      } catch (error) {
        console.error("Failed to load settings:", error);
        alert("Failed to load settings");
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  // Handle text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setWebsiteSettings({ ...websiteSettings, [name]: value });
  };

  // Handle file upload + preview
  const handleFileUpload = (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    setFiles({ ...files, [fieldName]: file });

    const reader = new FileReader();
    reader.onload = () => {
      setWebsiteSettings({
        ...websiteSettings,
        [fieldName]: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };

  // Save/Update settings
  const handleSave = async () => {
    try {
      await updateSettings(websiteSettings, files);
      alert("Settings saved successfully!");

      setOriginalSettings(websiteSettings);
      setViewMode(true);

      setFiles({ siteLogo: null, banner: null });
    } catch (error) {
      console.error(error);
      alert("Failed to save settings");
    }
  };

  // Cancel edit
  const handleCancel = () => {
    setWebsiteSettings(originalSettings);
    setFiles({ siteLogo: null, banner: null });
    setViewMode(true);
  };

  // Delete settings
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete all settings?")) return;

    try {
      await deleteSettings();
      alert("All settings deleted!");

      setWebsiteSettings({
        siteLogo: "",
        banner: "",
        siteTitle: "",
        siteDescription: "",
        facebook: "",
        twitter: "",
        instagram: "",
        linkedin: "",
        contactEmail: "",
        contactPhone: "",
        contactAddress: "",
        copyright: "",
        openingHours: "",
      });

      setFiles({ siteLogo: null, banner: null });
    } catch (error) {
      console.error(error);
      alert("Failed to delete settings");
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <main className="flex-1">
        <Topbar />

        <section className="p-6 max-w-4xl mx-auto space-y-8">

          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold mb-6">Website Settings</h1>

            {viewMode ? (
              <div className="flex gap-3">
                <button
                  onClick={() => setViewMode(false)}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                >
                  Edit Settings
                </button>

                <button
                  onClick={handleDelete}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                >
                  Delete Settings
                </button>
              </div>
            ) : null}
          </div>

          {/* SITE LOGO */}
          <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
            <h2 className="text-2xl font-bold mb-4">Site Logo</h2>

            {websiteSettings.siteLogo && (
              <img
                src={
                  websiteSettings.siteLogo.startsWith("data:")
                    ? websiteSettings.siteLogo
                    : getImageUrl(websiteSettings.siteLogo)
                }
                alt="Logo Preview"
                className="w-32 h-32 object-contain mb-4"
              />
            )}

            {!viewMode && (
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, "siteLogo")}
                className="border border-gray-300 rounded px-3 py-2 w-full"
              />
            )}
          </div>

          {/* BANNER */}
          <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
            <h2 className="text-2xl font-bold mb-4">Banner Image</h2>

            {websiteSettings.banner && (
              <img
                src={
                  websiteSettings.banner.startsWith("data:")
                    ? websiteSettings.banner
                    : getImageUrl(websiteSettings.banner)
                }
                alt="Banner Preview"
                className="w-full h-48 object-cover mb-4"
              />
            )}

            {!viewMode && (
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, "banner")}
                className="border border-gray-300 rounded px-3 py-2 w-full"
              />
            )}
          </div>

          {/* SITE TITLE */}
          <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
            <h2 className="text-2xl font-bold">Site Title</h2>
            <input
              type="text"
              name="siteTitle"
              disabled={viewMode}
              value={websiteSettings.siteTitle}
              onChange={handleChange}
              className={`w-full border p-2 rounded ${
                viewMode ? "bg-gray-200 cursor-not-allowed" : ""
              }`}
            />
          </div>

          {/* SITE DESCRIPTION */}
          <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
            <h2 className="text-2xl font-bold">Site Description</h2>
            <textarea
              name="siteDescription"
              disabled={viewMode}
              value={websiteSettings.siteDescription}
              onChange={handleChange}
              rows="3"
              className={`w-full border p-2 rounded ${
                viewMode ? "bg-gray-200 cursor-not-allowed" : ""
              }`}
            />
          </div>

          {/* SOCIAL MEDIA */}
          <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
            <h2 className="text-2xl font-bold">Social Media Links</h2>

            {["facebook", "twitter", "instagram", "linkedin"].map((field) => (
              <input
                key={field}
                type="text"
                name={field}
                value={websiteSettings[field]}
                disabled={viewMode}
                onChange={handleChange}
                placeholder={`${field.charAt(0).toUpperCase() + field.slice(1)} URL`}
                className={`w-full border p-2 rounded ${
                  viewMode ? "bg-gray-200 cursor-not-allowed" : ""
                }`}
              />
            ))}
          </div>

          {/* CONTACT INFO */}
          <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
            <h2 className="text-2xl font-bold">Contact Information</h2>

            {["contactEmail", "contactPhone", "contactAddress"].map((field) => (
              <input
                key={field}
                type="text"
                name={field}
                disabled={viewMode}
                value={websiteSettings[field]}
                onChange={handleChange}
                placeholder={field}
                className={`w-full border p-2 rounded ${
                  viewMode ? "bg-gray-200 cursor-not-allowed" : ""
                }`}
              />
            ))}
          </div>

          {/* FOOTER INFO */}
          <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
            <h2 className="text-2xl font-bold">Footer Information</h2>

            <input
              type="text"
              name="copyright"
              disabled={viewMode}
              value={websiteSettings.copyright}
              onChange={handleChange}
              className={`w-full border p-2 rounded ${
                viewMode ? "bg-gray-200 cursor-not-allowed" : ""
              }`}
            />

            <textarea
              name="openingHours"
              disabled={viewMode}
              value={websiteSettings.openingHours}
              onChange={handleChange}
              className={`w-full border p-2 rounded ${
                viewMode ? "bg-gray-200 cursor-not-allowed" : ""
              }`}
            />
          </div>

          {/* ACTION BUTTONS */}
          {!viewMode && (
            <div className="flex gap-4">
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
              >
                Update Settings
              </button>

              <button
                onClick={handleCancel}
                className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
