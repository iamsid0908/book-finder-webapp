import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/Context/authContext";

function ProtectedRoute() {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
