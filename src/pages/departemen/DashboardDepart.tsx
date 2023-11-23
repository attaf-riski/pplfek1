import React, { FC } from "react";
import Http from "../../helpers/Fetch";
import AuthUser from "../../helpers/AuthUser";
import Navbar from "../../components/layouts/Navbar";
import SidebarDep from "./SidebarDep";
import "../auth/Coba.css";

const DashboardDepart: FC = () => {
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
        <SidebarDep />
        <div className="flex-1 flex flex-col p-4">
          <div className="w-full h-screen flex flex-col justify-center items-center gap-10">
            <img src="/images/logo.png" alt="" className="w-[100px]" />
            <h1 className="text-3xl font-bold">404 - Coming Sooooon...</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardDepart;
