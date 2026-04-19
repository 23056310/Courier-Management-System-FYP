import React from "react";
import { Routes, Route } from "react-router-dom";

/* PUBLIC PAGES */
import Home from "./pages/public/Home";
import About from "./pages/public/About";
import Services from "./pages/public/Services";
import Contact from "./pages/public/Contact";

/* AUTH */
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgetPassword from "./pages/auth/ForgetPassword";
import ResetPassword from "./pages/auth/ResetPassword";

/* PROFILE */
import Profile from "./pages/public/Profile";
import Notifications from "./pages/public/Notifications";

/* ADMIN PAGES */
import AdminDashboard from "./pages/admin/Dashboard";
import ManageParcels from "./pages/admin/ManageParcels";
import ManageCustomers from "./pages/admin/ManageCustomers";
import ManageDrivers from "./pages/admin/ManageDrivers";
import ManageInquiries from "./pages/admin/ManageInquiries";
import Reports from "./pages/admin/Reports";
import Settings from "./pages/admin/Settings";

/* CUSTOMER PAGES */
import CustomerDashboard from "./pages/customer/Dashboard";
import ParcelHistory from "./pages/customer/ParcelHistory";
import CreateParcel from "./pages/customer/CreateParcel";
import CustomerTrackParcel from "./pages/customer/TrackParcel";

/* DRIVER PAGES */
import DriverDashboard from "./pages/driver/Dashboard";
import MyParcels from "./pages/driver/MyParcels";

/* ERROR PAGES */
import Unauthorized from "./pages/errors/Unauthorized";
import NotFound from "./pages/errors/NotFound";

/* PROTECTED ROUTE */
import ProtectedRoute from "./context/ProtectedRoute";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
    <Toaster position="top-center" reverseOrder={false} />
    <Routes>

      {/* ================= PUBLIC ROUTES ================= */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<Contact />} />

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
      <Route
        path="/notifications"
        element={
          <ProtectedRoute roles={["customer", "admin", "driver"]}>
            <Notifications />
          </ProtectedRoute>
        }
      />

      {/* ================= ADMIN ROUTES ================= */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute roles={["admin"]}>
            <AdminDashboard />
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

      {/* ================= CUSTOMER ROUTES ================= */}
      <Route
        path="/customer/dashboard"
        element={
          <ProtectedRoute roles={["customer"]}>
            <CustomerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/customer/parcels"
        element={
          <ProtectedRoute roles={["customer"]}>
            <ParcelHistory />
          </ProtectedRoute>
        }
      />
      <Route
        path="/customer/create-parcel"
        element={
          <ProtectedRoute roles={["customer"]}>
            <CreateParcel />
          </ProtectedRoute>
        }
      />
      <Route
        path="/customer/track-parcel"
        element={
          <ProtectedRoute roles={["customer"]}>
            <CustomerTrackParcel />
          </ProtectedRoute>
        }
      />

      {/* ================= DRIVER ROUTES ================= */}
      <Route
        path="/driver/dashboard"
        element={
          <ProtectedRoute roles={["driver"]}>
            <DriverDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/driver/my-parcels"
        element={
          <ProtectedRoute roles={["driver"]}>
            <MyParcels />
          </ProtectedRoute>
        }
      />

      {/* ================= ERROR ROUTES ================= */}
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<NotFound />} />

    </Routes>
    </>
  );
}

export default App;