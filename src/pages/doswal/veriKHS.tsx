import React, { FC } from "react";
import Http from "../../helpers/Fetch";
import AuthUser from "../../helpers/AuthUser";
import Navbar from "../../components/layouts/Navbar";
import Sidebar from "../../components/layouts/Sidebar";
import SidebarDoswal from "./SidebarDoswal";
import { CustomInput } from "../../components/input";
import { Link } from "react-router-dom";
import "../auth/Coba.css";
import LokalDoswal from "../../helpers/LokalDoswal";

const VeriKHS: FC = () => {
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
          <h1 className="text-4xl font-bold mb-5">KHS</h1>
          <h2 className="text-3xl font-bold ml-7">
            Attaf Riski Putra Ramadhan
          </h2>
          <h4 className=" font-normal ml-7">NIM : 24060121120002</h4>
          <div className="flex-1 flex flex-col p-4">
            <div>
              <div className="mb-5 mr-4 ml-4 mt-3">
                <label className={`text-sm text-slate-400`}>Semester</label>
                <select
                  name="semesterAktif"
                  className="bg-white text-black input input-bordered input-primary w-full"
                >
                  <option key={1} value={1}>
                    1
                  </option>
                </select>
              </div>
              <div className="mb-5 mr-4 ml-4 mt-8">
                <CustomInput
                  name="jumlahSks"
                  label="Jumlah SKS"
                  required={true}
                  type="text"
                  defaultValue="21"

                  // error={errData.username}
                />
              </div>
              {/* tampilkan pdf ambil dari lokal */}
              <div className="mb-5 mr-4 ml-4 mt-8">
                <label className={`text-sm text-slate-400`}>
                  Scan KHS - PDF
                </label>

                <input
                  type="file"
                  accept="application/pdf"
                  className="bg-white text-black input input-bordered input-primary w-full mt-2"
                  name="scanIRS"
                />
              </div>
              <button className="bg-[#162953] text-white rounded-xl px-4 py-2 mt-4 mr-5 ml-4">
                Setujui
              </button>

              <button className="bg-[#162953] text-white rounded-xl px-4 py-2 mt-4 mr-5 ">
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
      ;
    </>
  );
};

export default VeriKHS;
