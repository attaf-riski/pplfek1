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
        <SidebarOp />
        <section className="bg-white dark:bg-gray-900 flex justify-center items-center h-screen ml-20">
          <div className="flex-1 flex flex-col h-screen">
            <h3>Hehehehehe</h3>
          </div>
        </section>
      </div>
    </>
  );
};

export default DashboardOperator;
