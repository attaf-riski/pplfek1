import React, { FC } from "react";
import Http from "../../helpers/Fetch";
import AuthUser from "../../helpers/AuthUser";
import Navbar from "../../components/layouts/Navbar";
import Sidebar from "../../components/layouts/Sidebar";
import SidebarDoswal from "./SidebarDoswal";
import { Link } from 'react-router-dom';
import "../auth/Coba.css";

const PencarianDoswal: FC = () => {
  const user = AuthUser.GetAuth();

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
        <SidebarDoswal/>
        <div className="flex-1 flex flex-col p-4">
        <h1 className="text-4xl font-bold mb-4">Pencarian</h1>
          <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Cari..."
            className="border-2 border-gray-300 p-2 rounded-md"
          />
          <button className="bg-[#162953] text-white rounded-xl px-4 py-2 ml-2">
            Cari
          </button>
          </div>
          <h4 className=" font-normal mb-4">Jumlah Mahasiswa Perwalian : berapa sekian</h4>
          
          {/* <Link
            to="/dashboardmahasiswa/irs/create"
            className="flex items-center justify-end px-4 py-2 mt-4 text-gray-700  rounded-lg dark:bg-gray-800 dark:text-gray-200"
          >
            <button className="bg-[#162953] text-white rounded-xl px-4 py-2 mt-4 mr-5">
              Tambahkan IRS
            </button>
          </Link> */}

          <div className="flex flex-col">
            <div className="flex flex-col mt-2">
                    <div
                      className="flex flex-row justify-between items-center bg-[#162953] rounded-xl px-4 py-2 mb-2"
                    >
                      <div className="flex flex-col">
                        <h1 className="text-white font-bold">
                          Attaf Riski Putra Ramadhan
                        </h1>
                        <h1 className="text-white">
                          NIM : 24060121120002 
                        </h1>
                      </div>
                      <div className="flex flex-row">
                        <Link
                          to={
                            `/dashboardmahasiswa/irs/detail/` 
                          }
                        >
                          <button className="bg-[#FBBF24] rounded-xl px-4 py-2">
                            Lihat Detail
                          </button>
                        </Link>
                      </div>
                    </div>

                    <div
                      className="flex flex-row justify-between items-center bg-[#162953] rounded-xl px-4 py-2 mb-2"
                    >
                      <div className="flex flex-col">
                        <h1 className="text-white font-bold">
                          Raihan Gilang Firdausy
                        </h1>
                        <h1 className="text-white">
                          NIM : 24060121130065 
                        </h1>
                      </div>
                      <div className="flex flex-row">
                        <Link
                          to={
                            `/dashboardmahasiswa/irs/detail/` 
                          }
                        >
                          <button className="bg-[#FBBF24] rounded-xl px-4 py-2">
                            Lihat Detail
                          </button>
                        </Link>
                      </div>
                    </div>

                    <div
                      className="flex flex-row justify-between items-center bg-[#162953] rounded-xl px-4 py-2 mb-2"
                    >
                      <div className="flex flex-col">
                        <h1 className="text-white font-bold">
                          Majid Ilham Adhim
                        </h1>
                        <h1 className="text-white">
                          NIM : 24060121130069
                        </h1>
                      </div>
                      <div className="flex flex-row">
                        <Link
                          to={
                            `/dashboardmahasiswa/irs/detail/` 
                          }
                        >
                          <button className="bg-[#FBBF24] rounded-xl px-4 py-2">
                            Lihat Detail
                          </button>
                        </Link>
                      </div>
                    </div>

                    <div
                      className="flex flex-row justify-between items-center bg-[#162953] rounded-xl px-4 py-2 mb-2"
                    >
                      <div className="flex flex-col">
                        <h1 className="text-white font-bold">
                          Michael Jonadi
                        </h1>
                        <h1 className="text-white">
                          NIM : 24060121130069
                        </h1>
                      </div>
                      <div className="flex flex-row">
                        <Link
                          to={
                            `/dashboardmahasiswa/irs/detail/` 
                          }
                        >
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

export default PencarianDoswal;
