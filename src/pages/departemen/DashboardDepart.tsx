import React, { FC, useEffect, useState } from "react";
import Http from "../../helpers/Fetch";
import AuthUser from "../../helpers/AuthUser";
import Navbar from "../../components/layouts/Navbar";
import SidebarDep from "./SidebarDep";
import "../auth/Coba.css";
import Swal from "sweetalert2";
import LokalDepartemen from "../../helpers/LokalDepartemen";

const DashboardDepart: FC = () => {
  const user = AuthUser.GetAuth();
  const departemen = LokalDepartemen.GetDepartemen();

  const [dataDashboard, setDataDashboard] = useState({
    jumlahMahasiswaWali: 0,
    jumlahMahasiswaLulusPKL: 0,
    jumlahMahasiswaLulusSkripsi: 0,
  });

  useEffect(() => {
    GetDashboardDoswal();
  }, []);

  const GetDashboardDoswal = async () => {
    try {
      const res = await Http.get("/dashboarddepartemen/" + departemen?.NIP, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });

      setDataDashboard(res.data?.data);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response?.data?.message,
      });
    }
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="w-full flex h-screen">
        <SidebarDep name={departemen?.nama || ""} />
        <div className="w-full h-72  grid grid-cols-3 gap-7 p-5">
          {/* buatkan card dashboard */}
          <div className="w-full h-72 px-8 py-4 bg-gray rounded-lg shadow-lg dark:bg-gray-800">
            <div className="w-full h-full flex flex-col justify-center items-center mb-6">
              <h2 className="mt-2 mb-5 text-6xl font-bold text-gray-800 dark:text-white md:mt-0">
                {dataDashboard.jumlahMahasiswaWali}
              </h2>
              <h2 className="mt-2 mb-5 text-xl font-semibold text-gray-800 dark:text-white md:mt-0">
                Mahasiswa Informatika
              </h2>
            </div>
          </div>

          <div className="w-full h-72 px-8 py-4 bg-gray rounded-lg shadow-lg dark:bg-gray-800">
            <div className="w-full h-full flex flex-col justify-center items-center mb-6">
              <h2 className="mt-2 mb-5 text-6xl font-bold text-gray-800 dark:text-white md:mt-0">
                {dataDashboard.jumlahMahasiswaLulusPKL}
              </h2>
              <h2 className="mt-2 mb-5 text-xl font-semibold text-gray-800 dark:text-white md:mt-0">
                Mahasiswa Informatika Lulus PKL
              </h2>
            </div>
          </div>

          <div className="w-full h-72 px-8 py-4 bg-gray rounded-lg shadow-lg dark:bg-gray-800">
            <div className="w-full h-full flex flex-col justify-center items-center mb-6">
              <h2 className="mt-2 mb-5 text-6xl font-bold text-gray-800 dark:text-white md:mt-0">
                {dataDashboard.jumlahMahasiswaLulusSkripsi}
              </h2>
              <h2 className="mt-2 mb-5 text-xl font-semibold text-gray-800 dark:text-white md:mt-0">
                Mahasiswa Informatika Lulus Skripsi
              </h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardDepart;
