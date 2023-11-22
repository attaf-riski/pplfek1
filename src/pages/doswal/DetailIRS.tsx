import React, { FC } from "react";
import Http from "../../helpers/Fetch";
import AuthUser from "../../helpers/AuthUser";
import Navbar from "../../components/layouts/Navbar";
import Sidebar from "../../components/layouts/Sidebar";
import SidebarDoswal from "./SidebarDoswal";
import { Link } from "react-router-dom";
import "../auth/Coba.css";
import LokalDoswal from "../../helpers/LokalDoswal";

const DetailIRS: FC = () => {
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
          <h1 className="text-4xl font-bold mb-5">IRS</h1>
          <h2 className="text-3xl font-bold ">Attaf Riski Putra Ramadhan</h2>
          <h4 className=" font-normal ">NIM : 24060121120002</h4>

          {/* <Link
            to="/dashboardmahasiswa/irs/create"
            className="flex items-center justify-end px-4 py-2 mt-4 text-gray-700  rounded-lg dark:bg-gray-800 dark:text-gray-200"
          >
            <button className="bg-[#162953] text-white rounded-xl px-4 py-2 mt-4 mr-5">
              Tambahkan IRS
            </button>
          </Link> */}

          <div className="flex flex-col mt-4">
            <div className="flex flex-col ">
              <div className="flex flex-row justify-between items-center bg-[#162953] rounded-xl px-4 py-2 mb-2">
                <div className="flex flex-col">
                  <h1 className="text-white font-bold text-2xl">Semester 1</h1>
                  <h1 className="text-white">( 21 SKS )</h1>
                </div>
                <div className="flex flex-row">
                  <Link to={`/doswal/veriIRS`}>
                    <button className="bg-[#FBBF24] rounded-xl px-4 py-2">
                      Lihat Detail
                    </button>
                  </Link>
                </div>
              </div>

              <div className="flex flex-row justify-between items-center bg-[#162953] rounded-xl px-4 py-2 mb-2">
                <div className="flex flex-col">
                  <h1 className="text-white font-bold text-2xl">Semester 2</h1>
                  <h1 className="text-white">( 24 SKS )</h1>
                </div>
                <div className="flex flex-row">
                  <Link to={`/dashboardmahasiswa/irs/detail/`}>
                    <button className="bg-[#FBBF24] rounded-xl px-4 py-2">
                      Lihat Detail
                    </button>
                  </Link>
                </div>
              </div>

              <div className="flex flex-row justify-between items-center bg-[#162953] rounded-xl px-4 py-2 mb-2">
                <div className="flex flex-col">
                  <h1 className="text-white font-bold text-2xl">Semester 3</h1>
                  <h1 className="text-white">( 24 SKS )</h1>
                </div>
                <div className="flex flex-row">
                  <Link to={`/dashboardmahasiswa/irs/detail/`}>
                    <button className="bg-[#FBBF24] rounded-xl px-4 py-2">
                      Lihat Detail
                    </button>
                  </Link>
                </div>
              </div>

              <div className="flex flex-row justify-between items-center bg-[#162953] rounded-xl px-4 py-2 mb-2">
                <div className="flex flex-col">
                  <h1 className="text-white font-bold text-2xl">Semester 4</h1>
                  <h1 className="text-white">( 21 SKS )</h1>
                </div>
                <div className="flex flex-row">
                  <Link to={`/dashboardmahasiswa/irs/detail/`}>
                    <button className="bg-[#FBBF24] rounded-xl px-4 py-2">
                      Lihat Detail
                    </button>
                  </Link>
                </div>
              </div>

              <div className="flex flex-row justify-between items-center bg-[#162953] rounded-xl px-4 py-2 mb-2">
                <div className="flex flex-col">
                  <h1 className="text-white font-bold text-2xl">Semester 5</h1>
                  <h1 className="text-white">( 24 SKS )</h1>
                </div>
                <div className="flex flex-row">
                  <Link to={`/dashboardmahasiswa/irs/detail/`}>
                    <button className="bg-[#FBBF24] rounded-xl px-4 py-2">
                      Lihat Detail
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

export default DetailIRS;
