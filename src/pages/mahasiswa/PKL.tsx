import React, { useEffect, useState } from "react";
import { LoadingLayout } from "../../components/layouts";
import SidebarMahasiswa from "./SidebarMahasiswa";
import Navbar from "../../components/layouts/Navbar";
import LokalMahasiswa from "../../helpers/LokalMahasiswa";
import Http from "../../helpers/Fetch";
import AuthUser from "../../helpers/AuthUser";
import { CustomInput } from "../../components/input";
import Swal from "sweetalert2";

interface dataPKL {
  NIM?: string | "";
  status?: string | "";
  nilai?: string | "Kosong";
  scanBeritaAcara?: string | "";
  tanggalSidang?: string | "2002-7-28";
  semesterLulus?: number | 0;
  verified?: boolean | false;
}

const PKL = () => {
  const mahasiswa = LokalMahasiswa.GetMahasiswa();
  const user = AuthUser.GetAuth();
  const [file, setFile] = useState(null);
  const [dataPKLsudahAda, setDataPKLsudahAda] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataPKL, setDataPKL] = useState<dataPKL>({
    status: "Lulus",
    nilai: "Kosong",
    scanBeritaAcara: "",
    tanggalSidang: "2002-7-28",
    semesterLulus: 1,
    verified: false,
  });

  useEffect(() => {
    getPKLByNIM();
  }, []);

  const handleChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const getPKLByNIM = async () => {
    try {
      const result = await Http.get("/pkl/" + mahasiswa?.NIM, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      if (result.status === 200) {
        setDataPKL(result.data?.data);
        setEditMode(true);
        setDataPKLsudahAda(true);
      } else {
        setDataPKLsudahAda(false);
      }
    } catch (error: any) {
      setDataPKLsudahAda(false);
    }
  };

  const onChangeSelect = (e: any) => {
    dataPKL.status = e.target.value;
    if (e.target.name !== "Lulus") {
      setDataPKL({ ...dataPKL, nilai: "Kosong" });
    }
  };

  const onChangeInput = (e: any) => {
    setDataPKL({ ...dataPKL, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: any) => {
    dataPKL.NIM = mahasiswa?.NIM || "";

    console.log(dataPKL);
    const newDataPKL = {
      NIM: dataPKL.NIM,
      status: "Lulus",
      nilai: dataPKL.nilai,
      scanBeritaAcara: "",
      tanggalSidang: dataPKL.tanggalSidang,
      semesterLulus: Number(dataPKL.semesterLulus),
      verified: false,
    };

    setLoading(true);
    //uploud json
    try {
      const response = await Http.post("/pkl/" + mahasiswa?.NIM, newDataPKL, {
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
          const response2 = await Http.post("/pkl/scan/" + mahasiswa?.NIM, fd, {
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
              text: "PKL Berhasil Ditambahkan",
            });
            setLoading(false);
          }
        } else {
          await Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: "PKL Berhasil Ditambahkan",
          });
          setLoading(false);
        }
      } else {
        await Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "PKL Gagal Ditambahkan",
        });
        setLoading(false);
      }
    } catch (error: any) {
      setLoading(false);
    }
  };

  const onUpdate = async (e: any) => {
    if (dataPKL.verified) {
      await Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "PKL Sudah Diverifikasi",
      });
      return;
    }

    dataPKL.NIM = mahasiswa?.NIM || "";

    const newDataPKL = {
      NIM: dataPKL.NIM,
      status: dataPKL.status,
      nilai: dataPKL.nilai,
      scanBeritaAcara: dataPKL.scanBeritaAcara,
      tanggalSidang: dataPKL.tanggalSidang,
      semesterLulus: Number(dataPKL.semesterLulus),
      verified: false,
    };

    setLoading(true);
    //uploud json
    try {
      const response = await Http.post(
        "/pkl/update/" + mahasiswa?.NIM,
        newDataPKL,
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
          const response2 = await Http.post("/pkl/scan/" + mahasiswa?.NIM, fd, {
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
              text: "PKL Berhasil Diperbarui",
            });
            setLoading(false);
          }
        } else {
          await Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: "PKL Berhasil Diperbarui",
          });
          setLoading(false);
        }
      } else {
        await Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "PKL Gagal Diperbarui",
        });
        setLoading(false);
      }
    } catch (error: any) {
      console.log();
      await Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "PKL Gagal Diperbarui " + error?.response?.data?.message,
      });
      setLoading(false);
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
        ) : dataPKLsudahAda === false ? (
          editMode ? (
            <div className="flex-1 flex flex-col p-4">
              <h1 className="text-4xl font-bold">PKL</h1>
              <div
                className={`${
                  dataPKL.status !== "Lulus" ? "hidden" : ""
                } mr-4 ml-4 mt-4`}
              >
                <label className={`text-sm text-slate-400`}>Nilai</label>
                <select
                  name="nilai"
                  className="bg-white text-black input input-bordered input-primary w-full"
                  onChange={(e) => {
                    setDataPKL({ ...dataPKL, nilai: e.target.value });
                  }}
                >
                  {dataPKL.nilai === "Kosong" ? (
                    <option>Masukkan Nilai</option>
                  ) : (
                    <option>{dataPKL.nilai}</option>
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
                  dataPKL.status !== "Lulus" ? "hidden" : ""
                } mr-4 ml-4 mt-4`}
              >
                <CustomInput
                  name="tanggalSidang"
                  label="Tanggal Sidang"
                  required={true}
                  type="date"
                  value={dataPKL.tanggalSidang ?? "2011-11-11"}
                  onChange={(e) => {
                    setDataPKL({ ...dataPKL, tanggalSidang: e.target.value });
                  }}
                  // error={errData.username}
                />
              </div>
              <div
                className={`${
                  dataPKL.status !== "Lulus" ? "hidden" : ""
                } mr-4 ml-4 mt-4`}
              >
                <label className={`text-sm text-slate-400`}>
                  Semester Lulus
                </label>
                <select
                  name="semesterLulus"
                  className="bg-white text-black input input-bordered input-primary w-full"
                  onChange={(e) => {
                    setDataPKL({
                      ...dataPKL,
                      semesterLulus: Number(e.target.value),
                    });
                  }}
                >
                  {dataPKL.semesterLulus === 0 ? (
                    <option>Pilih Semester</option>
                  ) : (
                    <option>{dataPKL.semesterLulus}</option>
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
                  dataPKL.status !== "Lulus" ? "hidden" : ""
                } mr-4 ml-4 mt-4`}
              >
                <label className={`text-sm text-slate-400`}>
                  Scan Berita Acara PKL - PDF
                </label>
                <object
                  data={file ? URL.createObjectURL(file) : ""}
                  type="application/pdf"
                  className={`${file ? "w-full h-screen" : "hidden"}`}
                >
                  <p>Scan Berita Acara PKL</p>
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
              <h1 className="text-4xl font-bold">PKL</h1>
              <div className="mb-5 mr-4 ml-4 mt-8">
                <h2>Belum Ada Data PKL yang Ditambahkan</h2>
                <button
                  className="bg-[#FBBF24] rounded-xl px-4 py-2"
                  onClick={() => {
                    setEditMode(true);
                  }}
                >
                  Tambahkan Data PKL
                </button>
              </div>
            </div>
          )
        ) : (
          <div className="flex-1 flex flex-col p-4">
            <h1 className="text-4xl font-bold">PKL</h1>
            <h2 className={`text-xl ${dataPKL.verified ? "" : "hidden"}`}>
              Sudah diverfikasi dosen wali, hubungi dosen wali untuk perubahan
            </h2>
            <div
              className={`${
                dataPKL.status !== "Lulus" ? "hidden" : ""
              } mr-4 ml-4 mt-4`}
            >
              <label className={`text-sm text-slate-400`}>Status PKL</label>
              <select
                name="nilai"
                className="bg-white text-black input input-bordered input-primary w-full"
                onChange={(e) => {
                  setDataPKL({ ...dataPKL, nilai: e.target.value });
                }}
              >
                {dataPKL.nilai === "Kosong" ? (
                  <option>Masukkan Nilai</option>
                ) : (
                  <option>{dataPKL.nilai}</option>
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
                dataPKL.status !== "Lulus" ? "hidden" : ""
              } mr-4 ml-4 mt-4`}
            >
              <CustomInput
                name="tanggalSidang"
                label="Tanggal Sidang"
                required={true}
                type="date"
                value={
                  dataPKL.tanggalSidang === "2002-7-28"
                    ? "2002-7-28"
                    : dataPKL.tanggalSidang
                }
                onChange={(e) => {
                  setDataPKL({ ...dataPKL, tanggalSidang: e.target.value });
                }}
                // error={errData.username}
              />
            </div>
            <div
              className={`${
                dataPKL.status !== "Lulus" ? "hidden" : ""
              } mr-4 ml-4 mt-4`}
            >
              <label className={`text-sm text-slate-400`}>Semester Lulus</label>
              <select
                name="semesterLulus"
                className="bg-white text-black input input-bordered input-primary w-full"
                onChange={(e) => {
                  setDataPKL({
                    ...dataPKL,
                    semesterLulus: Number(e.target.value),
                  });
                }}
              >
                {dataPKL.semesterLulus === 0 ? (
                  <option>Pilih Semester</option>
                ) : (
                  <option>{dataPKL.semesterLulus}</option>
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
                dataPKL.status !== "Lulus" ? "hidden" : ""
              } mr-4 ml-4 mt-4`}
            >
              <label className={`text-sm text-slate-400`}>
                Scan Berita Acara PKL - PDF
              </label>
              <object
                data={
                  file
                    ? URL.createObjectURL(file)
                    : "http://localhost:5502/pdf/" + dataPKL.scanBeritaAcara
                }
                type="application/pdf"
                className={`w-full h-screen`}
              >
                <p>Scan Berita Acara PKL</p>
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

export default PKL;
