import React, { FC, useEffect, useState } from "react";
import Http from "../../helpers/Fetch";
import AuthUser from "../../helpers/AuthUser";
import Navbar from "../../components/layouts/Navbar";
import Sidebar from "../../components/layouts/Sidebar";
import { Link } from "react-router-dom";
import "../auth/Coba.css";
import DataMahasiswa from "../../inteface/MahasiswaInterface";
import SidebarOp from "./SidebarOp";
import LokalOperator from "../../helpers/LokalOperator";

const PencarianMahasiswaOperator: FC = () => {
  const user = AuthUser.GetAuth();
  const operator = LokalOperator.GetOperator();
  const [dataMahasiswa, setDataMahasiswa] = useState<DataMahasiswa[]>([]);

  useEffect(() => {
    getMahasiswaByNIP("0");
  }, []);

  // get all mahasiswa by NIP operator
  const getMahasiswaByNIP = async (keyword: string) => {
    const result = await Http.get("/operator/listmahasiswa/" + keyword, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
        "Content-Type": "application/json",
      },
    });
    if (result.status === 200) {
      setDataMahasiswa(result.data?.data);
    }
  };

  const pencarian = async (e: any) => {
    getMahasiswaByNIP(e.target.value);
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="w-full flex h-screen">
        <SidebarOp name={operator?.nama || ""} />
        <div className="flex-1 flex flex-col p-4">
          <h1 className="text-4xl font-bold mb-4">Pencarian</h1>
          <div className="flex items-center mb-4 ">
            <input
              type="text"
              placeholder="Cari berdasarkan NIM, Nama, Angkatan"
              className="border-2 border-gray-300 p-2 rounded-md w-96"
              onChange={pencarian}
            />
          </div>
          <h4 className=" font-normal mb-4">
            Jumlah Mahasiswa Informatika : {dataMahasiswa.length}
          </h4>

          {/* <Link
            to="/dashboardmahasiswa/irs/create"
            className="flex items-center justify-end px-4 py-2 mt-4 text-gray-700  rounded-lg dark:bg-gray-800 dark:text-gray-200"
          >
            <button className="bg-[#162953] text-white rounded-xl px-4 py-2 mt-4 mr-5">
              Tambahkan IRS
            </button>
          </Link> */}

          <div className="flex flex-col">
            <div className="flex flex-col mt-2">
              {dataMahasiswa.map((mahasiswa, index) => (
                <div className="flex flex-row justify-between items-center bg-[#162953] rounded-xl px-4 py-2 mb-2">
                  <div className="flex flex-col">
                    <h1 className="text-white font-bold">{mahasiswa.nama}</h1>
                    <h1 className="text-white">NIM : {mahasiswa.NIM}</h1>
                  </div>
                  <div className="flex flex-row">
                    <Link
                      to={`/operator/pencarianoperator/atur/${mahasiswa.NIM}`}
                    >
                      <button className="bg-[#FBBF24] rounded-xl px-4 py-2">
                        Atur
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

export default PencarianMahasiswaOperator;
