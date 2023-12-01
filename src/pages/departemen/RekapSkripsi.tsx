import React, { useEffect, useRef } from "react";
import Http from "../../helpers/Fetch";
import AuthUser from "../../helpers/AuthUser";
import Navbar from "../../components/layouts/Navbar";
import LokalDoswal from "../../helpers/LokalDoswal";
import SidebarDoswal from "../doswal/SidebarDoswal";
import SidebarDep from "./SidebarDep";
import LokalDepartemen from "../../helpers/LokalDepartemen";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

interface Mahasiswa {
  angkatan: number;
  statusSkripsi: "sudah" | "belum";
  // Sesuaikan dengan struktur data mahasiswa dari server
}

const RekapSkripsi: React.FC = () => {
  const user = AuthUser.GetAuth();
  const departemen = LokalDepartemen.GetDepartemen();
  const componentRef = useRef(null);
  const thisYear = new Date().getFullYear();
  const [listRekap, setListRekap] = React.useState<[]>([]);

  useEffect(() => {
    GetRekapSevenYears();
    console.log(listRekap);
  }, []);

  const GetRekapSevenYears = async () => {
    try {
      const res = await Http.get("/departemen/getsevenyears/Skripsi", {
        headers: { Authorization: `Bearer ${user?.token}` },
      });

      setListRekap(res.data?.data);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response?.data?.message,
      });
    }
  };

  const customToPrint = async (printWindow: any) => {
    const printContent =
      printWindow.contentDocument || printWindow.contentWindow?.document;
    const printedScrollContainer =
      printContent.querySelector(".scroll-container");
    const originScrollContainer = document.querySelector(".scroll-container");
    printedScrollContainer.scrollTop = originScrollContainer!.scrollTop;

    printedScrollContainer.style.overflow = "visible";
    printedScrollContainer.style.height = "fit-content";

    printWindow.contentDocument.title = "Rekap Skripsi " + thisYear;
    printWindow.contentWindow.print();
  };

  const handlePrint = useReactToPrint({
    print: customToPrint,
    content: () => componentRef.current,
  });

  return (
    <>
      <Navbar />
      <div className="w-full flex h-screen">
        <SidebarDep name={departemen?.nama || ""} />
        <div className="h-60 flex-1 flex flex-col p-4 w-7/12">
          <div className="flex-1 flex flex-col p-4 w-full" ref={componentRef}>
            <h1 className="text-4xl text-center font-bold">
              Rekap Progress Skripsi Mahasiswa Informatika
            </h1>
            <h1 className="text-4xl text-center font-bold mb-5">
              Fakultas Sains dan Matematika UNDIP Semarang
            </h1>
            <div className="flex flex-col">
              <div className="scroll-container overflow-x-auto w-full p-3">
                <table className="min-w-full border text-center text-sm font-light dark:border-neutral-500">
                  <thead className="border-b font-medium dark:border-neutral-500">
                    <tr>
                      <th
                        scope="col"
                        colSpan={14}
                        className="border-r px-6 py-4 dark:border-neutral-500"
                      >
                        ANGKATAN
                      </th>
                    </tr>
                  </thead>
                  <thead className="border-b font-medium dark:border-neutral-500">
                    <tr>
                      {listRekap.map((item: any) => {
                        return (
                          <th
                            scope="col"
                            colSpan={2}
                            className="border-r px-6 py-4 dark:border-neutral-500"
                            key={item.tahun}
                          >
                            {item.tahun}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b dark:border-neutral-500">
                      {listRekap.map((item: any) => {
                        return (
                          <>
                            <td className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
                              Sudah
                            </td>
                            <td className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
                              Belum
                            </td>
                          </>
                        );
                      })}
                    </tr>
                    <tr className="border-b dark:border-neutral-500">
                      {listRekap.map((item: any) => {
                        return (
                          <>
                            <td className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
                              <Link
                                to={`/departemen/rekapSkripsi/detail/${item.tahun}&Lulus`}
                              >
                                {item.sudah}
                              </Link>
                            </td>
                            <td className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
                              <Link
                                to={`/departemen/rekapSkripsi/detail/${item.tahun}&belum`}
                              >
                                {item.belum}
                              </Link>
                            </td>
                          </>
                        );
                      })}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-4 ">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={handlePrint}
            >
              Cetak
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RekapSkripsi;
