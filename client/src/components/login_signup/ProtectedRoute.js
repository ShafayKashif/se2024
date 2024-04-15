import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ allowedRoles }) => {
  const { authState } = useAuth();
  const { isAuthenticated, role } = authState;

  // Debugging output
  console.log("Protected Route Access Attempt:", {
    isAuthenticated,
    role,
    allowedRoles,
  });

  if (isAuthenticated && allowedRoles.includes(role)) {
    console.log("Access Granted for role:", role);
    return <Outlet />;
  } else {
    console.log("Access Denied for role:", role, "Redirecting to login.");
    return <Navigate to="/" replace />;
  }
};

export default ProtectedRoute;
