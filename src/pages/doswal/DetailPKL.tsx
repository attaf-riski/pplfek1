import React, { FC } from "react";
import Http from "../../helpers/Fetch";
import AuthUser from "../../helpers/AuthUser";
import Navbar from "../../components/layouts/Navbar";
import Sidebar from "../../components/layouts/Sidebar";
import SidebarDoswal from "./SidebarDoswal";
import { Link } from 'react-router-dom';
import "../auth/Coba.css";

const DetailPKL: FC = () => {
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
        <h1 className="text-4xl font-bold mb-5">Verifikasi PKL</h1>
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
        </div>
        </div>
      </div>
      ;
    </>
    );
};

export default DetailPKL;
