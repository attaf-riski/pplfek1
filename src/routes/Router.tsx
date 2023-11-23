import { Routes, Route } from "react-router-dom";
import { LandingPage, NotFoundPage } from "../pages";
import { Register, Login, Coba } from "../pages/auth";
import ProtectRoute from "./ProtectedRoute";

import {
  DashboardDepartPage,
  HasilCariPage,
  PencarianPage,
  ProfilDepart,
} from "../pages/departemen";
import {
  ProfilDoswalPage,
  SidebarDoswalPage,
  PencarianDoswalPage,
  VerifikasiPage,
  LihatIRSPage,
  DetailIRSPage,
  VeriIRSPage,
  DashboardDoswalPage,
  LihatKHSPage,
  DetailKHSPage,
  VeriKHSPage,
  LihatPKLPage,
  DetailPKLPage,
  DetailSkripsiPage,
  LihatSkripsiPage,
} from "../pages/doswal";
import ProtectRouteOperator from "./ProtectedRouteOperator";
import {
  CreateIRS,
  DashboardMahasiswaPage,
  DetailIRS,
  ListIRS,
  PKL,
  Skripsi,
  UpdataDataMahasiswa,
} from "../pages/mahasiswa";
import ProtectRouteMahasiswa from "./ProtectedRouteMahasiswa";
import {
  DashboardOperatorPage,
  UploudCSV,
  GenerateManualPage,
} from "../pages/operator";

import { SidebarDepPage } from "../pages/departemen";
import ProtectRouteDepartemen from "./ProtectedRouteDepartemen";
import ProtectRouteKelengkapanDataMahasiswa from "./ProtectedRouteKelengkapanDataMahasiswa";
import { CreateKHS, DetailKHS, ListKHS } from "../pages/mahasiswa/khs";
import ProtectRouteDoswal from "./ProtectedRouteDoswal";
import { ProgressStudiPage } from "../pages/doswal";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />{" "}
      {/* Kalau masih aktif tokennya langsung masuk dashboard kalau sudah tidak aktif langsung login */}
      <Route path="/auth/register" element={<Register />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/coba" element={<Coba />} />
      {/* doswal */}
      <Route
        path="/dashboarddoswal"
        element={
          <ProtectRoute>
            <ProtectRouteDoswal>
              <DashboardDoswalPage />
            </ProtectRouteDoswal>
          </ProtectRoute>
        }
      />
      <Route
        path="/dashboarddoswal/profildoswal"
        element={
          <ProtectRoute>
            <ProtectRouteDoswal>
              <ProfilDoswalPage />
            </ProtectRouteDoswal>
          </ProtectRoute>
        }
      />
      <Route
        path="/doswal/profildoswal"
        element={
          <ProtectRoute>
            <ProtectRouteDoswal>
              <ProfilDoswalPage />
            </ProtectRouteDoswal>
          </ProtectRoute>
        }
      />
      <Route path="/doswal/pencariandoswal" element={<PencarianDoswalPage />} />
      <Route
        path="/doswal/verifikasi"
        element={
          <ProtectRoute>
            <ProtectRouteDoswal>
              <VerifikasiPage />
            </ProtectRouteDoswal>
          </ProtectRoute>
        }
      />
      <Route
        path="/doswal/LihatIRS"
        element={
          <ProtectRoute>
            <ProtectRouteDoswal>
              <LihatIRSPage />
            </ProtectRouteDoswal>
          </ProtectRoute>
        }
      />
      <Route
        path="/doswal/DetailIRS/:NIM"
        element={
          <ProtectRoute>
            <ProtectRouteDoswal>
              <DetailIRSPage />
            </ProtectRouteDoswal>
          </ProtectRoute>
        }
      />
      <Route
        path="/doswal/veriIRS/:NIM&:semester"
        element={
          <ProtectRoute>
            <ProtectRouteDoswal>
              <VeriIRSPage />
            </ProtectRouteDoswal>
          </ProtectRoute>
        }
      />
      <Route
        path="/doswal/LihatKHS"
        element={
          <ProtectRoute>
            <ProtectRouteDoswal>
              <LihatKHSPage />
            </ProtectRouteDoswal>
          </ProtectRoute>
        }
      />
      <Route
        path="/doswal/DetailKHS/:NIM"
        element={
          <ProtectRoute>
            <ProtectRouteDoswal>
              <DetailKHSPage />
            </ProtectRouteDoswal>
          </ProtectRoute>
        }
      />
      <Route
        path="/doswal/veriKHS/:NIM&:semester"
        element={
          <ProtectRoute>
            <ProtectRouteDoswal>
              <VeriKHSPage />
            </ProtectRouteDoswal>
          </ProtectRoute>
        }
      />
      <Route
        path="/doswal/LihatPKL"
        element={
          <ProtectRoute>
            <ProtectRouteDoswal>
              <LihatPKLPage />
            </ProtectRouteDoswal>
          </ProtectRoute>
        }
      />
      <Route
        path="/doswal/DetailPKL/:NIM"
        element={
          <ProtectRoute>
            <ProtectRouteDoswal>
              <DetailPKLPage />
            </ProtectRouteDoswal>
          </ProtectRoute>
        }
      />
      <Route
        path="/doswal/LihatSkripsi"
        element={
          <ProtectRoute>
            <ProtectRouteDoswal>
              <LihatSkripsiPage />
            </ProtectRouteDoswal>
          </ProtectRoute>
        }
      />
      <Route
        path="/doswal/DetailSkripsi/:NIM"
        element={
          <ProtectRoute>
            <ProtectRouteDoswal>
              <DetailSkripsiPage />
            </ProtectRouteDoswal>
          </ProtectRoute>
        }
      />
      <Route path="/operator/GenerateManual" element={<GenerateManualPage />} />
      <Route path="/doswal/ProgressStudi" element={<ProgressStudiPage />} />
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
        path="/dashboarddepart/profil"
        element={
          <ProtectRoute>
            <ProtectRouteDepartemen>
              <ProfilDepart />
            </ProtectRouteDepartemen>
          </ProtectRoute>
        }
      />
      <Route
        path="/departemen/dashboarddepart"
        element={<DashboardDepartPage />}
      />
      <Route path="/departemen/hasilcari" element={<HasilCariPage />} />
      <Route path="/departemen/sidebardepart" element={<SidebarDepPage />} />
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
          // <ProtectRoute>
          // <ProtectRouteMahasiswa>
          <UpdataDataMahasiswa />
          //   </ProtectRouteMahasiswa>
          // </ProtectRoute>
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
      <Route
        path="/dashboardmahasiswa/khs"
        element={
          <ProtectRoute>
            <ProtectRouteMahasiswa>
              <ProtectRouteKelengkapanDataMahasiswa>
                <ListKHS />
              </ProtectRouteKelengkapanDataMahasiswa>
            </ProtectRouteMahasiswa>
          </ProtectRoute>
        }
      />
      <Route
        path="/dashboardmahasiswa/khs/create"
        element={
          <ProtectRoute>
            <ProtectRouteMahasiswa>
              <ProtectRouteKelengkapanDataMahasiswa>
                <CreateKHS />
              </ProtectRouteKelengkapanDataMahasiswa>
            </ProtectRouteMahasiswa>
          </ProtectRoute>
        }
      />
      <Route
        path="/dashboardmahasiswa/khs/detail/:semester"
        element={
          <ProtectRoute>
            <ProtectRouteMahasiswa>
              <ProtectRouteKelengkapanDataMahasiswa>
                <DetailKHS />
              </ProtectRouteKelengkapanDataMahasiswa>
            </ProtectRouteMahasiswa>
          </ProtectRoute>
        }
      />
      <Route
        path="/dashboardmahasiswa/pkl"
        element={
          <ProtectRoute>
            <ProtectRouteMahasiswa>
              <ProtectRouteKelengkapanDataMahasiswa>
                <PKL />
              </ProtectRouteKelengkapanDataMahasiswa>
            </ProtectRouteMahasiswa>
          </ProtectRoute>
        }
      />
      <Route
        path="/dashboardmahasiswa/skripsi"
        element={
          <ProtectRoute>
            <ProtectRouteMahasiswa>
              <ProtectRouteKelengkapanDataMahasiswa>
                <Skripsi />
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
