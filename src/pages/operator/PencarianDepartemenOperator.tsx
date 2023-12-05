import React, { FC, useEffect, useState } from "react";
import Http from "../../helpers/Fetch";
import AuthUser from "../../helpers/AuthUser";
import Navbar from "../../components/layouts/Navbar";
import { Link } from "react-router-dom";
import "../auth/Coba.css";
import SidebarOp from "./SidebarOp";
import LokalOperator from "../../helpers/LokalOperator";
import DataDepartemen from "../../inteface/DepartemenInterface";

const PencarianDepartemenOperator: FC = () => {
  const user = AuthUser.GetAuth();
  const operator = LokalOperator.GetOperator();
  const [dataDepartemen, setDataDepartemen] = useState<DataDepartemen[]>([]);

  useEffect(() => {
    getDepartemenByKeyword("0");
  }, []);

  // get all mahasiswa by NIP operator
  const getDepartemenByKeyword = async (keyword: string) => {
    const result = await Http.get("/operator/listdepartemen/" + keyword, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
        "Content-Type": "application/json",
      },
    });
    if (result.status === 200) {
      setDataDepartemen(result.data?.data);
    }
  };

  const pencarian = async (e: any) => {
    getDepartemenByKeyword(e.target.value);
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
              placeholder="Cari berdasarkan NIP, Nama, Email"
              className="border-2 border-gray-300 p-2 rounded-md w-96"
              onChange={pencarian}
            />
          </div>
          <h4 className=" font-normal mb-4">
            Jumlah Anggota Departemen Informatika : {dataDepartemen.length}
          </h4>

          <div className="flex flex-col">
            <div className="flex flex-col mt-2">
              {dataDepartemen.map((Departemen, index) => (
                <div className="flex flex-row justify-between items-center bg-[#162953] rounded-xl px-4 py-2 mb-2">
                  <div className="flex flex-col">
                    <h1 className="text-white font-bold">{Departemen.nama}</h1>
                    <h1 className="text-white">NIP : {Departemen.NIP}</h1>
                  </div>
                  <div className="flex flex-row">
                    <Link
                      to={`/operator/pencarianDepartemen/atur/${Departemen.NIP}`}
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

export default PencarianDepartemenOperator;
