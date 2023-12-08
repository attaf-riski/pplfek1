import React, { FC, useEffect, useState } from "react";
// import AuthUser from "../../helpers/AuthUser";
import Navbar from "../../components/layouts/Navbar";
import SidebarOp from "./SidebarOp";
import { Link } from "react-router-dom";
import AuthUser from "../../helpers/AuthUser";
import LokalOperator from "../../helpers/LokalOperator";
import Http from "../../helpers/Fetch";
import Swal from "sweetalert2";

const DashboardOperator: FC = () => {
  const user = AuthUser.GetAuth();
  const operator = LokalOperator.GetOperator();

  const [dataDashboard, setDataDashboard]: any = useState({
    jumlahAkunMahasiswa: 0,
    jumlahAkunDoswal: 0,
    jumlahAkunOperator: 0,
  });

  const keyDashboard = [
    "jumlahAkunMahasiswa",
    "jumlahAkunDoswal",
    "jumlahAkunOperator",
  ];

  useEffect(() => {
    GetDashboardDoswal();
  }, []);

  const GetDashboardDoswal = async () => {
    try {
      const res = await Http.get("/dashboardoperator", {
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
      <div className="w-full flex h-screen ">
        <SidebarOp name={operator?.nama || ""} />
        <div className="flex-1 flex flex-col p-4">
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <div className="w-full grid grid-cols-4 grid-rows-1 gap-7">
            {/* buatkan card dashboard */}

            {[
              "Jumlah Akun Mahasiswa",
              "Jumlah Akun Dosen Wali",
              "Jumlah Akun Departemen",
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
                {operator?.nama || ""}
              </h1>
              <h1 className="text-white">NIP : {operator?.NIP || ""}</h1>
              <h1 className="text-white mb-3">
                Email : {operator?.email || ""}
              </h1>
            </div>
            <div className="h-full flex flex-row items-end mb-3">
              <Link to={`/operator/editdataoperator/${operator?.NIP}`}>
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

export default DashboardOperator;
