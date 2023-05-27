import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../AuthContext";

const ProtectedRoutes = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/en" />;
  }
  return <Outlet />;
};

export default ProtectedRoutes;
