import AuthUser from "../../helpers/AuthUser";
import Navbar from "../../components/layouts/Navbar";
import SidebarMahasiswa from "./SidebarMahasiswa";
import LokalMahasiswa from "../../helpers/LokalMahasiswa";
import { FC, useEffect, useState } from "react";
import Swal from "sweetalert2";
import Http from "../../helpers/Fetch";

const DashboardMahasiswa: FC = () => {
  const user = AuthUser.GetAuth();
  const mahasiswa = LokalMahasiswa.GetMahasiswa();

  useEffect(() => {
    GetDashboardMahasiswa();
  }, []);

  const GetDashboardMahasiswa = async () => {
    try {
      const res = await Http.get("/dashboardmahasiswa/" + mahasiswa?.NIM, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });

      setDataDashboard(res.data?.data);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response?.data?.message,
      });
    }
  };

  const [dataDashboard, setDataDashboard]: any = useState({
    DosenWali: "",
    StatusAkedemik: "",
    IPK: 0,
    SKSk: 0,
    Skripsi: "Sudah",
    PKL: "Belum",
  });

  const keyDashboard = [
    "DosenWali",
    "StatusAkedemik",
    "IPK",
    "SKSk",
    "Skripsi",
    "PKL",
  ];
  return (
    <>
      <Navbar></Navbar>
      <div className="w-full flex h-screen">
        <SidebarMahasiswa
          name={mahasiswa?.nama || ""}
          photo={mahasiswa?.photo}
        />
        <div className="flex-1 flex w-full flex-col p-4">
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>

          <div className="w-full h-[465px] grid grid-cols-4 grid-rows-2 gap-7 mt-4">
            {/* buatkan card dashboard */}
            <div className="w-full h-76 px-8 py-4 rounded-lg shadow-lg bg-[#121E42]">
              <div className="w-full h-full flex flex-col justify-center items-center mb-6">
                <h2 className="mt-2 mb-5 text-2xl font-bold text-white md:mt-0 text-center">
                  {dataDashboard[keyDashboard[0]]}
                </h2>
                <h2 className="mt-2 mb-5 text-xl text-white font-bold md:mt-0 text-center  ">
                  Dosen Wali
                </h2>
              </div>
            </div>

            {[
              "Status Akademik",
              "IPK",
              "SKS",
              "Status Skripsi",
              "Status PKL",
            ].map((item, index) => {
              return (
                <div className="w-full h-76 px-8 py-4 rounded-lg shadow-lg bg-[#121E42]">
                  <div className="w-full h-full flex flex-col justify-center items-center mb-6">
                    <h2 className="mt-2 mb-5 text-6xl font-bold text-white md:mt-0 text-center">
                      {dataDashboard[keyDashboard[index + 1]]}
                    </h2>
                    <h2 className="mt-2 mb-5 text-xl text-white font-bold md:mt-0 text-center  ">
                      {item}
                    </h2>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardMahasiswa;
