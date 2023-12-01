import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import DataMahasiswa from "../../inteface/MahasiswaInterface";
import Swal from "sweetalert2";
import AuthUser from "../../helpers/AuthUser";
import LokalDepartemen from "../../helpers/LokalDepartemen";
import Http from "../../helpers/Fetch";
import SidebarDep from "./SidebarDep";
import Navbar from "../../components/layouts/Navbar";
import { useReactToPrint } from "react-to-print";

const RekapPKLDetail = () => {
  const user = AuthUser.GetAuth();
  const departemen = LokalDepartemen.GetDepartemen();
  const componentRef = useRef(null);
  const thisYear = new Date().getFullYear();
  const { angkatan, status } = useParams();
  const [listMahasiswa, setListMahasiswa] = React.useState<[]>([]);

  useEffect(() => {
    GetDetailPKLMahasiswa();
  }, []);

  const GetDetailPKLMahasiswa = async () => {
    try {
      const res = await Http.get(
        `/departemen/getsevenyears/pkl/detail/${angkatan}&${status}`,
        {
          headers: { Authorization: `Bearer ${user?.token}` },
        }
      );

      setListMahasiswa(res.data?.data);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response?.data?.message,
      });
    }
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle:
      (status === "Lulus"
        ? "Daftar Sudah Lulus PKL "
        : "Daftar Belum Lulus PKL ") +
      " Angkatan " +
      angkatan,
    pageStyle: "print",
  });

  return (
    <>
      <Navbar />
      <div className="w-full flex h-screen">
        <SidebarDep name={departemen?.nama || ""} />
        <div className="flex-1 flex flex-col p-4 h-96">
          <div className="flex-1 flex flex-col p-4 " ref={componentRef}>
            <h1 className="text-2xl text-center font-bold">
              {status === "Lulus"
                ? "Daftar Sudah Lulus PKL Mahasiswa Informatika"
                : "Daftar Belum Lulus PKL Mahasiswa Informatika"}
            </h1>
            <h1 className="text-2xl text-center font-bold mb-5">
              Fakultas Sains dan Matematika UNDIP Semarang
            </h1>
            {/* // buat tabel yang berikan NO, NIM, Nama, Angkatan, Nilai yang berasal dari listMahasiswa */}
            <table className="min-w-full border text-center text-sm font-light dark:border-neutral-500">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th
                    scope="col"
                    className="border-r px-6 py-4 dark:border-neutral-500"
                  >
                    NO
                  </th>
                  <th
                    scope="col"
                    className="border-r px-6 py-4 dark:border-neutral-500"
                  >
                    NIM
                  </th>
                  <th
                    scope="col"
                    className="border-r px-6 py-4 dark:border-neutral-500"
                  >
                    Nama
                  </th>
                  <th
                    scope="col"
                    className="border-r px-6 py-4 dark:border-neutral-500"
                  >
                    Angkatan
                  </th>
                  <th
                    scope="col"
                    className="border-r px-6 py-4 dark:border-neutral-500"
                  >
                    Nilai
                  </th>
                </tr>
              </thead>
              <tbody>
                {listMahasiswa.map((item: any, index) => {
                  return (
                    <tr className="border-b dark:border-neutral-500">
                      <td className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
                        {index + 1}
                      </td>
                      <td className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
                        {item.NIM}
                      </td>
                      <td className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
                        {item.nama}
                      </td>
                      <td className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
                        {item.angkatan}
                      </td>
                      <td className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
                        {item.nilai}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
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

export default RekapPKLDetail;
