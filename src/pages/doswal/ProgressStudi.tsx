import React, { FC, useEffect, useState } from "react";
import Http from "../../helpers/Fetch";
import AuthUser from "../../helpers/AuthUser";
import Navbar from "../../components/layouts/Navbar";
import Sidebar from "../../components/layouts/Sidebar";
import SidebarDoswal from "./SidebarDoswal";
import { Link, useParams } from "react-router-dom";
import "../auth/Coba.css";
import LokalDoswal from "../../helpers/LokalDoswal";
import { CustomInput, CustomTextarea } from "../../components/input";
import DataMahasiswa from "../../inteface/MahasiswaInterface";
import IRSKHS from "./IRSKHS";
import DataDoswal from "../../inteface/DoswalInterface";
import SidebarDep from "../departemen/SidebarDep";
import DataDepartemen from "../../inteface/DepartemenInterface";
import LokalDepartemen from "../../helpers/LokalDepartemen";

const ProgressStudi: FC = () => {
  const user = AuthUser.GetAuth();
  const { NIM, NIP } = useParams();
  const [popup, setPopup] = useState(false);
  const [doswal, setDoswal] = useState<DataDoswal>({
    nama: "",
  });
  const departemen = LokalDepartemen.GetDepartemen();

  const [dataMahasiswa, setDataMahasiswa] = useState<DataMahasiswa>({
    NIM: "",
    nama: "",
    angkatan: 0,
    dosenWaliNIP: "",
    photo: "",
  });

  const [dataColorBox, setDataColorBox] = useState([{ i: 1 }]);
  const [dataPopup, setDataPopup] = useState({
    NIM: "",
    semester: "",
  });

  useEffect(() => {
    GetMahasiswaByNIM();
    GetColorBox();
  }, []);

  const GetMahasiswaByNIM = async () => {
    const result = await Http.get(
      "/pencarianmahasiswa/detailmahasiswa/" + NIM,
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (result.status === 200) {
      setDataMahasiswa(result.data?.data);
      let NIP = result.data?.data.dosenWaliNIP;
      GetDoswalByNIP(NIP);
    }
  };

  const GetDoswalByNIP = async (NIP: any) => {
    const result = await Http.get("/operator/listdoswal/detail/" + NIP, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
        "Content-Type": "application/json",
      },
    });

    if (result.status === 200) {
      setDoswal(result.data?.data);
    }
  };

  const GetColorBox = async () => {
    const result = await Http.get("/dashboarddoswal/colorbox/" + NIM, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
        "Content-Type": "application/json",
      },
    });

    if (result.status === 200) {
      setDataColorBox(result.data?.data);
    }
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="w-full flex h-screen">
        {user?.roleId === 4 ? (
          <SidebarDoswal name={doswal?.nama || ""} />
        ) : (
          <SidebarDep name={departemen?.nama || ""} />
        )}

        {popup && (
          <div className="absolute h-[1100px] w-screen bg-[#00000060] z-10"></div>
        )}
        <div className={`flex-1 flex flex-col p-4`}>
          <h1 className="text-4xl font-bold mb-4">Progress Studi</h1>
          <div
            className={`relative p-4 mt-5 rounded-2xl bg-[#EFF2FB] flex flex-col justify-center items-center`}
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
              {popup && (
                <IRSKHS
                  NIM={dataPopup.NIM}
                  semester={dataPopup.semester}
                  closePopup={setPopup}
                />
              )}
            </div>
            <div className="relative w-32 h-32">
              <img
                className="object-cover w-24 h-24 mx-2 rounded-full border bg-gray-200 border-gray-100 shadow-sm"
                src={dataMahasiswa.photo || "/images/profile.png"}
                alt="mhs profil"
              />
            </div>
            <div className="grid grid-cols-1 w-full mt-1 gap-2">
              <div className="mb-2">
                <CustomInput
                  name="nama"
                  label="Nama"
                  required={true}
                  type="text"
                  readOnly={true}
                  value={dataMahasiswa.nama || ""}
                />
              </div>
              <div className="mb-2">
                <CustomInput
                  name="nim"
                  label="NIM"
                  required={true}
                  type="text"
                  readOnly={true}
                  value={dataMahasiswa.NIM || ""}
                />
              </div>

              <div className="mb-2">
                <CustomInput
                  name="angkatan"
                  label="Angkatan"
                  required={true}
                  type="text"
                  readOnly={true}
                  value={dataMahasiswa.angkatan || 0}
                />
              </div>

              <div className="mb-2">
                <CustomInput
                  name="dosenWaliNIP"
                  label="Dosen Wali"
                  required={true}
                  type="text"
                  readOnly={true}
                  value={doswal?.nama || ""}
                />
              </div>

              <h1 className="text-4xl font-bold mb-4 mt-5 ">Semester</h1>

              <div className="grid grid-cols-7 grid-rows-2 ">
                {dataColorBox.map((color, index) =>
                  color.i === 1 ? (
                    <div
                      className={`w-20 h-20  mb-4 mr-4 flex items-center justify-center bg-red-400 }`}
                    >
                      <span className="text-white font-bold">{index + 1}</span>
                    </div>
                  ) : color.i === 2 ? (
                    <div
                      className={`w-20 h-20  mb-4 mr-4 flex items-center justify-center bg-blue-400 }`}
                      onClick={() => {
                        setDataPopup({
                          NIM: dataMahasiswa.NIM || "",
                          semester: String(index + 1),
                        });
                        setPopup(true);
                      }}
                    >
                      <span className="text-white font-bold">{index + 1}</span>
                    </div>
                  ) : color.i === 3 ? (
                    <div
                      className={`w-20 h-20  mb-4 mr-4 flex items-center justify-center bg-yellow-400 }`}
                    >
                      <span className="text-white font-bold">{index + 1}</span>
                    </div>
                  ) : (
                    <div
                      className={`w-20 h-20  mb-4 mr-4 flex items-center justify-center bg-green-400 }`}
                    >
                      <span className="text-white font-bold">{index + 1}</span>
                    </div>
                  )
                )}
              </div>

              <h4 className="text-1xl font-normal">Keterangan</h4>
              <div className="flex">
                <div className="w-5 h-5 bg-red-400 mb-1 mr-2 flex items-center justify-center">
                  <span className="text-white font-bold"></span>
                </div>

                <span className="text-black font-normal">
                  Belum diisikan (IRS dan KHS) atau tidak digunakan
                </span>
              </div>
              <div className="flex">
                <div className="w-5 h-5 bg-blue-400 mb-1 mr-2 flex items-center justify-center">
                  <span className="text-white font-bold"></span>
                </div>

                <span className="text-black font-normal">
                  Sudah diisikan (IRS dan KHS){" "}
                </span>
              </div>
              <div className="flex">
                <div className="w-5 h-5 bg-yellow-400 mb-1 mr-2 flex items-center justify-center">
                  <span className="text-white font-bold"></span>
                </div>

                <span className="text-black font-normal">
                  Sudah lulus PKL (IRS, KHS, dan PKL){" "}
                </span>
              </div>
              <div className="flex">
                <div className="w-5 h-5 bg-green-400 mb-1 mr-2 flex items-center justify-center">
                  <span className="text-white font-bold"></span>
                </div>

                <span className="text-black font-normal">
                  Sudah lulus Skripsi
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      ;
    </>
  );
};

export default ProgressStudi;
