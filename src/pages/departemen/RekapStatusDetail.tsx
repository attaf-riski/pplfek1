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

const RekapStatusDetail = () => {
  const user = AuthUser.GetAuth();
  const departemen = LokalDepartemen.GetDepartemen();
  const componentRef = useRef(null);
  const { tahun, status } = useParams();
  const [listMahasiswa, setListMahasiswa] = React.useState<DataMahasiswa[]>([]);

  useEffect(() => {
    GetDetailStatusMahasiswa();
  }, []);

  const GetDetailStatusMahasiswa = async () => {
    try {
      const res = await Http.get(
        `/departemen/getrekapstatus/mahasiswa/detail/${tahun}&${status}`,
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

  const customToPrint = async (printWindow: any) => {
    const printContent =
      printWindow.contentDocument || printWindow.contentWindow?.document;
    const printedScrollContainer =
      printContent.querySelector(".scroll-container");
    const originScrollContainer = document.querySelector(".scroll-container");
    printedScrollContainer.scrollTop = originScrollContainer!.scrollTop;

    printedScrollContainer.style.overflow = "visible";
    printedScrollContainer.style.height = "fit-content";

    printWindow.contentDocument.title = `Daftar Mahasiswa ${status} Angkatan ${tahun} Mahasiswa Informatika`;
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
        <div className="flex-1 flex flex-col p-4 w-7/12 h-96">
          <div className="flex-1 flex flex-col w-full" ref={componentRef}>
            <h1 className="text-2xl text-center font-bold">
              {`Daftar Mahasiswa ${status} Angkatan ${tahun} Mahasiswa Informatika`}
            </h1>
            <h1 className="text-2xl text-center font-bold mb-5">
              Fakultas Sains dan Matematika UNDIP Semarang
            </h1>
            {/* // buat tabel yang berikan NO, NIM, Nama, Angkatan, Nilai yang berasal dari listMahasiswa */}
            <div className="scroll-container overflow-x-auto w-full p-3">
              <table className="min-w-full border text-center text-sm font-light dark:border-neutral-500 ">
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
                      Alamat
                    </th>
                    <th
                      scope="col"
                      className="border-r px-6 py-4 dark:border-neutral-500"
                    >
                      Kab/Kota
                    </th>
                    <th
                      scope="col"
                      className="border-r px-6 py-4 dark:border-neutral-500"
                    >
                      Provinsi
                    </th>
                    <th
                      scope="col"
                      className="border-r px-6 py-4 dark:border-neutral-500"
                    >
                      Jalur Masuk
                    </th>
                    <th
                      scope="col"
                      className="border-r px-6 py-4 dark:border-neutral-500"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="border-r px-6 py-4 dark:border-neutral-500"
                    >
                      No HP
                    </th>
                    <th
                      scope="col"
                      className="border-r px-6 py-4 dark:border-neutral-500"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="border-r px-6 py-4 dark:border-neutral-500"
                    >
                      Dosen Wali NIP
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {listMahasiswa.map((item: DataMahasiswa, index) => {
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
                          {item.alamat}
                        </td>
                        <td className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
                          {item.kabkota}
                        </td>
                        <td className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
                          {item.provinsi}
                        </td>
                        <td className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
                          {item.jalurMasuk}
                        </td>
                        <td className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
                          {item.email}
                        </td>
                        <td className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
                          {item.noHP}
                        </td>
                        <td className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
                          {item.status}
                        </td>
                        <td className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
                          {item.dosenWaliNIP}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex justify-end mt-4">
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

export default RekapStatusDetail;
