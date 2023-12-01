import React, { useEffect, useRef } from "react";
import Navbar from "../../components/layouts/Navbar";
import AuthUser from "../../helpers/AuthUser";
import LokalDepartemen from "../../helpers/LokalDepartemen";
import SidebarDep from "./SidebarDep";
import Swal from "sweetalert2";
import Http from "../../helpers/Fetch";
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

const RekapStatus = () => {
  const user = AuthUser.GetAuth();
  const departemen = LokalDepartemen.GetDepartemen();
  const [listRekap, setListRekap] = React.useState<[]>([]);
  const componentRef = useRef(null);
  const thisYear = new Date().getFullYear();

  useEffect(() => {
    GetRekapStatusMahasiswa();
  }, []);

  const GetRekapStatusMahasiswa = async () => {
    try {
      const res = await Http.get("/departemen/getrekapstatus/mahasiswa", {
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

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Rekap Status Mahasiswa Informatika " + thisYear,
    pageStyle: "print",
  });

  return (
    <>
      <Navbar />
      <div className="w-full flex h-screen">
        <SidebarDep name={departemen?.nama || ""} />
        <div className="flex-1 flex flex-col p-4 h-96">
          <div className="flex-1 flex flex-col" ref={componentRef}>
            <h1 className="text-4xl text-center font-bold">
              Rekap Status Mahasiswa Informatika
            </h1>
            <h1 className="text-4xl text-center font-bold mb-5">
              Fakultas Sains dan Matematika UNDIP Semarang
            </h1>

            <div className="flex flex-col">
              <table className="table-auto w-full border">
                <thead>
                  <tr className="border-b dark:border-neutral-500 text-center">
                    <td
                      rowSpan={2}
                      className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500"
                    >
                      Status
                    </td>
                    <td
                      colSpan={7}
                      className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500"
                    >
                      Angkatan
                    </td>
                  </tr>
                  <tr className="border-b dark:border-neutral-500 text-center">
                    {listRekap.map((item: any) => (
                      <td
                        key={item.tahun}
                        className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500"
                      >
                        {item.tahun}
                      </td>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b dark:border-neutral-500 text-center">
                    <td className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
                      Aktif
                    </td>
                    {listRekap.map((item: any) => (
                      <td
                        key={item.tahun}
                        className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500"
                      >
                        <Link
                          to={`/departemen/rekapstatus/detail/${item.tahun}&Aktif`}
                        >
                          {item.aktif}
                        </Link>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b dark:border-neutral-500 text-center">
                    <td className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
                      Drop Out
                    </td>
                    {listRekap.map((item: any) => (
                      <td
                        key={item.tahun}
                        className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500"
                      >
                        {item.dropout}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b dark:border-neutral-500 text-center">
                    <td className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
                      Mangkir
                    </td>
                    {listRekap.map((item: any) => (
                      <td
                        key={item.tahun}
                        className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500"
                      >
                        {item.mangkir}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b dark:border-neutral-500 text-center">
                    <td className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
                      Cuti
                    </td>
                    {listRekap.map((item: any) => (
                      <td
                        key={item.tahun}
                        className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500"
                      >
                        {item.cuti}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b dark:border-neutral-500 text-center">
                    <td className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
                      Lulus
                    </td>
                    {listRekap.map((item: any) => (
                      <td
                        key={item.tahun}
                        className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500"
                      >
                        {item.lulus}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b dark:border-neutral-500 text-center">
                    <td className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
                      Undur Diri
                    </td>
                    {listRekap.map((item: any) => (
                      <td
                        key={item.tahun}
                        className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500"
                      >
                        {item.undurdiri}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b dark:border-neutral-500 text-center">
                    <td className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
                      Meninggal
                    </td>
                    {listRekap.map((item: any) => (
                      <td
                        key={item.tahun}
                        className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500"
                      >
                        {item.meninggal}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
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

export default RekapStatus;
