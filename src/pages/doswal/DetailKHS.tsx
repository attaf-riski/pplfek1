import React, { FC, useEffect, useState } from "react";
import Http from "../../helpers/Fetch";
import AuthUser from "../../helpers/AuthUser";
import Navbar from "../../components/layouts/Navbar";
import Sidebar from "../../components/layouts/Sidebar";
import SidebarDoswal from "./SidebarDoswal";
import { Link, useParams } from "react-router-dom";
import "../auth/Coba.css";
import LokalDoswal from "../../helpers/LokalDoswal";
import DataKHS from "../../inteface/KHSInterface";
import Swal from "sweetalert2";

const DetailKHS: FC = () => {
  const user = AuthUser.GetAuth();
  const doswal = LokalDoswal.GetDoswal();

  const { NIM, type } = useParams();
  const [daftarKHS, setDaftarKHS] = useState<DataKHS[]>([]);

  useEffect(() => {
    GetKHSByNIM();
  }, []);

  const GetKHSByNIM = async () => {
    try {
      const res = await Http.get("/doswal/listkhs/" + NIM + "&" + type, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });

      setDaftarKHS(res.data.data);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="w-full flex h-screen">
        <SidebarDoswal name="" />
        <div className="flex-1 flex flex-col p-4">
          <h1 className="text-4xl font-bold mb-5">KHS</h1>

          {/* <Link
            to="/dashboardmahasiswa/KHS/create"
            className="flex items-center justify-end px-4 py-2 mt-4 text-gray-700  rounded-lg dark:bg-gray-800 dark:text-gray-200"
          >
            <button className="bg-[#162953] text-white rounded-xl px-4 py-2 mt-4 mr-5">
              Tambahkan KHS
            </button>
          </Link> */}

          <div className="flex flex-col mt-4">
            <div className="flex flex-col ">
              {/* tampilkan daftarIRS */}
              {daftarKHS.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-row justify-between items-center bg-[#162953] rounded-xl px-4 py-2 mb-2"
                >
                  <div className="flex flex-col">
                    <h1 className="text-white font-bold text-2xl">
                      Semester: {item.semesterAktif}
                    </h1>
                    <h1 className="text-white">
                      Jumlah SKS: {item.jumlahSksKumulatif}
                    </h1>
                  </div>
                  <div className="flex flex-row">
                    <Link
                      to={
                        `/doswal/veriKHS/` +
                        item.NIM +
                        "&" +
                        item.semesterAktif +
                        "&" +
                        type
                      }
                    >
                      <button className="bg-[#FBBF24] rounded-xl px-4 py-2">
                        Lihat Detail
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      ;
    </>
  );
};

export default DetailKHS;
