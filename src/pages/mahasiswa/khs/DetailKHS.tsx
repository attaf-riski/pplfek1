import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import LokalMahasiswa from "../../../helpers/LokalMahasiswa";
import AuthUser from "../../../helpers/AuthUser";
import Http from "../../../helpers/Fetch";
import Navbar from "../../../components/layouts/Navbar";
import SidebarMahasiswa from "../SidebarMahasiswa";
import { LoadingLayout } from "../../../components/layouts";
import { CustomInput } from "../../../components/input";
import { useParams } from "react-router-dom";

interface DataKHS {
  semesterAktif?: number | 0;
  jumlahSksSemester?: number | 0;
  jumlahSksKumulatif?: number | 0;
  IPS?: number | 0;
  IPK?: number | 0;
  scanKHS?: string | "";
  NIM?: string | "";
  verified?: boolean | false;
}

const CreateKHS = () => {
  const { semester } = useParams();
  const mahasiswa = LokalMahasiswa.GetMahasiswa();
  const user = AuthUser.GetAuth();
  const [dataKHS, setdataKHS] = useState<DataKHS>({});
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getKHSByNIMSemester();
  }, []);

  const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setdataKHS({ ...dataKHS, [e.target.name]: e.target.value });
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setdataKHS({ ...dataKHS, [e.target.name]: e.target.value });
  };

  const handleChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const getKHSByNIMSemester = async () => {
    const result = await Http.get(
      "/khs/detail/" + mahasiswa?.NIM + "&" + semester,
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (result.status === 200) {
      console.log(result.data?.data);
      setdataKHS(result.data?.data);
    }
  };

  const onSubmit = async (e: any) => {
    setLoading(true);
    const newDataIRS = {
      semesterAktif: Number(dataKHS.semesterAktif),
      jumlahSksSemester: Number(dataKHS.jumlahSksSemester),
      jumlahSksKumulatif: Number(dataKHS.jumlahSksKumulatif),
      IPS: Number(dataKHS.IPS),
      IPK: Number(dataKHS.IPK),
    };
    e.preventDefault();
    try {
      // uploud json
      dataKHS.semesterAktif = dataKHS.semesterAktif || 1;
      dataKHS.NIM = mahasiswa?.NIM || "";
      dataKHS.verified = false;
      const response2 = await Http.post(
        "/khs/update/" + mahasiswa?.NIM + "&" + semester,
        newDataIRS,
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
            "/khs/scan/" + mahasiswa?.NIM + "&" + dataKHS.semesterAktif,
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
              text: "KHS Berhasil Ditambahkan dan Scan KHS diperbarui",
            });
            setLoading(false);
          }
        } else {
          await Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: "KHS Berhasil Diperbarui",
          });
        }

        setLoading(false);
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
          <div className="flex-1 flex flex-col p-4">
            <h1 className="text-4xl font-bold">Detail KHS</h1>
            <div>
              <div className="mb-5 mr-4 ml-4 mt-8">
                <CustomInput
                  name="semesterAktif"
                  label="Semester"
                  required={true}
                  type="text"
                  value={dataKHS.semesterAktif ?? 0}
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
                  value={dataKHS.jumlahSksSemester ?? 0}
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
                  value={dataKHS.jumlahSksKumulatif ?? 0}
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
                  value={dataKHS.IPS ?? 0}
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
                  value={dataKHS.IPK ?? 0}
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
                      : "http://localhost:5502/pdf/" + dataKHS.scanKHS
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
                onClick={onSubmit}
              >
                Perbarui
              </button>
            </div>
          </div>
        )}
      </div>
      ;
    </>
  );
};

export default CreateKHS;
