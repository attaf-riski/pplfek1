import { Routes, Route } from "react-router-dom";
import { LandingPage, NotFoundPage } from "../pages";
import { Register, Login, Coba } from "../pages/auth";
import ProtectRoute from "./ProtectedRoute";
import ProtectRouteOperator from "./ProtectedRouteOperator";
import { DashboardMahasiswaPage } from "../pages/mahasiswa";
import ProtectRouteMahasiswa from "./ProtectedRouteMahasiswa";
import { DashboardOperatorPage, UploudCSV } from "../pages/operator";
import { DashboardDepartPage, PencarianPage } from "../pages/departemen";
import { SidebarDepPage } from "../pages/departemen";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth/register" element={<Register />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/coba" element={<Coba />} />

      <Route
        path="/departemen/dashboarddepart"
        element={<DashboardDepartPage />}
      />
      <Route path="/departemen/pencarian" element={<PencarianPage />} />
      <Route path="/departemen/sidebardepart" element={<SidebarDepPage />} />

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
      ></Route>
      <Route path="/dashboardoperator" element={<DashboardOperatorPage />} />
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
