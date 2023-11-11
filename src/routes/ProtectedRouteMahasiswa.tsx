import React, { FC } from "react";
import { useLocation, Navigate } from "react-router-dom";
import AuthUser from "../helpers/AuthUser";
import Swal from "sweetalert2";

const ProtectRouteMahasiswa = ({ children }: { children: JSX.Element }) => {
  const user = AuthUser.GetAuth();
  const location = useLocation();

  if (user?.roleId !== 5) {
    Swal.fire({
      title: "Unauthorized",
      text: "Anda Tidak Memiliki Akses",
      icon: "error",
    });
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectRouteMahasiswa;
