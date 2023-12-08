import React, { useEffect, useState } from "react";
import { LoadingLayout } from "../../components/layouts";
import SidebarMahasiswa from "./SidebarMahasiswa";
import Navbar from "../../components/layouts/Navbar";
import LokalMahasiswa from "../../helpers/LokalMahasiswa";
import Http from "../../helpers/Fetch";
import AuthUser from "../../helpers/AuthUser";
import { CustomInput } from "../../components/input";
import Swal from "sweetalert2";

interface dataSkripsi {
  NIM?: string | "";
  status?: string | "";
  nilai?: string | "Kosong";
  tanggalSidang?: string | "2002-7-28";
  lamaStudi?: number | 0;
  scanBeritaAcara?: string | "";
  verified?: boolean | false;
}

const Skripsi = () => {
  const mahasiswa = LokalMahasiswa.GetMahasiswa();
  const user = AuthUser.GetAuth();
  const [file, setFile] = useState(null);
  const [dataSkripsisudahAda, setDataSkripsisudahAda] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataSkripsi, setDataSkripsi] = useState<dataSkripsi>({
    status: "Lulus",
    nilai: "Kosong",
    scanBeritaAcara: "",
    tanggalSidang: "2002-7-28",
    lamaStudi: 1,
    verified: false,
  });

  useEffect(() => {
    getSkripsiByNIM();
    GetDashboardMahasiswa();
  }, []);

  const handleChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const getSkripsiByNIM = async () => {
    try {
      const result = await Http.get("/skripsi/" + mahasiswa?.NIM, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      if (result.status === 200) {
        setDataSkripsi(result.data?.data);
        setEditMode(true);
        setDataSkripsisudahAda(true);
      } else {
        setDataSkripsisudahAda(false);
      }
    } catch (error: any) {
      setDataSkripsisudahAda(false);
    }
  };

  const onChangeSelect = (e: any) => {
    dataSkripsi.status = e.target.value;
    if (e.target.name !== "Lulus") {
      setDataSkripsi({ ...dataSkripsi, nilai: "Kosong" });
    }
  };

  const onSubmit = async (e: any) => {
    dataSkripsi.NIM = mahasiswa?.NIM || "";

    const newDataSkripsi = {
      NIM: dataSkripsi.NIM,
      status: "Lulus",
      nilai: dataSkripsi.nilai,
      scanBeritaAcara: "",
      tanggalSidang: dataSkripsi.tanggalSidang,
      lamaStudi: Number(dataSkripsi.lamaStudi),
      verified: false,
    };

    setLoading(true);
    //uploud json
    try {
      const response = await Http.post(
        "/skripsi/" + mahasiswa?.NIM,
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
          const response2 = await Http.post(
            "/skripsi/scan/" + mahasiswa?.NIM,
            fd,
            {
              withCredentials: true,
              headers: {
                Authorization: `Bearer ${user?.token}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );
          if (response2.status === 200) {
            await Swal.fire({
              icon: "success",
              title: "Berhasil",
              text: "Skripsi Berhasil Ditambahkan",
            });
            setLoading(false);
          }
        } else {
          await Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: "Skripsi Berhasil Ditambahkan",
          });
          setLoading(false);
        }
      } else {
        await Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "Skripsi Gagal Ditambahkan",
        });
        setLoading(false);
      }
    } catch (error: any) {
      setLoading(false);
    }
  };

  const onUpdate = async (e: any) => {
    if (dataSkripsi.verified) {
      await Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Skripsi Sudah Diverifikasi",
      });
      return;
    }

    dataSkripsi.NIM = mahasiswa?.NIM || "";

    const newDataSkripsi = {
      NIM: dataSkripsi.NIM,
      status: dataSkripsi.status,
      nilai: dataSkripsi.nilai,
      scanBeritaAcara: dataSkripsi.scanBeritaAcara,
      tanggalSidang: dataSkripsi.tanggalSidang,
      semesterLulus: Number(dataSkripsi.lamaStudi),
      verified: false,
    };

    setLoading(true);
    //uploud json
    try {
      const response = await Http.post(
        "/skripsi/update/" + mahasiswa?.NIM,
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
          const response2 = await Http.post(
            "/Skripsi/scan/" + mahasiswa?.NIM,
            fd,
            {
              withCredentials: true,
              headers: {
                Authorization: `Bearer ${user?.token}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );
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
      await Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Skripsi Gagal Diperbarui " + error?.response?.data?.message,
      });
      setLoading(false);
    }
  };

  const onDelete = async (e: any) => {
    if (dataSkripsi.verified) {
      await Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Skripsi Sudah Diverifikasi",
      });
      return;
    }

    dataSkripsi.NIM = mahasiswa?.NIM || "";

    const newDataSkripsi = {
      NIM: dataSkripsi.NIM,
      status: dataSkripsi.status,
      nilai: dataSkripsi.nilai,
      scanBeritaAcara: dataSkripsi.scanBeritaAcara,
      tanggalSidang: dataSkripsi.tanggalSidang,
      semesterLulus: Number(dataSkripsi.lamaStudi),
      verified: false,
    };

    setLoading(true);
    //uploud json
    try {
      const response = await Http.delete("/skripsi/delete/" + mahasiswa?.NIM, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        // uploud scan
        const fd = new FormData();
        if (file) {
          fd.append("pdf", file);
          const response2 = await Http.post(
            "/skripsi/scan/" + mahasiswa?.NIM,
            fd,
            {
              withCredentials: true,
              headers: {
                Authorization: `Bearer ${user?.token}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );
          if (response2.status === 200) {
            await Swal.fire({
              icon: "success",
              title: "Berhasil",
              text: "Skripsi Berhasil Dihapus",
            });
            setLoading(false);
          }
        } else {
          await Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: "Skripsi Berhasil Dihapus",
          });
          setLoading(false);
          setEditMode(false);
          setDataSkripsisudahAda(false);
        }
      } else {
        await Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "Skripsi Gagal Dihapus",
        });
        setLoading(false);
      }
    } catch (error: any) {
      await Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Skripsi Gagal Dihapus " + error?.response?.data?.message,
      });
    }
  };

  const [dataDashboard, setDataDashboard]: any = useState({
    DosenWali: "",
    StatusAkedemik: "",
    IPK: 0,
    SKSk: 0,
    Skripsi: "Sudah",
    PKL: "Belum",
  });

  const constraintKHS100 = async () => {
    if (dataDashboard.SKSk >= 100) {
      setEditMode(true);
    } else {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "SKS yang diambil belum mencapai 100",
      });
    }
  };

  const GetDashboardMahasiswa = async () => {
    try {
      const res = await Http.get("/dashboardmahasiswa/" + mahasiswa?.NIM, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });

      setDataDashboard(res.data?.data);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response?.data?.message,
      });
    }
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="w-full flex h-screen">
        <SidebarMahasiswa
          name={mahasiswa?.nama || ""}
          photo={mahasiswa?.photo}
        />
        {loading ? (
          <LoadingLayout></LoadingLayout>
        ) : dataSkripsisudahAda === false ? (
          editMode ? (
            <div className="flex-1 flex flex-col p-4">
              <h1 className="text-4xl font-bold">Skripsi</h1>

              <div
                className={`${
                  dataSkripsi.status !== "Lulus" ? "hidden" : ""
                } mr-4 ml-4 mt-4`}
              >
                <label className={`text-sm text-slate-400`}>
                  Status Skripsi
                </label>
                <select
                  name="nilai"
                  className="bg-white text-black input input-bordered input-primary w-full"
                  onChange={(e) => {
                    setDataSkripsi({ ...dataSkripsi, nilai: e.target.value });
                  }}
                >
                  {dataSkripsi.nilai === "Kosong" ? (
                    <option>Masukkan Nilai</option>
                  ) : (
                    <option>{dataSkripsi.nilai}</option>
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
              <div
                className={`${
                  dataSkripsi.status !== "Lulus" ? "hidden" : ""
                } mr-4 ml-4 mt-4`}
              >
                <CustomInput
                  name="tanggalSidang"
                  label="Tanggal Sidang"
                  required={true}
                  type="date"
                  value={dataSkripsi.tanggalSidang ?? "2011-11-11"}
                  onChange={(e) => {
                    setDataSkripsi({
                      ...dataSkripsi,
                      tanggalSidang: e.target.value,
                    });
                  }}
                  // error={errData.username}
                />
              </div>
              <div
                className={`${
                  dataSkripsi.status !== "Lulus" ? "hidden" : ""
                } mr-4 ml-4 mt-4`}
              >
                <label className={`text-sm text-slate-400`}>
                  Lama Studi dalam Semester
                </label>
                <select
                  name="lamaStudi"
                  className="bg-white text-black input input-bordered input-primary w-full"
                  onChange={(e) => {
                    setDataSkripsi({
                      ...dataSkripsi,
                      lamaStudi: Number(e.target.value),
                    });
                  }}
                >
                  {dataSkripsi.lamaStudi === 0 ? (
                    <option>Pilih Lama Studi dalam Semester</option>
                  ) : (
                    <option>{dataSkripsi.lamaStudi}</option>
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
              <div
                className={`${
                  dataSkripsi.status !== "Lulus" ? "hidden" : ""
                } mr-4 ml-4 mt-4`}
              >
                <label className={`text-sm text-slate-400`}>
                  Scan Berita Acara - PDF
                </label>
                <object
                  data={file ? URL.createObjectURL(file) : ""}
                  type="application/pdf"
                  className={`${file ? "w-full h-screen" : "hidden"}`}
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
                  onClick={onSubmit}
                >
                  Simpan
                </button>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col p-4">
              <h1 className="text-4xl font-bold">Skripsi</h1>
              <div className="mb-5 mr-4 ml-4 mt-8">
                <h2>Belum Ada Data Skripsi yang Ditambahkan</h2>
                <button
                  className="bg-[#FBBF24] rounded-xl px-4 py-2"
                  onClick={constraintKHS100}
                >
                  Tambahkan Data Skripsi
                </button>
              </div>
            </div>
          )
        ) : (
          <div className="flex-1 flex flex-col p-4">
            <h1 className="text-4xl font-bold">Skripsi</h1>
            <h2 className={`text-xl ${dataSkripsi.verified ? "" : "hidden"}`}>
              Sudah diverfikasi dosen wali, hubungi dosen wali untuk perubahan
            </h2>
            <div
              className={`${
                dataSkripsi.status !== "Lulus" ? "hidden" : ""
              } mr-4 ml-4 mt-4`}
            >
              <label className={`text-sm text-slate-400`}>Nilai Skripsi</label>
              <select
                name="nilai"
                className="bg-white text-black input input-bordered input-primary w-full"
                onChange={(e) => {
                  setDataSkripsi({ ...dataSkripsi, nilai: e.target.value });
                }}
              >
                {dataSkripsi.nilai === "Kosong" ? (
                  <option>Masukkan Nilai</option>
                ) : (
                  <option>{dataSkripsi.nilai}</option>
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
            <div
              className={`${
                dataSkripsi.status !== "Lulus" ? "hidden" : ""
              } mr-4 ml-4 mt-4`}
            >
              <CustomInput
                name="tanggalSidang"
                label="Tanggal Sidang"
                required={true}
                type="date"
                value={
                  dataSkripsi.tanggalSidang === "2002-7-28"
                    ? "2002-7-28"
                    : dataSkripsi.tanggalSidang
                }
                onChange={(e) => {
                  setDataSkripsi({
                    ...dataSkripsi,
                    tanggalSidang: e.target.value,
                  });
                }}
                // error={errData.username}
              />
            </div>
            <div
              className={`${
                dataSkripsi.status !== "Lulus" ? "hidden" : ""
              } mr-4 ml-4 mt-4`}
            >
              <label className={`text-sm text-slate-400`}>
                Lama Studi dalam Semester
              </label>
              <select
                name="lamaStudi"
                className="bg-white text-black input input-bordered input-primary w-full"
                onChange={(e) => {
                  setDataSkripsi({
                    ...dataSkripsi,
                    lamaStudi: Number(e.target.value),
                  });
                }}
              >
                {dataSkripsi.lamaStudi === 0 ? (
                  <option>Pilih Semester</option>
                ) : (
                  <option>{dataSkripsi.lamaStudi}</option>
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
            <div
              className={`${
                dataSkripsi.status !== "Lulus" ? "hidden" : ""
              } mr-4 ml-4 mt-4`}
            >
              <label className={`text-sm text-slate-400`}>
                Scan Berita Acara - PDF
              </label>
              <object
                data={
                  file
                    ? URL.createObjectURL(file)
                    : "http://localhost:5502/pdf/" + dataSkripsi.scanBeritaAcara
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
            <div className="flex justify-start  mr-4 ml-4 mb-5 mt-2 gap-2 ">
              <button
                className=" bg-[#fb3924] text-white  rounded-xl px-4 py-2"
                onClick={onDelete}
              >
                Hapus
              </button>
              <button
                className="bg-[#162953] text-white rounded-xl px-4 py-2"
                onClick={onUpdate}
              >
                Perbarui
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Skripsi;
