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
      </div>
    </>
  );
};

export default DashboardMahasiswa;
