import React, { createContext, useState, useEffect } from 'react';
import { loginUser, registerUser, getProfile, logoutUser } from '../services/authService';

// ✅ Create context
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // ✅ Include setUser
  const [loading, setLoading] = useState(true);

  // Fetch profile if token exists
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getProfile()
        .then((data) => setUser(data.user || data)) // adjust if backend sends user object
        .catch(() => setUser(null))
        .finally(() => setLoading(false));
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(false);
    }
  }, []);

  // Login function
  const login = async (credentials) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const data = await loginUser(credentials);
      localStorage.setItem('token', data.token);
      setUser(data.user); // ✅ Update context
      return data.user;
    } catch (error) {
      throw error;
    }
  };

  // Register function
  const register = async (details) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const data = await registerUser(details);
      localStorage.setItem('token', data.token);
      setUser(data.user); // ✅ Update context
      return data.user;
    } catch (error) {
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    logoutUser();
    setUser(null);
  };

  return (
    // ✅ Provide setUser so Profile.jsx can update user immediately
    <AuthContext.Provider value={{ user, setUser, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
