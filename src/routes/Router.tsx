import React from "react";
import { Routes, Route } from "react-router-dom";

import { LandingPage, NotFoundPage } from "../pages";
import { DashboardOperatorPage, UploudCSV } from "../pages/operator";

import { Register, Login, Coba } from "../pages/auth";
import ProtectRoute from "./ProtectedRoute";
import ProtectRouteOperator from "./ProtectedRouteOperator";
import { DashboardMahasiswaPage } from "../pages/mahasiswa";
import ProtectRouteMahasiswa from "./ProtectedRouteMahasiswa";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth/register" element={<Register />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/coba" element={<Coba />} />

      {/* Operator */}
      <Route
        path="/dashboardoperator"
        element={
          <ProtectRoute>
            <ProtectRouteOperator>
              <DashboardOperatorPage />
            </ProtectRouteOperator>
          </ProtectRoute>
        }
      />
      <Route
        path="/dashboardoperator/uploudcsv"
        element={
          <ProtectRoute>
            <ProtectRouteOperator>
              <UploudCSV />
            </ProtectRouteOperator>
          </ProtectRoute>
        }
      />

      {/* Mahasiswa */}
      <Route
        path="/dashboardmahasiswa"
        element={
          <ProtectRoute>
            <ProtectRouteMahasiswa>
              <DashboardMahasiswaPage />
            </ProtectRouteMahasiswa>
          </ProtectRoute>
        }
      />

      {/* Dosen */}

      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Router;
