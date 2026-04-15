
import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/public/Home";
import About from "./pages/public/About";
import Contact from "./pages/public/Contact";
import Profile from "./pages/public/Profile";

import ForgetPassword from "./pages/auth/ForgetPassword";
import ResetPassword from "./pages/auth/ResetPassword";

// import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageUsers from "./pages/admin/ManageUsers";
import ManageInquiry from "./pages/admin/ManageInquiry";
import Settings from "./pages/admin/Settings";


import Unauthorized from "./pages/errors/Unauthorized";
import NotFound from "./pages/errors/NotFound";

import ProtectedRoute from "./context/ProtectedRoute";


function App() {
  return (
    <Routes>

      {/* PUBLIC ROUTES */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
    
      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* PROTECTED ROUTES */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute roles={["student", "admin", "owner"]}>
            <Profile  />
          </ProtectedRoute>
        }
      />

      {/* ADMIN ROUTES */}
   

      <Route
        path="/manage-users"
        element={
          <ProtectedRoute roles={["admin"]}>
            <ManageUsers />
          </ProtectedRoute>
        }
      />

      <Route
        path="/manage-inquiries"
        element={
          <ProtectedRoute roles={["admin"]}>
            <ManageInquiry />
          </ProtectedRoute>
        }
      />
       
      <Route
        path="/settings"
        element={
          <ProtectedRoute roles={["admin"]}>
            <Settings  />
          </ProtectedRoute>
        }
      />

   

      {/* ERROR ROUTES */}
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<NotFound />} />


    </Routes>

  );
}

export default App;
