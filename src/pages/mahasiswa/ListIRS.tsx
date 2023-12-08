import React, { useEffect, useState } from "react";
import Navbar from "../../components/layouts/Navbar";
import SidebarMahasiswa from "./SidebarMahasiswa";
import LokalMahasiswa from "../../helpers/LokalMahasiswa";
import Http from "../../helpers/Fetch";
import AuthUser from "../../helpers/AuthUser";
import { Link } from "react-router-dom";

interface DataIRS {
  semesterAktif?: number | 0;
  jumlahSks?: number | 0;
  scanIRS?: string | "";
  NIM?: string | "";
  verified?: boolean | false;
}

const ListIRS = () => {
  const mahasiswa = LokalMahasiswa.GetMahasiswa();
  const user = AuthUser.GetAuth();
  const [kumpulanIRS, setKumpulanIRS] = useState<DataIRS[]>([]);

  useEffect(() => {
    getAllIRSByNIM();
  }, []);

  const getAllIRSByNIM = async () => {
    const result = await Http.get("/irs/" + mahasiswa?.NIM, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
        "Content-Type": "application/json",
      },
    });
    if (result.status === 200) {
      console.log(result.data?.data);
      setKumpulanIRS(result.data?.data);
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
          <div className="flex justify-between items-center ">
            <h1 className="text-4xl font-bold">Daftar IRS</h1>
            <Link to="/dashboardmahasiswa/irs/create">
              <button className="bg-[#162953] text-white rounded-xl px-4 py-2">
                Tambahkan IRS
              </button>
            </Link>
          </div>

          <div className="flex flex-col mt-4">
            <div className="flex flex-col mt-4">
              {kumpulanIRS.length === 0 ? (
                <h2>Belum Ada IRS yang Ditambahkan</h2>
              ) : (
                kumpulanIRS?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="flex flex-row justify-between items-center bg-[#162953] rounded-xl px-4 py-2 mb-2"
                    >
                      <div className="flex flex-col">
                        <h1 className="text-white font-bold">
                          IRS Semester {item.semesterAktif}
                        </h1>
                        <h1 className="text-white">
                          Total SKS : {item.jumlahSks}
                        </h1>
                      </div>
                      <div className="flex flex-row gap-2">
                        {item.verified ? (
                          <div className="bg-[#2bfb24] rounded-xl px-4 py-2">
                            Verified
                          </div>
                        ) : (
                          <div className="bg-[#fb3924] rounded-xl px-4 py-2">
                            Unverified
                          </div>
                        )}
                        <Link
                          to={
                            `/dashboardmahasiswa/irs/detail/` +
                            item.semesterAktif
                          }
                        >
                          <button className="bg-[#FBBF24] rounded-xl px-4 py-2">
                            Lihat IRS
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

export default ListIRS;
