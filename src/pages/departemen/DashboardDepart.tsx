import React, { FC } from "react";
import Http from "../../helpers/Fetch";
import AuthUser from "../../helpers/AuthUser";
import Navbar from "../../components/layouts/Navbar";
import Sidebar from "../../components/layouts/Sidebar";
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
    <div className="flex">
      <SidebarDep />
      
      <div className="flex-1 flex flex-col justify-center items-center h-screen">
        <div className="w-full max-w-md px-8 py-4 bg-gray rounded-lg shadow-lg dark:bg-gray-800">
          <div className="flex justify-center mb-6">
            <img
              className="object-cover w-20 h-20 border-2 border-blue-500 rounded-full dark:border-blue-400"
              alt="Testimonial avatar"
              src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80"
            />
          </div>
          <h2 className="mt-2 mb-5 text-xl font-semibold text-gray-800 dark:text-white md:mt-0">Departemen, S.Kom, M.Kom</h2>

          <p className="mt-2 text-sm text-gray-600 dark:text-gray-200 p-container">NIP : 1980101100123</p>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-200 p-container">Status : Departemen</p>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-200 p-container">No.HP : 08512345</p>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-200 p-container">Alamat : Semarang</p>
          

          {/* <div className="flex justify-end mt-4">
            <a href="#" className="text-lg font-medium text-blue-600 dark:text-blue-300" tabIndex={0} role="link">John Doe</a>
          </div> */}
        </div>
      </div>
    </div>
    
  );
};

export default DashboardDepart;