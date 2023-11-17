import AuthUser from "../../helpers/AuthUser";
import Navbar from "../../components/layouts/Navbar";
import SidebarMahasiswa from "./SidebarMahasiswa";
import LokalMahasiswa from "../../helpers/LokalMahasiswa";
import { FC } from "react";

const DashboardMahasiswa: FC = () => {
  const user = AuthUser.GetAuth();
  const mahasiswa = LokalMahasiswa.GetMahasiswa();
  return (
    <>
      <Navbar></Navbar>
      <div className="w-full flex h-screen">
        <SidebarMahasiswa
          name={mahasiswa?.nama || ""}
          photo={mahasiswa?.photo}
        />
        <div className="flex-1 flex flex-col p-4">
          <div className="w-full h-screen flex flex-col justify-center items-center gap-10">
            <img src="/images/logo.png" alt="" className="w-[100px]" />
            <h1 className="text-3xl font-bold">404 - Coming Sooooon...</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardMahasiswa;
