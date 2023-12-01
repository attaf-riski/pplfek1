import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LokalMahasiswa from "../../../helpers/LokalMahasiswa";
import AuthUser from "../../../helpers/AuthUser";
import Http from "../../../helpers/Fetch";
import Navbar from "../../../components/layouts/Navbar";
import SidebarMahasiswa from "../SidebarMahasiswa";

interface DataKHS {
  semesterAktif?: number | 0;
  jumlahSksSemester?: number | 0;
  jumlahSksKumulatif?: number | 0;
  IPS?: number | 0;
  IPK?: number | 0;
  scanKHS?: string | "";
  NIM?: string | "";
  verified?: boolean | false;
}

const ListKHS = () => {
  const mahasiswa = LokalMahasiswa.GetMahasiswa();
  const user = AuthUser.GetAuth();
  const [kumpulanKHS, setKumpulanKHS] = useState<DataKHS[]>([]);

  useEffect(() => {
    getAllKHSByNIM();
  }, []);

  const getAllKHSByNIM = async () => {
    const result = await Http.get("/khs/" + mahasiswa?.NIM, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
        "Content-Type": "application/json",
      },
    });
    if (result.status === 200) {
      setKumpulanKHS(result.data?.data);
    }
  };
  return (
    <>
      <Navbar></Navbar>
      <div className="w-full flex h-screen">
        <SidebarMahasiswa
          name={mahasiswa?.nama || ""}
          photo={mahasiswa?.photo}
        />
        <div className="flex-1 flex flex-col p-4">
          <h1 className="text-4xl font-bold">Daftar KHS</h1>
          <Link
            to="/dashboardmahasiswa/KHS/create"
            className="flex items-center justify-end px-4 py-2 mt-4 text-gray-700  rounded-lg dark:bg-gray-800 dark:text-gray-200"
          >
            <button className="bg-[#162953] text-white rounded-xl px-4 py-2 mt-4 mr-5">
              Tambahkan KHS
            </button>
          </Link>

          <div className="flex flex-col mt-4">
            <div className="flex flex-col mt-4">
              {kumpulanKHS.length === 0 ? (
                <h2>Belum Ada KHS yang Ditambahkan</h2>
              ) : (
                kumpulanKHS?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="flex flex-row justify-between items-center bg-[#162953] rounded-xl px-4 py-2 mb-2"
                    >
                      <div className="flex flex-col">
                        <h1 className="text-white font-bold">
                          KHS Semester {item.semesterAktif}
                        </h1>
                        <h1 className="text-white">
                          Total SKS : {item.jumlahSksSemester}
                        </h1>
                        <h1 className="text-white">
                          Total SKS : {item.jumlahSksKumulatif}
                        </h1>
                        <h1 className="text-white">IPS : {item.IPS}</h1>
                        <h1 className="text-white">IPK : {item.IPK}</h1>
                      </div>
                      <div className="flex flex-row">
                        <Link
                          to={
                            `/dashboardmahasiswa/KHS/detail/` +
                            item.semesterAktif
                          }
                        >
                          <button className="bg-[#FBBF24] rounded-xl px-4 py-2">
                            Lihat KHS
                          </button>
                        </Link>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
      ;
    </>
  );
};

export default ListKHS;
