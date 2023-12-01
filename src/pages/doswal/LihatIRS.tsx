import React, { FC, useEffect, useState } from "react";
import Http from "../../helpers/Fetch";
import AuthUser from "../../helpers/AuthUser";
import Navbar from "../../components/layouts/Navbar";
import Sidebar from "../../components/layouts/Sidebar";
import SidebarDoswal from "./SidebarDoswal";
import { Link } from "react-router-dom";
import "../auth/Coba.css";
import LokalDoswal from "../../helpers/LokalDoswal";
import DataMahasiswa from "../../inteface/MahasiswaInterface";
import Swal from "sweetalert2";

// interface daftar Mahasiswa

const LihatIRS: FC = () => {
  const user = AuthUser.GetAuth();
  const doswal = LokalDoswal.GetDoswal();

  const [daftarMahasiswa, setDaftarMahasiswa] = useState<DataMahasiswa[]>([]);

  useEffect(() => {
    GetMahasiswaByIRSNotVerified();
  }, []);

  const GetMahasiswaByIRSNotVerified = async () => {
    try {
      const res = await Http.get("/doswal/irs/" + doswal?.NIP, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });

      setDaftarMahasiswa(res.data.data);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="w-full flex h-screen">
        <SidebarDoswal name={doswal?.nama || ""} />
        <div className="flex-1 flex flex-col p-4">
          <h1 className="text-4xl font-bold mb-4">Verifikasi IRS</h1>
          <div className="flex items-center mb-4">
            <input
              type="text"
              placeholder="Cari..."
              className="border-2 border-gray-300 p-2 rounded-md"
            />
            <button className="bg-[#162953] text-white rounded-xl px-4 py-2 ml-2">
              Cari
            </button>
          </div>
          <h4 className=" font-normal mb-4">
            Jumlah Mahasiswa Perwalian IRS perlu diverifikasi :{" "}
            {daftarMahasiswa.length}
          </h4>

          <div className="flex flex-col ">
            <div className="flex flex-col mt-2">
              {/* tampilkan data daftar mahasiswa */}
              {daftarMahasiswa.map((mahasiswa, index) => (
                <div
                  key={index}
                  className="flex flex-row space-x-3 items-center bg-[#162953] rounded-xl px-4 py-2 mb-2"
                >
                  <img
                    src={mahasiswa.photo || ""}
                    alt=""
                    className="w-20 h-20 rounded-full bg-white"
                  />
                  <div className="flex flex-col">
                    {/* tambahkan gambar */}

                    <h1 className="text-white font-bold">{mahasiswa.nama}</h1>
                    <h1 className="text-white">NIM : {mahasiswa.NIM}</h1>
                  </div>
                  <div className="flex flex-row">
                    <Link to={`/doswal/DetailIRS/` + mahasiswa.NIM}>
                      <button className="bg-[#FBBF24] rounded-xl px-4 py-2">
                        Lihat IRS
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

export default LihatIRS;
