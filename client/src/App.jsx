import React from "react";
import { Routes, Route } from "react-router-dom";

/* PUBLIC PAGES */
import Home from "./pages/public/Home";
import About from "./pages/public/About";
import Services from "./pages/public/Services";
import Contact from "./pages/public/Contact";
import TrackParcel from "./pages/public/TrackParcel";

/* AUTH */
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgetPassword from "./pages/auth/ForgetPassword";
import ResetPassword from "./pages/auth/ResetPassword";

/* PROFILE */
import Profile from "./pages/public/Profile";

/* ADMIN PAGES */
import Dashboard from "./pages/admin/Dashboard";
import ManageParcels from "./pages/admin/ManageParcels";
import ManageCustomers from "./pages/admin/ManageCustomers";
import ManageDrivers from "./pages/admin/ManageDrivers";
import ManageInquiries from "./pages/admin/ManageInquiries";
import Reports from "./pages/admin/Reports";
import Settings from "./pages/admin/Settings";

/* ERROR PAGES */
import Unauthorized from "./pages/errors/Unauthorized";
import NotFound from "./pages/errors/NotFound";

/* PROTECTED ROUTE */
import ProtectedRoute from "./context/ProtectedRoute";

function App() {
  return (
    <Routes>

      {/* ================= PUBLIC ROUTES ================= */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/track-parcel" element={<TrackParcel />} />

      {/* AUTH ROUTES */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* ================= PROTECTED PROFILE ================= */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute roles={["customer", "admin", "driver"]}>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* ================= ADMIN ROUTES ================= */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute roles={["admin"]}>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/parcels"
        element={
          <ProtectedRoute roles={["admin"]}>
            <ManageParcels />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/customers"
        element={
          <ProtectedRoute roles={["admin"]}>
            <ManageCustomers />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/drivers"
        element={
          <ProtectedRoute roles={["admin"]}>
            <ManageDrivers />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/inquiries"
        element={
          <ProtectedRoute roles={["admin"]}>
            <ManageInquiries />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/reports"
        element={
          <ProtectedRoute roles={["admin"]}>
            <Reports />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/settings"
        element={
          <ProtectedRoute roles={["admin"]}>
            <Settings />
          </ProtectedRoute>
        }
      />

      {/* ================= ERROR ROUTES ================= */}
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default App;