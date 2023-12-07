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
import DataKHS from "../../inteface/KHSInterface";

interface Props {
  NIM: string;
  semester: string;
  closePopup: Function;
}

const IRSKHS: FC<Props> = ({ NIM, semester, closePopup }) => {
  const user = AuthUser.GetAuth();
  const doswal = LokalDoswal.GetDoswal();
  const [dataIRSLokal, setDataIRS] = useState<DataIRS>();
  const [dataKHSLokal, setDataKHS] = useState<DataKHS>();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [khsToggle, setKHSToggle] = useState(false);

  useEffect(() => {
    GetIRSByNIMAndSemester();
    GetKHSByNIMAndSemester();
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
      statusApprove: true,
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
          text: "IRS Berhasil Diverifikasi",
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
      <div className="flex flex-col p-4 bg-[#EFF2FB] rounded-md w-[500px] h-[600px]">
        <div className="flex">
          <div className="flex space-x-3">
            <div
              className="text-4xl font-bold text-white bg-blue-400 p-2 rounded-sm cursor-pointer"
              onClick={() => {
                setKHSToggle(false);
              }}
            >
              IRS
            </div>
            <div
              className="text-4xl font-bold text-white bg-blue-400 p-2 rounded-sm cursor-pointer"
              onClick={() => {
                setKHSToggle(true);
              }}
            >
              KHS
            </div>
            <div className="text-5xl font-bold text-black p-2 ">
              Sem.{semester}
            </div>
          </div>
          {/* buat button close */}
          <button
            onClick={() => {
              closePopup(false);
            }}
            className="ml-auto bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            X
          </button>
        </div>
        {loading ? (
          <LoadingLayout></LoadingLayout>
        ) : (
          <div className="flex flex-row p-4">
            {khsToggle ? (
              <div className="w-full h-full">
                <div className="mb-5 mr-4 ml-4">
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
                <div className="mb-5 mr-4 ml-4">
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
                <div className="mb-5 mr-4 ml-4">
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

                <div className="mb-5 mr-4 ml-4">
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

                {/* tambahkan tombol lihat detail */}
                <div className="flex flex-row justify-center">
                  <a
                    href={
                      "http://localhost:5502/pdf/" + dataIRSLokal?.scanIRS || ""
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="bg-blue-400 text-white rounded-xl px-4 py-2 mt-4 mr-5"
                  >
                    Lihat Detail
                  </a>
                </div>
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center w-full h-96 gap-5">
                <h1 className=" text-9xl">{dataIRSLokal?.jumlahSks} SKS </h1>
                <div className="flex flex-row justify-center">
                  <div className="flex flex-row justify-center">
                    <a
                      href={
                        "http://localhost:5502/pdf/" + dataKHSLokal?.scanKHS ||
                        ""
                      }
                      target="_blank"
                      rel="noreferrer"
                      // beri style
                      className="bg-blue-400 text-white rounded-xl px-4 py-2 mt-4 mr-5"
                    >
                      Lihat Detail
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default IRSKHS;
