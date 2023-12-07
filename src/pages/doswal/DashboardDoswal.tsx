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
  const [dataDashboard, setDataDashboard]: any = useState({
    jumlahAntrianVerifikasiIRS: 0,
    jumlahAntrianVerifikasiKHS: 0,
    jumlahAntrianVerifikasiPKL: 0,
    jumlahAntrianVerifikasiSkripsi: 0,
    jumlahMahasiswaWali: 0,
    jumlahMahasiswaLulusPKL: 0,
    jumlahMahasiswaLulusSkripsi: 0,
  });

  const keyDashboard = [
    "jumlahAntrianVerifikasiIRS",
    "jumlahAntrianVerifikasiKHS",
    "jumlahAntrianVerifikasiPKL",
    "jumlahAntrianVerifikasiSkripsi",
    "jumlahMahasiswaWali",
    "jumlahMahasiswaLulusPKL",
    "jumlahMahasiswaLulusSkripsi",
  ];

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
        <div className="flex-1 flex flex-col p-4">
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <div className="w-full h-[465px] grid grid-cols-4 grid-rows-2 gap-7">
            {/* buatkan card dashboard */}

            {[
              "Jumlah Antrian Verifikasi IRS",
              "Jumlah Antrian Verifikasi KHS",
              "Jumlah Antrian Verifikasi PKL",
              "Jumlah Antrian Verifikasi Skripsi",
              "Jumlah Mahasiswa Wali",
              "Jumlah Mahasiswa Lulus PKL",
              "Jumlah Mahasiswa Lulus Skripsi",
            ].map((item, index) => {
              return (
                <div className="w-full h-76 px-8 py-4 bg-gray rounded-lg shadow-lg bg-[#121E42]">
                  <div className="w-full h-full flex flex-col justify-center items-center mb-6">
                    <h2 className="mt-2 mb-5 text-6xl font-bold text-white md:mt-0 text-center">
                      {dataDashboard[keyDashboard[index]]}
                    </h2>
                    <h2 className="mt-2 mb-5 text-xl text-white font-bold md:mt-0 text-center  ">
                      {item}
                    </h2>
                  </div>
                </div>
              );
            })}
          </div>
          <h1 className="text-4xl font-bold mb-2 mt-2">Profil</h1>
          <div className="flex flex-row justify-between items-center bg-[#162953] rounded-xl px-4 py-2 mb-2 mt-2">
            <div className="flex flex-col ">
              <h1 className="text-white font-bold text-3xl mb-4">
                {doswal?.nama || ""}
              </h1>
              <h1 className="text-white">NIP : {doswal?.NIP || ""}</h1>
              <h1 className="text-white mb-3">Email : {doswal?.email || ""}</h1>
            </div>
            <div className="h-full flex flex-row items-end mb-3">
              <Link to={`/doswal/editdatadoswal/${doswal?.NIP}`}>
                <button className="bg-[#FBBF24] rounded-xl px-4 py-2">
                  Update Data
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardDoswal;
