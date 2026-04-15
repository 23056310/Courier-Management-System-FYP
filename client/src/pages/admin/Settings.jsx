import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

function Settings() {

  const [settings, setSettings] = useState({
    websiteName: "Courier MS",
    email: "support@courierms.com",
    phone: "9800000000",
    address: "Kathmandu, Nepal",
  });

  const handleChange = (e) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    alert("Settings updated successfully (Dummy Action)");
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 px-6 py-10">

        {/* HEADER */}
        <h1 className="text-3xl font-bold text-blue-600 mb-6">
          System Settings
        </h1>

        {/* SETTINGS FORM */}
        <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl">

          {/* WEBSITE NAME */}
          <div className="mb-4">
            <label className="block text-gray-600 mb-1">
              Website Name
            </label>
            <input
              type="text"
              name="websiteName"
              value={settings.websiteName}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
            />
          </div>

          {/* EMAIL */}
          <div className="mb-4">
            <label className="block text-gray-600 mb-1">
              Support Email
            </label>
            <input
              type="email"
              name="email"
              value={settings.email}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
            />
          </div>

          {/* PHONE */}
          <div className="mb-4">
            <label className="block text-gray-600 mb-1">
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              value={settings.phone}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
            />
          </div>

          {/* ADDRESS */}
          <div className="mb-4">
            <label className="block text-gray-600 mb-1">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={settings.address}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
            />
          </div>

          {/* SAVE BUTTON */}
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Save Settings
          </button>

        </div>

        {/* INFO PANEL */}
        <div className="mt-10 bg-white p-6 rounded-lg shadow">

          <h2 className="text-xl font-bold mb-3">
            System Information
          </h2>

          <ul className="text-gray-600 space-y-2">

            <li>✔ Version: 1.0.0</li>
            <li>✔ Backend: Node.js + Express (Ready)</li>
            <li>✔ Database: MongoDB</li>
            <li>✔ Authentication: Role-based (Admin, Driver, Customer)</li>

          </ul>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default Settings;