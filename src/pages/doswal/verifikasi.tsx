import React, { FC } from "react";
import Http from "../../helpers/Fetch";
import AuthUser from "../../helpers/AuthUser";
import Navbar from "../../components/layouts/Navbar";
import Sidebar from "../../components/layouts/Sidebar";
import SidebarDoswal from "./SidebarDoswal";
import { Link } from "react-router-dom";
import "../auth/Coba.css";
import LokalDoswal from "../../helpers/LokalDoswal";

const Verifikasi: FC = () => {
  const user = AuthUser.GetAuth();
  const doswal = LokalDoswal.GetDoswal();

  const GetCurrentUser = async () => {
    try {
      const res = await Http.get("/user/detail", {
        headers: { Authorization: `Bearer ${user?.token}` },
      });

      console.log(res.data);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="w-full flex h-screen">
        <SidebarDoswal name={doswal?.nama || ""} />
        <div className="flex-1 flex flex-col p-4">
          <h1 className="text-4xl font-bold mb-4">Verifikasi</h1>

          {/* <Link
            to="/dashboardmahasiswa/irs/create"
            className="flex items-center justify-end px-4 py-2 mt-4 text-gray-700  rounded-lg dark:bg-gray-800 dark:text-gray-200"
          >
            <button className="bg-[#162953] text-white rounded-xl px-4 py-2 mt-4 mr-5">
              Tambahkan IRS
            </button>
          </Link> */}

          <div className="flex flex-col mt-4">
            <div className="flex flex-col mt-4 ">
              <div className="flex flex-row justify-between items-center bg-[#162953] rounded-xl px-4 py-2 mb-2">
                <div className="flex flex-col">
                  <h1 className="text-white font-bold text-3xl">IRS</h1>
                  <h1 className="text-white">( Isian Rencana Studi )</h1>
                </div>
                <div className="flex flex-row">
                  <Link to={`/doswal/LihatIRS`}>
                    <button className="bg-[#FBBF24] rounded-xl px-4 py-2">
                      Lihat
                    </button>
                  </Link>
                </div>
              </div>

              <div className="flex flex-row justify-between items-center bg-[#162953] rounded-xl px-4 py-2 mb-2">
                <div className="flex flex-col">
                  <h1 className="text-white font-bold text-3xl">KHS</h1>
                  <h1 className="text-white">( Kartu Hasil Studi )</h1>
                </div>
                <div className="flex flex-row">
                  <Link to={`/dashboardmahasiswa/irs/detail/`}>
                    <button className="bg-[#FBBF24] rounded-xl px-4 py-2">
                      Lihat
                    </button>
                  </Link>
                </div>
              </div>

              <div className="flex flex-row justify-between items-center bg-[#162953] rounded-xl px-4 py-2 mb-2">
                <div className="flex flex-col">
                  <h1 className="text-white font-bold text-3xl">PKL</h1>
                  <h1 className="text-white">( Praktik Kerja Lapangan )</h1>
                </div>
                <div className="flex flex-row">
                  <Link to={`/dashboardmahasiswa/irs/detail/`}>
                    <button className="bg-[#FBBF24] rounded-xl px-4 py-2">
                      Lihat
                    </button>
                  </Link>
                </div>
              </div>

              <div className="flex flex-row justify-between items-center bg-[#162953] rounded-xl px-4 py-2 mb-2">
                <div className="flex flex-col">
                  <h1 className="text-white font-bold text-3xl">SKRIPSI</h1>
                  <h1 className="text-white">( Tugas Akhir )</h1>
                </div>
                <div className="flex flex-row">
                  <Link to={`/dashboardmahasiswa/irs/detail/`}>
                    <button className="bg-[#FBBF24] rounded-xl px-4 py-2">
                      Lihat
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      ;
    </>
  );
};

export default Verifikasi;
