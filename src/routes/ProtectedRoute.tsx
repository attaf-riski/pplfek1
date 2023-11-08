import React, { FC } from "react";
import { useLocation, Navigate } from "react-router-dom";
import AuthUser from "../helpers/AuthUser";

const ProtectRoute = ({ children }: { children: JSX.Element }) => {
  const user = AuthUser.GetAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectRoute;
