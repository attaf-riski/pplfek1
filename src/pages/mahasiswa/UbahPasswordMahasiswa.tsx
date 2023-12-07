import React, { useEffect, useState } from "react";
import Navbar from "../../components/layouts/Navbar";
import SidebarMahasiswa from "./SidebarMahasiswa";
import LokalMahasiswa from "../../helpers/LokalMahasiswa";
import Http from "../../helpers/Fetch";
import AuthUser from "../../helpers/AuthUser";
import { UbahPassword } from "../auth";

const UbahPasswordMahasiswa = () => {
  const mahasiswa = LokalMahasiswa.GetMahasiswa();
  const user = AuthUser.GetAuth();

  useEffect(() => {}, []);

  return (
    <>
      <Navbar></Navbar>
      <div className="w-full flex h-screen">
        <SidebarMahasiswa
          name={mahasiswa?.nama || ""}
          photo={mahasiswa?.photo}
        />
        <div className="flex-1 flex flex-col p-4">
          <h1 className="text-4xl font-bold">Ubah Password</h1>
          <UbahPassword ></UbahPassword>
        </div>
      </div>
      ;
    </>
  );
};

export default UbahPasswordMahasiswa;
