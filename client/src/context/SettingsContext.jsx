
import React, { createContext, useState, useEffect } from "react";
import { getPublicSettings } from "../services/websiteSettingsService";

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await getPublicSettings();
        setSettings(data);
      } catch (err) {
        console.error("Failed to load settings in Context", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, loading }}>
      {children}
    </SettingsContext.Provider>
  );
};
