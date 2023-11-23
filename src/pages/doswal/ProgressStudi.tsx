import React, { FC } from "react";
import Http from "../../helpers/Fetch";
import AuthUser from "../../helpers/AuthUser";
import Navbar from "../../components/layouts/Navbar";
import Sidebar from "../../components/layouts/Sidebar";
import SidebarDoswal from "./SidebarDoswal";
import { Link } from "react-router-dom";
import "../auth/Coba.css";
import LokalDoswal from "../../helpers/LokalDoswal";
import { CustomInput, CustomTextarea } from "../../components/input";

const ProgressStudi: FC = () => {
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
          <h1 className="text-4xl font-bold mb-4">Progress Studi</h1>
          <div className="p-4 mt-5 rounded-2xl bg-[#EFF2FB] flex flex-col justify-center items-center">
          <div className="relative w-32 h-32">
              <img
                className="object-cover w-24 h-24 mx-2 rounded-full border bg-gray-200 border-gray-100 shadow-sm"
                // src={file ? URL.createObjectURL(file) : data.photo!}
                alt="mhs profil"
              />
              <div
                className="absolute top-0 right-0 h-7 w-7 my-1 border-2 border-white rounded-full bg-green-400 z-2"
                // onClick={uploudGambar}
              >
                <img
                  className="rounded-full bg-white shadow-sm"
                  src="/images/edit.png"
                  alt="edit"
                />
                <input
                  type="file"
                  accept=".png,.jpg,.jpeg"
                //   onChange={handleChange}
                //   ref={hiddenFileInput}
                  style={{ display: "none" }}
                />
              </div>
            </div>
          <div className="grid grid-cols-1 w-full mt-1 gap-2">
            <div className="mb-2">
                <CustomInput
                  name="nama"
                  label="Nama"
                  required={true}
                  type="text"
                  readOnly={true}
                  
                
                />
              </div>
              <div className="mb-2">
                <CustomInput
                  name="nim"
                  label="NIM"
                  required={true}
                  type="text"
                  readOnly={true}
                />
              </div>
              
              <div className="mb-2">
                <CustomInput
                  name="angkatan"
                  label="Angkatan"
                  required={true}
                  type="text"
                  readOnly={true}
                />
              </div>

              <h1 className="text-4xl font-bold mb-4 mt-5 ">Semester</h1>

                <div className="flex">
                <div className="w-20 h-20 bg-blue-400 mb-4 mr-4 flex items-center justify-center">
                    <span className="text-white font-bold">1</span>
                </div>
                <div className="w-20 h-20 bg-blue-400 mb-4 mr-4 flex items-center justify-center">
                    <span className="text-white font-bold">2</span>
                </div>
                <div className="w-20 h-20 bg-blue-400 mb-4 mr-4 flex items-center justify-center">
                    <span className="text-white font-bold">3</span>
                </div>
                <div className="w-20 h-20 bg-blue-400 mb-4 mr-4 flex items-center justify-center">
                    <span className="text-white font-bold">4</span>
                </div>
                <div className="w-20 h-20 bg-blue-400 mb-4 mr-4 flex items-center justify-center">
                    <span className="text-white font-bold">5</span>
                </div>
                <div className="w-20 h-20 bg-yellow-400 mb-4 mr-4 flex items-center justify-center">
                    <span className="text-white font-bold">6</span>
                </div>
                <div className="w-20 h-20 bg-blue-400 mb-4 mr-4 flex items-center justify-center">
                    <span className="text-white font-bold">7</span>
                </div>
                <div className="w-20 h-20 bg-green-400 mb-4 mr-4 flex items-center justify-center">
                    <span className="text-white font-bold">8</span>
                </div>
                <div className="w-20 h-20 bg-red-400 mb-4 mr-4 flex items-center justify-center">
                    <span className="text-white font-bold">9</span>
                </div>
                <div className="w-20 h-20 bg-red-400 mb-4 mr-4 flex items-center justify-center">
                    <span className="text-white font-bold">10</span>
                </div>
                </div>

                <div className="flex">
                <div className="w-20 h-20 bg-red-400 mb-4 mr-4 flex items-center justify-center">
                    <span className="text-white font-bold">11</span>
                </div>
                <div className="w-20 h-20 bg-red-400 mb-4 mr-4 flex items-center justify-center">
                    <span className="text-white font-bold">12</span>
                </div>
                <div className="w-20 h-20 bg-red-400 mb-4 mr-4 flex items-center justify-center">
                    <span className="text-white font-bold">13</span>
                </div>
                <div className="w-20 h-20 bg-red-400 mb-4 mr-4 flex items-center justify-center">
                    <span className="text-white font-bold">14</span>
                </div>
                </div>

                
                <h4 className="text-1xl font-normal">Keterangan</h4>
                <div className="flex">
                    <div className="w-5 h-5 bg-red-400 mb-1 mr-2 flex items-center justify-center">
                        <span className="text-white font-bold"></span>
                    </div>
                    
                        <span className="text-black font-normal">Belum diisikan (IRS dan KHS) atau tidak digunakan</span>
                   
                </div>
                <div className="flex">
                    <div className="w-5 h-5 bg-blue-400 mb-1 mr-2 flex items-center justify-center">
                        <span className="text-white font-bold"></span>
                    </div>
                    
                        <span className="text-black font-normal">Sudah diisikan (IRS dan KHS) </span>
                   
                </div>
                <div className="flex">
                    <div className="w-5 h-5 bg-yellow-400 mb-1 mr-2 flex items-center justify-center">
                        <span className="text-white font-bold"></span>
                    </div>
                    
                        <span className="text-black font-normal">Sudah lulus PKL (IRS, KHS, dan PKL) </span>
                   
                   
                </div>
                <div className="flex">
                    <div className="w-5 h-5 bg-green-400 mb-1 mr-2 flex items-center justify-center">
                        <span className="text-white font-bold"></span>
                    </div>
                    
                        <span className="text-black font-normal">Sudah lulus Skripsi</span>
                   
                   
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
