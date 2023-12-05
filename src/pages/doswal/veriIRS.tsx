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
import Swal from "sweetalert2";
import DataIRS from "../../inteface/IRSInterface";
import { LoadingLayout } from "../../components/layouts";

const VeriIRS: FC = () => {
  const user = AuthUser.GetAuth();
  const doswal = LokalDoswal.GetDoswal();
  const { NIM, semester, type } = useParams();
  const [dataIRSLokal, setDataIRS] = useState<DataIRS>();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GetIRSByNIMAndSemester();
  }, []);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataIRS({ ...dataIRSLokal, [e.target.name]: Number(e.target.value) });
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
        "/irs/approve/" + NIM + "&" + semester,
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
              ? "IRS berhasil di Copot Verifikasi"
              : "IRS berhasil di Verifikasi",
        });
        setLoading(false);
      } else {
        await Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "IRS Gagal Diverifikasi" + response.data?.message,
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
        "/irs/update/" + NIM + "&" + semester,
        dataIRSLokal,
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
            "/irs/scan/" + NIM + "&" + semester,
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
              text: "IRS Berhasil Diperbarui",
            });
            setLoading(false);
          }

          setLoading(false);
        } else {
          await Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: "IRS Berhasil Diperbarui",
          });
          setLoading(false);
        }
      } else {
        await Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "IRS Gagal Ditambahkan" + response2.data?.message,
        });
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
    setLoading(false);
  };

  const GetIRSByNIMAndSemester = async () => {
    try {
      const result = await Http.get("/irs/detail/" + NIM + "&" + semester, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json",
        },
      });
      if (result.status === 200) {
        setDataIRS(result.data?.data);
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
          <h1 className="text-4xl font-bold">IRS</h1>
          {loading ? (
            <LoadingLayout></LoadingLayout>
          ) : (
            <div className="flex flex-row p-4">
              <div className=" w-6/12">
                <div className="p-5">
                  <div className="mb-5 mr-4">
                    <CustomInput
                      name="semesterAktif"
                      label="Semester Aktif"
                      required={true}
                      type="text"
                      value={semester ?? 0}
                      readOnly={true}
                      // error={errData.username}
                    />
                  </div>
                  <div className="mb-5 mr-4 mt-8">
                    <CustomInput
                      name="jumlahSks"
                      label="Jumlah SKS"
                      required={true}
                      type="text"
                      value={dataIRSLokal?.jumlahSks ?? 0}
                      onChange={onChangeInput}
                      // error={errData.username}
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
              <div className="w-6/12 h-4/6">
                {/* tampilkan pdf ambil dari lokal */}
                <div className="mb-5 mr-4 ml-4">
                  <label className={`text-sm text-slate-400`}>
                    Scan IRS - PDF
                  </label>
                  <object
                    data={
                      file
                        ? URL.createObjectURL(file)
                        : "http://localhost:5502/pdf/" +
                            dataIRSLokal?.scanIRS || ""
                    }
                    type="application/pdf"
                    className={`w-full h-screen`}
                  >
                    <p>Scan IRS</p>
                  </object>
                  <input
                    type="file"
                    accept="application/pdf"
                    className="bg-white text-black input input-bordered input-primary w-full mt-2"
                    onChange={handleChange}
                    name="scanIRS"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      ;
    </>
  );
};

export default VeriIRS;
