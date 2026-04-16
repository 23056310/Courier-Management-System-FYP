import React, { createContext, useState, useEffect, useContext } from 'react';
import { getSettings } from '../services/websiteSettingsService';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    siteName: "CourierMS",
    siteEmail: "support@courierms.com",
    sitePhone: "+977-9800000000",
    siteAddress: "New Baneshwor, Kathmandu, Nepal",
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: "",
    footerText: "© 2026 CourierMS. All rights reserved.",
    metaDescription: "Premium Courier Management System"
  });
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const data = await getSettings();
      if (data) setSettings(data);
    } catch (error) {
      console.error("Error fetching settings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, loading, refreshSettings: fetchSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
