
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children, roles }) {
  const { user, loading } = useContext(AuthContext);

  // While decoding/loading user
  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  // Not logged in → redirect to login/register
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ROLE CHECK: if page requires specific roles & user role does NOT match
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Access granted
  return children;
}
