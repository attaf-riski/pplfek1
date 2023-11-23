import { FC, useEffect, useState } from "react";
import Http from "../../helpers/Fetch";
import AuthUser from "../../helpers/AuthUser";
import Navbar from "../../components/layouts/Navbar";
import SidebarDoswal from "./SidebarDoswal";
import { Link, useParams } from "react-router-dom";
import "../auth/Coba.css";
import LokalDoswal from "../../helpers/LokalDoswal";
import DataIRS from "../../inteface/IRSInterface";
import Swal from "sweetalert2";

const DetailIRS: FC = () => {
  const user = AuthUser.GetAuth();
  const doswal = LokalDoswal.GetDoswal();

  const { NIM } = useParams();
  const [daftarIRS, setDaftarIRS] = useState<DataIRS[]>([]);

  useEffect(() => {
    GetIRSByNIM();
  }, []);

  const GetIRSByNIM = async () => {
    try {
      const res = await Http.get("/doswal/listirs/" + NIM, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });

      setDaftarIRS(res.data.data);
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
          <h1 className="text-4xl font-bold mb-5">IRS</h1>
          <div className="flex flex-col mt-4">
            <div className="flex flex-col ">
              {/* tampilkan daftarIRS */}
              {daftarIRS.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-row justify-between items-center bg-[#162953] rounded-xl px-4 py-2 mb-2"
                >
                  <div className="flex flex-col">
                    <h1 className="text-white font-bold text-2xl">
                      Semester: {item.semesterAktif}
                    </h1>
                    <h1 className="text-white">Jumlah SKS: {item.jumlahSks}</h1>
                  </div>
                  <div className="flex flex-row">
                    <Link
                      to={
                        `/doswal/veriIRS/` + item.NIM + "&" + item.semesterAktif
                      }
                    >
                      <button className="bg-[#FBBF24] rounded-xl px-4 py-2">
                        Lihat Detail
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

export default DetailIRS;
