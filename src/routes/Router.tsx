import { Routes, Route } from "react-router-dom";
import { LandingPage, NotFoundPage } from "../pages";
import { Register, Login, Coba } from "../pages/auth";
import ProtectRoute from "./ProtectedRoute";
import ProtectRouteOperator from "./ProtectedRouteOperator";
import {
  CreateIRS,
  DashboardMahasiswaPage,
  DetailIRS,
  ListIRS,
  UpdataDataMahasiswa,
} from "../pages/mahasiswa";
import ProtectRouteMahasiswa from "./ProtectedRouteMahasiswa";
import { DashboardOperatorPage, UploudCSV } from "../pages/operator";
import { DashboardDepartPage, PencarianPage } from "../pages/departemen";
import { SidebarDepPage } from "../pages/departemen";
import ProtectRouteDepartemen from "./ProtectedRouteDepartemen";
import ProtectRouteKelengkapanDataMahasiswa from "./ProtectedRouteKelengkapanDataMahasiswa";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth/register" element={<Register />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/coba" element={<Coba />} />

      {/* departemen */}
      <Route
        path="/dashboarddepart"
        element={
          <ProtectRoute>
            <ProtectRouteDepartemen>
              <DashboardDepartPage />
            </ProtectRouteDepartemen>
          </ProtectRoute>
        }
      />

      <Route
        path="/dashboarddepart/pencarian"
        element={
          <ProtectRoute>
            <ProtectRouteDepartemen>
              <PencarianPage />
            </ProtectRouteDepartemen>
          </ProtectRoute>
        }
      />
      <Route
        path="/dashboarddepart/sidebardepart"
        element={<SidebarDepPage />}
      />

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
              <ProtectRouteKelengkapanDataMahasiswa>
                <DashboardMahasiswaPage />
              </ProtectRouteKelengkapanDataMahasiswa>
            </ProtectRouteMahasiswa>
          </ProtectRoute>
        }
      />
      <Route
        path="/dashboardmahasiswa/profil"
        element={
          <ProtectRoute>
            <ProtectRouteMahasiswa>
              <UpdataDataMahasiswa />
            </ProtectRouteMahasiswa>
          </ProtectRoute>
        }
      />
      <Route
        path="/dashboardmahasiswa/irs"
        element={
          <ProtectRoute>
            <ProtectRouteMahasiswa>
              <ProtectRouteKelengkapanDataMahasiswa>
                <ListIRS />
              </ProtectRouteKelengkapanDataMahasiswa>
            </ProtectRouteMahasiswa>
          </ProtectRoute>
        }
      />
      <Route
        path="/dashboardmahasiswa/irs/create"
        element={
          <ProtectRoute>
            <ProtectRouteMahasiswa>
              <ProtectRouteKelengkapanDataMahasiswa>
                <CreateIRS />
              </ProtectRouteKelengkapanDataMahasiswa>
            </ProtectRouteMahasiswa>
          </ProtectRoute>
        }
      />
      <Route
        path="/dashboardmahasiswa/irs/detail/:semester"
        element={
          <ProtectRoute>
            <ProtectRouteMahasiswa>
              <ProtectRouteKelengkapanDataMahasiswa>
                <DetailIRS />
              </ProtectRouteKelengkapanDataMahasiswa>
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
