import React, { FC, useEffect, useState } from "react";
import Http from "../../helpers/Fetch";
import AuthUser from "../../helpers/AuthUser";
import Navbar from "../../components/layouts/Navbar";
import SidebarDoswal from "./SidebarDoswal";
import "../auth/Coba.css";
import LokalDoswal from "../../helpers/LokalDoswal";
import { useParams } from "react-router-dom";
import dataSkripsi from "../../inteface/SkripsiInterface";
import Swal from "sweetalert2";
import { CustomInput } from "../../components/input";

const DetailSkripsi: FC = () => {
  const user = AuthUser.GetAuth();
  const doswal = LokalDoswal.GetDoswal();
  const { NIM } = useParams();
  const [dataSkripsiLokal, setDataSkripsi] = useState<dataSkripsi>({
    NIM: "",
    status: "",
    nilai: "",
    scanBeritaAcara: "",
    tanggalSidang: "",
    verified: false,
    lamaStudi: 0,
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getSkripsiByNIM();
  }, []);

  const onSubmitSetuju = async (e: any) => {
    setLoading(true);
    e.preventDefault();

    const data = {
      statusApprove: true,
    };

    try {
      const response = await Http.post("/Skripsi/approve/" + NIM, data, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        await Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Skripsi Berhasil Diverifikasi",
        });
        setLoading(false);
      } else {
        await Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "Skripsi Gagal Diverifikasi" + response.data?.message,
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

  const handleChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const getSkripsiByNIM = async () => {
    try {
      const result = await Http.get("/Skripsi/" + NIM, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      if (result.status === 200) {
        console.log(result.data?.data);
        setDataSkripsi(result.data?.data);
      } else {
        console.log("masuk");
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  };

  const onChangeSelect = (e: any) => {
    dataSkripsiLokal.status = e.target.value;
    if (e.target.name !== "Lulus") {
      setDataSkripsi({ ...dataSkripsiLokal, nilai: "Kosong" });
    }
  };

  const onChangeInput = (e: any) => {
    setDataSkripsi({ ...dataSkripsiLokal, [e.target.name]: e.target.value });
  };

  const onUpdate = async (e: any) => {
    dataSkripsiLokal.NIM = NIM || "";

    const newDataSkripsi = {
      NIM: dataSkripsiLokal.NIM,
      status: dataSkripsiLokal.status,
      nilai: dataSkripsiLokal.nilai,
      scanBeritaAcara: dataSkripsiLokal.scanBeritaAcara,
      tanggalSidang: dataSkripsiLokal.tanggalSidang,
      lamaStudi: dataSkripsiLokal.lamaStudi,
      verified: true,
    };

    setLoading(true);
    //uploud json
    try {
      const response = await Http.post(
        "/Skripsi/approve/update/" + NIM,
        newDataSkripsi,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${user?.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        // uploud scan
        const fd = new FormData();
        if (file) {
          fd.append("pdf", file);
          const response2 = await Http.post("/Skripsi/scan/" + NIM, fd, {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${user?.token}`,
              "Content-Type": "multipart/form-data",
            },
          });
          if (response2.status === 200) {
            await Swal.fire({
              icon: "success",
              title: "Berhasil",
              text: "Skripsi Berhasil Diperbarui",
            });
            setLoading(false);
          }
        } else {
          await Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: "Skripsi Berhasil Diperbarui",
          });
          setLoading(false);
        }
      } else {
        await Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "Skripsi Gagal Diperbarui",
        });
        setLoading(false);
      }
    } catch (error: any) {
      console.log();
      await Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Skripsi Gagal Diperbarui " + error?.response?.data?.message,
      });
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="w-full flex h-screen">
        <SidebarDoswal name={doswal?.nama || ""} />
        <div className="flex-1 flex flex-col p-4">
          <h1 className="text-4xl font-bold mb-5">Verifikasi Skripsi</h1>
          <div className="flex-1 flex flex-col p-4">
            <h1 className="text-4xl font-bold">Skripsi</h1>
            <div className="mr-4 ml-4 mt-8">
              <CustomInput
                name="status"
                label="Status"
                required={true}
                type="text"
                value={dataSkripsiLokal.status}
                readOnly={true}
              />
            </div>
            <div className={`mr-4 ml-4 mt-4`}>
              <label className={`text-sm text-slate-400`}>Status Skripsi</label>
              <select
                name="nilai"
                className="bg-white text-black input input-bordered input-primary w-full"
                onChange={(e) => {
                  setDataSkripsi({
                    ...dataSkripsiLokal,
                    nilai: e.target.value,
                  });
                }}
              >
                {dataSkripsiLokal.nilai === "Kosong" ? (
                  <option>Masukkan Nilai</option>
                ) : (
                  <option>{dataSkripsiLokal.nilai}</option>
                )}
                <option key={"A"} value="A">
                  A
                </option>
                <option key={"B"} value="B">
                  B
                </option>
                <option key={"C"} value="C">
                  C
                </option>
                <option key={"D"} value="D">
                  D
                </option>
                <option key={"E"} value="E">
                  E
                </option>
              </select>
            </div>
            <div className={`mr-4 ml-4 mt-4`}>
              <CustomInput
                name="tanggalSidang"
                label="Tanggal Sidang"
                required={true}
                type="date"
                value={
                  dataSkripsiLokal.tanggalSidang === "2002-7-28"
                    ? "2002-7-28"
                    : dataSkripsiLokal.tanggalSidang
                }
                onChange={(e) => {
                  setDataSkripsi({
                    ...dataSkripsiLokal,
                    tanggalSidang: e.target.value,
                  });
                }}
                // error={errData.username}
              />
            </div>
            <div className={`mr-4 ml-4 mt-4`}>
              <label className={`text-sm text-slate-400`}>Semester Lulus</label>
              <select
                name="lamaStudi"
                className="bg-white text-black input input-bordered input-primary w-full"
                onChange={(e) => {
                  setDataSkripsi({
                    ...dataSkripsiLokal,
                    lamaStudi: Number(e.target.value),
                  });
                }}
              >
                {dataSkripsiLokal.lamaStudi === 0 ? (
                  <option>Pilih Semester</option>
                ) : (
                  <option>{dataSkripsiLokal.lamaStudi}</option>
                )}
                <option key={1} value={1}>
                  1
                </option>
                <option key={2} value={2}>
                  2
                </option>
                <option key={3} value={3}>
                  3
                </option>
                <option key={4} value={4}>
                  4
                </option>
                <option key={5} value={5}>
                  5
                </option>
                <option key={6} value={6}>
                  6
                </option>
                <option key={7} value={7}>
                  7
                </option>
                <option key={8} value={8}>
                  8
                </option>
                <option key={9} value={9}>
                  9
                </option>
                <option key={10} value={10}>
                  10
                </option>
                <option key={11} value={11}>
                  11
                </option>
                <option key={12} value={12}>
                  12
                </option>
                <option key={13} value={13}>
                  13
                </option>
                <option key={14} value={14}>
                  14
                </option>
              </select>
            </div>
            <div className={`mr-4 ml-4 mt-4`}>
              <label className={`text-sm text-slate-400`}>
                Scan Berita Acara Skripsi - PDF
              </label>
              <object
                data={
                  file
                    ? URL.createObjectURL(file)
                    : "http://localhost:5502/pdf/" +
                      dataSkripsiLokal.scanBeritaAcara
                }
                type="application/pdf"
                className={`w-full h-screen`}
              >
                <p>Scan Berita Acara Skripsi</p>
              </object>
              <input
                type="file"
                accept="application/pdf"
                className="bg-white text-black input input-bordered input-primary w-full mt-2"
                onChange={handleChange}
                name="scanBeritaAcara"
              />
            </div>
            <div className="flex justify-end mb-3 mt-3">
              <button
                className="bg-[#FBBF24] rounded-xl px-4 py-2"
                onClick={onSubmitSetuju}
              >
                Verifikasi
              </button>
              <button
                className="bg-[#FBBF24] rounded-xl px-4 py-2"
                onClick={onUpdate}
              >
                Perbarui
              </button>
            </div>
          </div>
        </div>
      </div>
      ;
    </>
  );
};

export default DetailSkripsi;
