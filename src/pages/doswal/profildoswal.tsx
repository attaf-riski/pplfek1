import React, { FC } from "react";
// import AuthUser from "../../helpers/AuthUser";
import Navbar from "../../components/layouts/Navbar";
import SidebarDoswal from "./SidebarDoswal";
import { Link } from "react-router-dom";
import LokalDoswal from "../../helpers/LokalDoswal";
import AuthUser from "../../helpers/AuthUser";

const ProfilDoswal: FC = () => {
  const user = AuthUser.GetAuth();
  const doswal = LokalDoswal.GetDoswal();

  return (
    <>
      <Navbar></Navbar>
      <div className="w-full flex h-screen">
        <SidebarDoswal name={doswal?.nama || ""} />
        <div className="flex-1 flex flex-col p-4">
          <h1 className="text-4xl font-bold mb-5">Profil Dosen Wali</h1>
          <div className="flex flex-row justify-between items-center bg-[#162953] rounded-xl px-4 py-2 mb-2 mt-2">
            <div className="flex flex-col ">
              <h1 className="text-white font-bold text-3xl mb-4">
                {doswal?.nama || ""}
              </h1>
              <h1 className="text-white">NIP : {doswal?.NIP || ""}</h1>
              <h1 className="text-white mb-3">Email : {doswal?.email || ""}</h1>
            </div>
            <div className="h-full flex flex-row items-end mb-3">
              <Link to={`/dashboardmahasiswa/irs/detail/`}>
                <button className="bg-[#FBBF24] rounded-xl px-4 py-2">
                  Update Data
                </button>
              </Link>
            </div>
          </div>

          <div className="flex items-center mb-4"></div>
        </div>
      </div>
    </>
  );
};

export default ProfilDoswal;
