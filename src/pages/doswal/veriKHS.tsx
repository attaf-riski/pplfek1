import React, { FC, useEffect, useState } from "react";
import Http from "../../helpers/Fetch";
import AuthUser from "../../helpers/AuthUser";
import Navbar from "../../components/layouts/Navbar";
import Sidebar from "../../components/layouts/Sidebar";
import SidebarDoswal from "./SidebarDoswal";
import { CustomInput } from "../../components/input";
import { Link, useParams } from "react-router-dom";
import "../auth/Coba.css";
import LokalDoswal from "../../helpers/LokalDoswal";
import DataKHS from "../../inteface/KHSInterface";
import Swal from "sweetalert2";
import { LoadingLayout } from "../../components/layouts";

const VeriKHS: FC = () => {
  const user = AuthUser.GetAuth();
  const doswal = LokalDoswal.GetDoswal();
  const { NIM, semester, type } = useParams();
  const [dataKHSLokal, setDataKHS] = useState<DataKHS>();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GetKHSByNIMAndSemester();
  }, []);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataKHS({ ...dataKHSLokal, [e.target.name]: Number(e.target.value) });
  };

  const handleChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const onSubmitSetuju = async (e: any) => {
    setLoading(true);
    e.preventDefault();

    const data = {
      statusApprove: type === "true" ? false : true,
    };

    try {
      const response = await Http.post(
        "/khs/approve/" + NIM + "&" + semester,
        data,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${user?.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        await Swal.fire({
          icon: "success",
          title: "Berhasil",
          text:
            type === "true"
              ? "KHS Berhasil Dicopot"
              : "KHS Berhasil Diverifikasi",
        });
        setLoading(false);
      } else {
        await Swal.fire({
          icon: "error",
          title: "Gagal",
          text:
            type === "true"
              ? "KHS Gagal Dicopot"
              : "KHS Gagal Diverifikasi" + response.data?.message,
        });
        setLoading(false);
      }
    } catch (error: any) {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
    setLoading(false);
  };

  const onSubmit = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    try {
      onSubmitSetuju(e);
      // uploud json
      const response2 = await Http.post(
        "/khs/update/" + NIM + "&" + semester,
        dataKHSLokal,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${user?.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response2.status === 200) {
        // uploud scan
        const fd = new FormData();
        if (file) {
          fd.append("pdf", file);
          const response = await Http.post(
            "/khs/scan/" + NIM + "&" + semester,
            fd,
            {
              withCredentials: true,
              headers: {
                Authorization: `Bearer ${user?.token}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );
          if (response.status === 200) {
            await Swal.fire({
              icon: "success",
              title: "Berhasil",
              text: "KHS Berhasil Diperbarui",
            });
            setLoading(false);
          }

          setLoading(false);
        } else {
          await Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: "KHS Berhasil Diperbarui",
          });
          setLoading(false);
        }
      } else {
        await Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "KHS Gagal Ditambahkan" + response2.data?.message,
        });
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
    setLoading(false);
  };

  const GetKHSByNIMAndSemester = async () => {
    try {
      const result = await Http.get("/khs/detail/" + NIM + "&" + semester, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json",
        },
      });
      if (result.status === 200) {
        console.log(result.data?.data);
        setDataKHS(result.data?.data);
      }
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
          <h1 className="text-4xl font-bold">KHS</h1>
          {loading ? (
            <LoadingLayout></LoadingLayout>
          ) : (
            <div className="flex-1 flex flex-col p-4">
              <div>
                <div className="mb-5 mr-4 ml-4 mt-8">
                  <CustomInput
                    name="semesterAktif"
                    label="Semester"
                    required={true}
                    type="text"
                    value={dataKHSLokal?.semesterAktif ?? 0}
                    onChange={onChangeInput}
                    readOnly={true}
                    // error={errData.username}
                  />
                </div>
                <div className="mb-5 mr-4 ml-4 mt-8">
                  <CustomInput
                    name="jumlahSksSemester"
                    label="Jumlah SKS Semester"
                    required={true}
                    type="text"
                    value={dataKHSLokal?.jumlahSksSemester ?? 0}
                    onChange={onChangeInput}
                    // error={errData.username}
                  />
                </div>
                <div className="mb-5 mr-4 ml-4 mt-8">
                  <CustomInput
                    name="jumlahSksKumulatif"
                    label="Jumlah SKS Kumulatif"
                    required={true}
                    type="text"
                    value={dataKHSLokal?.jumlahSksKumulatif ?? 0}
                    onChange={onChangeInput}
                    // error={errData.username}
                  />
                </div>
                <div className="mb-5 mr-4 ml-4 mt-8">
                  <CustomInput
                    name="IPS"
                    label="IPS"
                    required={true}
                    type="text"
                    value={dataKHSLokal?.IPS ?? 0}
                    onChange={onChangeInput}
                    step=".01"
                    // error={errData.username}
                  />
                </div>
                <div className="mb-5 mr-4 ml-4 mt-8">
                  <CustomInput
                    name="IPK"
                    label="IPK"
                    required={true}
                    type="text"
                    value={dataKHSLokal?.IPK ?? 0}
                    onChange={onChangeInput}
                    step=".01"
                    // error={errData.username}
                  />
                </div>
                {/* tampilkan pdf ambil dari lokal */}
                <div className="mb-5 mr-4 ml-4 mt-8">
                  <label className={`text-sm text-slate-400`}>
                    Scan KHS - PDF
                  </label>
                  <object
                    data={
                      file
                        ? URL.createObjectURL(file)
                        : "http://localhost:5502/pdf/" + dataKHSLokal?.scanKHS
                    }
                    type="application/pdf"
                    className={`w-full h-screen`}
                  >
                    <p>Scan KHS</p>
                  </object>
                  <input
                    type="file"
                    accept="application/pdf"
                    className="bg-white text-black input input-bordered input-primary w-full mt-2"
                    onChange={handleChange}
                    name="scanKHS"
                  />
                </div>
                <button
                  className="bg-[#162953] text-white rounded-xl px-4 py-2 mt-4 mr-5"
                  onClick={onSubmitSetuju}
                >
                  {type === "true" ? "Copot Verifikasi" : "Verifikasi"}
                </button>
                <button
                  className="bg-[#162953] text-white rounded-xl px-4 py-2 mt-4 mr-5"
                  onClick={onSubmit}
                >
                  Perbarui
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      ;
    </>
  );
};

export default VeriKHS;
