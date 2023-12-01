import React, { FC, useEffect, useState } from "react";
// import AuthUser from "../../helpers/AuthUser";
import Navbar from "../../components/layouts/Navbar";
import SidebarDoswal from "./SidebarDoswal";
import { Link } from "react-router-dom";
import AuthUser from "../../helpers/AuthUser";
import LokalDoswal from "../../helpers/LokalDoswal";
import Http from "../../helpers/Fetch";
import Swal from "sweetalert2";

const DashboardDoswal: FC = () => {
  const user = AuthUser.GetAuth();
  const doswal = LokalDoswal.GetDoswal();
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
      const res = await Http.get("/dashboarddoswal/" + doswal?.NIP, {
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
        <SidebarDoswal name={doswal?.nama || ""} />
        <div className="w-full h-72 grid grid-cols-3 gap-7 p-5">
          {/* buatkan card dashboard */}
          <div className="w-full h-76 px-8 py-4 bg-gray rounded-lg shadow-lg dark:bg-gray-800">
            <div className="w-full h-full flex flex-col justify-center items-center mb-6">
              <h2 className="mt-2 mb-5 text-6xl font-bold text-gray-800 dark:text-white md:mt-0">
                {dataDashboard.jumlahMahasiswaWali}
              </h2>
              <h2 className="mt-2 mb-5 text-xl font-semibold text-gray-800 dark:text-white md:mt-0">
                Mahasiswa Wali
              </h2>
            </div>
          </div>

          <div className="w-full h-76 px-8 py-4 bg-gray rounded-lg shadow-lg dark:bg-gray-800">
            <div className="w-full h-full flex flex-col justify-center items-center mb-6">
              <h2 className="mt-2 mb-5 text-6xl font-bold text-gray-800 dark:text-white md:mt-0">
                {dataDashboard.jumlahMahasiswaLulusPKL}
              </h2>
              <h2 className="mt-2 mb-5 text-xl font-semibold text-gray-800 dark:text-white md:mt-0">
                Mahasiswa Wali Lulus PKL
              </h2>
            </div>
          </div>

          <div className="w-full h-76 px-8 py-4 bg-gray rounded-lg shadow-lg dark:bg-gray-800">
            <div className="w-full h-full flex flex-col justify-center items-center mb-6">
              <h2 className="mt-2 mb-5 text-6xl font-bold text-gray-800 dark:text-white md:mt-0">
                {dataDashboard.jumlahMahasiswaLulusSkripsi}
              </h2>
              <h2 className="mt-2 mb-5 text-xl font-semibold text-gray-800 dark:text-white md:mt-0">
                Mahasiswa Wali Lulus Skripsi
              </h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardDoswal;
