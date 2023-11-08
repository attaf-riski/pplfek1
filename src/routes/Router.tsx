import React from "react";
import { Routes, Route } from "react-router-dom";

import { DashboardOperatorPage, LandingPage, NotFoundPage } from "../pages";

import { Register, Login, Coba } from "../pages/auth";
import ProtectRoute from "./ProtectedRoute";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth/register" element={<Register />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/coba" element={<Coba />} />
      <Route
        path="/dashboardoperator"
        element={
          <ProtectRoute>
            <DashboardOperatorPage />
          </ProtectRoute>
        }
      />
      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Router;
