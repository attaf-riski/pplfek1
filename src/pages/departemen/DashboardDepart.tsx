import React, { FC, useEffect, useState } from "react";
// import AuthUser from "../../helpers/AuthUser";
import Navbar from "../../components/layouts/Navbar";

import { Link } from "react-router-dom";
import AuthUser from "../../helpers/AuthUser";
import LokalDepartemen from "../../helpers/LokalDepartemen";
import Http from "../../helpers/Fetch";
import Swal from "sweetalert2";
import SidebarDep from "./SidebarDep";

const DashboardDepart: FC = () => {
  const user = AuthUser.GetAuth();
  const Departemen = LokalDepartemen.GetDepartemen();
  const [dataDashboard, setDataDashboard]: any = useState({
    jumlahMahasiswaAktif: 0,
    jumlahMahasiswaCuti: 0,
    jumlahMahasiswaLulusPKL: 0,
    jumlahMahasiswaLulusSkripsi: 0,
    jumlahMahasiswaInformatika: 0,
    jumlahDosenWaliInformatika: 0,
    jumlahOperatorInformatika: 0,
  });

  const keyDashboard = [
    "jumlahMahasiswaAktif",
    "jumlahMahasiswaCuti",
    "jumlahMahasiswaLulusPKL",
    "jumlahMahasiswaLulusSkripsi",
    "jumlahMahasiswaInformatika",
    "jumlahDosenWaliInformatika",
    "jumlahOperatorInformatika",
  ];

  useEffect(() => {
    GetDashboardDepart();
  }, []);

  const GetDashboardDepart = async () => {
    try {
      const res = await Http.get("/dashboarddepartemen/" + Departemen?.NIP, {
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
        <SidebarDep name={Departemen?.nama || ""} />
        <div className="flex-1 flex flex-col p-4">
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <div className="w-full h-[465px] grid grid-cols-4 grid-rows-2 gap-7">
            {/* buatkan card dashboard */}

            {[
              "Jumlah Mahasiswa Aktif",
              "Jumlah Mahasiswa Cuti",
              "Jumlah Mahasiswa Lulus PKL",
              "Jumlah Mahasiswa Lulus Skripsi",
              "Jumlah Mahasiswa Informatika",
              "Jumlah Dosen Wali Informatika",
              "Jumlah Operator Informatika",
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
                {Departemen?.nama || ""}
              </h1>
              <h1 className="text-white">NIP : {Departemen?.NIP || ""}</h1>
              <h1 className="text-white mb-3">
                Email : {Departemen?.email || ""}
              </h1>
            </div>
            <div className="h-full flex flex-row items-end mb-3">
              <Link to={`/departemen/editdatadepartemen/${Departemen?.NIP}`}>
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

export default DashboardDepart;
