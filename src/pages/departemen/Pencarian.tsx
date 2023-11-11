import React, { FC } from "react";
import Http from "../../helpers/Fetch";
import AuthUser from "../../helpers/AuthUser";
import Navbar from "../../components/layouts/Navbar";
import Sidebar from "../../components/layouts/Sidebar";
import SidebarDep from "./SidebarDep";
import "../auth/Coba.css";

const Pencarian: FC = () => {
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
    <div className="flex h-screen">
      <SidebarDep />
      <section className="bg-white dark:bg-gray-900 flex justify-center items-center h-screen ml-20">
      <div className="flex-1 flex flex-col h-screen">
        <div className="w-full max-w-md px-8 py-4 bg-gray rounded-lg shadow-lg dark:bg-gray-800">
            <div className="max-w-3xl px-6 py-16 mx-auto flex flex-col justify-center items-center text-center">
                <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-5">Cari Sesuatu?</h1>
                <p className="max-w-md mx-auto text-gray-500 dark:text-gray-400 mb-8">Cari Nama Mahasiswa atau yang lainnya!</p>

                <div className="flex space-y-3 sm:space-y-0 sm:flex-row sm:justify-center sm:-mx-2">
                    <input 
                        id="text" 
                        type="text" 
                        className="px-4 py-2 text-gray-700 bg-white border rounded-md sm:mx-2 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40" 
                        placeholder="Search"
                    />

                    <button className="px-4 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-700 rounded-md sm:mx-2 hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                        Search
                    </button>
                </div>
            </div>
          </div>
          </div>  
        </section>

    </div>
    
  );
};

export default Pencarian;
