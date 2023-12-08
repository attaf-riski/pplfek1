import React, { FC, useEffect, useState } from "react";
import Navbar from "../../components/layouts/Navbar";
import SidebarMahasiswa from "./SidebarMahasiswa";
import LokalMahasiswa from "../../helpers/LokalMahasiswa";
import Http from "../../helpers/Fetch";
import AuthUser from "../../helpers/AuthUser";
import { CustomInput } from "../../components/input";
import Swal from "sweetalert2";
import { LoadingLayout } from "../../components/layouts";
import { useNavigate, useParams } from "react-router-dom";

interface DataIRS {
  semesterAktif?: number | 1;
  jumlahSks?: number | 0;
  scanIRS?: string | "";
  NIM?: string | "";
  verified?: boolean | false;
}

const DetailIRS = () => {
  const navigate = useNavigate();
  const { semester } = useParams();
  const mahasiswa = LokalMahasiswa.GetMahasiswa();
  const user = AuthUser.GetAuth();
  const [dataIRS, setDataIRS] = useState<DataIRS>({});
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getIRSByNIMSemester();
  }, []);

  const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDataIRS({ ...dataIRS, [e.target.name]: Number(e.target.value) });
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataIRS({ ...dataIRS, [e.target.name]: Number(e.target.value) });
  };

  const handleChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const getIRSByNIMSemester = async () => {
    const result = await Http.get(
      "/irs/detail/" + mahasiswa?.NIM + "&" + semester,
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (result.status === 200) {
      setDataIRS(result.data?.data);
    }
  };

  const onSubmit = async (e: any) => {
    if (dataIRS.verified) {
      await Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "IRS Sudah Diverifikasi",
      });
      return;
    }

    setLoading(true);
    e.preventDefault();
    try {
      // uploud json
      const response2 = await Http.post(
        "/irs/update/" + mahasiswa?.NIM + "&" + semester,
        dataIRS,
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
            "/irs/scan/" + mahasiswa?.NIM + "&" + dataIRS.semesterAktif,
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

  const onDelete = async () => {
    if (dataIRS.verified) {
      await Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "IRS Sudah Diverifikasi",
      });
      return;
    }
    setLoading(true);
    try {
      const response = await Http.delete(
        "/irs/delete/" + mahasiswa?.NIM + "&" + semester,
        {
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
          text: "IRS Berhasil Dihapus",
        });
        setLoading(false);
        navigate("/dashboardmahasiswa/irs");
      } else {
        await Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "IRS Gagal Dihapus" + response.data?.message,
        });
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
    setLoading(false);
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
        ) : (
          <div className="flex-1 flex flex-col p-4 ">
            <h1 className="text-4xl font-bold">Detail IRS</h1>
            <h2 className={`text-xl ${dataIRS.verified ? "" : "hidden"}`}>
              Sudah diverfikasi dosen wali, hubungi dosen wali untuk perubahan
            </h2>
            <div className="p-5">
              <div className="mb-5 mr-4 ml-4 mt-8">
                <CustomInput
                  name="semesterAktif"
                  label="Semester Aktif"
                  required={true}
                  type="text"
                  value={dataIRS.semesterAktif ?? 0}
                  readOnly={true}
                  // error={errData.username}
                />
              </div>
              <div className="mb-5 mr-4 ml-4 mt-8">
                <CustomInput
                  name="jumlahSks"
                  label="Jumlah SKS"
                  required={true}
                  type="text"
                  value={dataIRS.jumlahSks ?? 0}
                  onChange={onChangeInput}
                  // error={errData.username}
                />
              </div>
              {/* tampilkan pdf ambil dari lokal */}
              <div className="mb-5 mr-4 ml-4 mt-8">
                <label className={`text-sm text-slate-400`}>
                  Scan IRS - PDF
                </label>
                {dataIRS.scanIRS !== "" ? (
                  <>
                    <object
                      data={
                        file
                          ? URL.createObjectURL(file)
                          : "http://localhost:5502/pdf/" + dataIRS.scanIRS
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
                  </>
                ) : (
                  <h2>Scan KHS Kosong</h2>
                )}
              </div>
              <div className="flex justify-content-center items-center mr-4 ml-4 mb-5">
                <button
                  onClick={onDelete}
                  className="bg-[#fb3924] text-white rounded-xl px-4 py-2 mt-4 mr-5"
                >
                  Hapus
                </button>
                <button
                  className="bg-[#162953] text-white rounded-xl px-4 py-2 mt-4 mr-5"
                  onClick={onSubmit}
                >
                  Perbarui
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      ;
    </>
  );
};

export default DetailIRS;
