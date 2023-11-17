import React, { FC } from "react";
// import AuthUser from "../../helpers/AuthUser";
import Navbar from "../../components/layouts/Navbar";
import SidebarOp from "./SidebarOp";

const DashboardOperator: FC = () => {
  // const user = AuthUser.GetAuth();

  return (
    <>
      <Navbar></Navbar>
      <div className="w-full flex h-screen ">
        <SidebarOp name="" />
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

export default DashboardOperator;
