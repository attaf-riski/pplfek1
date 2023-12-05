import React, { FC } from "react";
import Http from "../../helpers/Fetch";
import AuthUser from "../../helpers/AuthUser";
import Navbar from "../../components/layouts/Navbar";
import Sidebar from "../../components/layouts/Sidebar";
import { Link } from "react-router-dom";
import "../auth/Coba.css";
import LokalOperator from "../../helpers/LokalOperator";
import SidebarOp from "./SidebarOp";

const GenerateAkun: FC = () => {
  const user = AuthUser.GetAuth();
  const operator = LokalOperator.GetOperator();

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
        <SidebarOp name={operator?.nama || ""} />
        <div className="flex-1 flex flex-col p-4">
          <h1 className="text-4xl font-bold mb-4">Generate Akun</h1>

          <div className="flex flex-col mt-4">
            <div className="flex flex-col mt-4 ">
              <div className="flex flex-row justify-between items-center bg-[#162953] rounded-xl px-4 py-2 mb-2">
                <div className="flex flex-col">
                  <h1 className="text-white font-bold text-3xl">Mahasiswa</h1>
                </div>
                <div className="flex flex-row">
                  <Link to={`/operator/generatemanual/mahasiswa`}>
                    <button className="bg-[#FBBF24] rounded-xl px-4 py-2">
                      Atur
                    </button>
                  </Link>
                </div>
              </div>
              <div className="flex flex-row justify-between items-center bg-[#162953] rounded-xl px-4 py-2 mb-2">
                <div className="flex flex-col">
                  <h1 className="text-white font-bold text-3xl">Dosen Wali</h1>
                </div>
                <div className="flex flex-row">
                  <Link to={`/operator/generatemanual/doswal`}>
                    <button className="bg-[#FBBF24] rounded-xl px-4 py-2">
                      Atur
                    </button>
                  </Link>
                </div>
              </div>

              <div className="flex flex-row justify-between items-center bg-[#162953] rounded-xl px-4 py-2 mb-2">
                <div className="flex flex-col">
                  <h1 className="text-white font-bold text-3xl">Departemen</h1>
                </div>
                <div className="flex flex-row">
                  <Link to={`/operator/generatemanual/departemen`}>
                    <button className="bg-[#FBBF24] rounded-xl px-4 py-2">
                      Atur
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

export default GenerateAkun;
