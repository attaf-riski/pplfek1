import React from "react";
import { Routes, Route } from "react-router-dom";

import { LandingPage, NotFoundPage } from "../pages";
import { DashboardOperatorPage } from "../pages/operator";


import { Register, Login, Coba } from "../pages/auth";
import ProtectRoute from "./ProtectedRoute";
import { UploudCSV } from "../pages/operator";
import { DashboardDepartPage, HasilCariPage, PencarianPage } from "../pages/departemen";
import { SidebarDepPage } from "../pages/departemen";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth/register" element={<Register />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/coba" element={<Coba />} />
      <Route path="/departemen/dashboarddepart" element={<DashboardDepartPage />} />
      <Route path="/departemen/pencarian" element={<PencarianPage />} />
      <Route path="/departemen/hasilcari" element={<HasilCariPage />} />
      <Route path="/departemen/sidebardepart" element={<SidebarDepPage />} />
      <Route
        path="/dashboardoperator"
        element={
          
            <DashboardOperatorPage />
          
        }
      />
      {/* Operator */}
      <Route path="/dashboardoperator/uploudcsv" element={<UploudCSV />} />

      

      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Router;
