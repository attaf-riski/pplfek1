import React, {
  FC,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import Navbar from "../../components/layouts/Navbar";
import { CustomInput, CustomTextarea } from "../../components/input";
import HttpKabKota from "../../helpers/FetchKabKota";
import Http from "../../helpers/Fetch";
import AuthUser from "../../helpers/AuthUser";
import Swal from "sweetalert2";
import LokalMahasiswa from "../../helpers/LokalMahasiswa";
import DataMahasiswa from "../../inteface/MahasiswaInterface";
import SidebarOp from "./SidebarOp";
import LokalOperator from "../../helpers/LokalOperator";
import { useNavigate, useParams } from "react-router-dom";
import DataDoswal from "../../inteface/DoswalInterface";
import AuthAttributes from "../../inteface/AuthUserInterface";

const UpdataDataMahasiswaByOperator: FC = () => {
  const user = AuthUser.GetAuth();
  const operator = LokalOperator.GetOperator();
  const navigate = useNavigate();
  const { NIM } = useParams();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [listDosenWali, setListDosenWali] = useState<DataDoswal[]>([]);
  const [data, setData] = useState<DataMahasiswa>({
    NIM: "",
    nama: "",
    alamat: "",
    provinsi: "",
    kabkota: "",
    angkatan: 0,
    jalurMasuk: "",
    email: "",
    noHP: "",
    status: "",
    photo: "",
    dosenWaliNIP: "",
    userId: 0,
  });

  const [userData, setUserData] = useState<AuthAttributes>({
    id: 0,
    username: "",
  });

  const [provinsi, setProvinsi] = useState([]);
  const [kabupaten, setKabupaten] = useState([]);

  const getDaftarProvinsi = async () => {
    const result = await HttpKabKota.get(
      "/api-wilayah-indonesia/api/provinces.json"
    );
    setProvinsi(result.data);
  };

  useEffect(() => {
    getDaftarProvinsi();
    getMahasiswa();
    getDosenWaliList();
  }, []);

  const getUser = async (bufferId: any) => {
    const result = await Http.get("/user/getuserbyid/" + bufferId, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
        "Content-Type": "application/json",
      },
    });
    console.log(result.data.data);
    setUserData(result.data.data);
  };

  const getDosenWaliList = async () => {
    const result = await Http.get("/doswal/listdoswal", {
      headers: {
        Authorization: `Bearer ${user?.token}`,
        "Content-Type": "application/json",
      },
    });
    setListDosenWali(result.data.data);
  };

  const provinsiChangeHandler = async (event: any) => {
    const result = await HttpKabKota.get(
      "/api-wilayah-indonesia/api/regencies/" + event.target.value + ".json"
    );

    setKabupaten(result.data);
  };

  const getMahasiswa = async () => {
    const result = await Http.get("/operator/listmahasiswa/detail/" + NIM, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
        "Content-Type": "application/json",
      },
    });
    setData(result.data.data);
    let bufferId = result.data.data.userId;
    getUser(bufferId);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value,
    });
  };

  const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value,
    });
  };

  const onChangeKabupaten = (e: React.ChangeEvent<HTMLSelectElement>) => {
    provinsiChangeHandler(e);
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: kabupaten.find((item: any) => item.id === value)!["name"],
    });
  };

  const changeProvinsi = (e: React.ChangeEvent<HTMLSelectElement>) => {
    provinsiChangeHandler(e);
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: provinsi.find((item: any) => item.id === value)!["name"],
    });
  };

  const onSubmit = async () => {
    console.log(data);
    await Swal.fire({
      title: "Peringatan",
      text: "Apakah anda yakin akan memperbarui data?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya",
    }).then((result) => {
      if (result.isConfirmed) {
        updateData();
      } else {
      }
    });
  };

  const deleteData = async () => {
    await Swal.fire({
      title: "Peringatan",
      text: "Apakah anda yakin akan menghapus data?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteDataMahasiswa();
      } else {
      }
    });
  };

  const deleteDataMahasiswa = async () => {
    setLoading(true);
    // hapus photo
    // hapus data IRS
    // hapus data KHS
    // hapus data PKL
    // hapus data Skripsi
    // hapus data mahasiswa
    // hapus data user

    const response = await Http.delete("/mahasiswa/delete/" + data.NIM, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${user?.token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      LokalMahasiswa.SetMahasiswa(response.data.data);
      Swal.fire({
        title: "Berhasil",
        text: "Data Berhasil Dihapus",
        icon: "success",
      }).then((res) => {
        // pindah halaman

        navigate("/operator/pencarianmahasiswa");

        setLoading(false);
      });
    } else {
      Swal.fire({
        title: "Gagal",
        text: "Data Gagal Dihapus",
        icon: "error",
      }).then((res) => {
        setLoading(false);
      });
    }
  };

  const resetPassword = async () => {
    await Swal.fire({
      title: "Peringatan",
      text: "Apakah anda yakin akan mereset password?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya",
    }).then((result) => {
      if (result.isConfirmed) {
        resetPasswordWorker();
      } else {
      }
    });
  };

  const resetPasswordWorker = async () => {
    setLoading(true);
    // photo dulu
    const response = await Http.post("/user/resetpassword", data, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${user?.token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      LokalMahasiswa.SetMahasiswa(response.data.data);
      Swal.fire({
        title: "Berhasil",
        text: "Password Berhasil Direset ke 12345678",
        icon: "success",
      }).then((res) => {
        setLoading(false);
      });
    } else {
      Swal.fire({
        title: "Gagal",
        text: "Password Gagal Direset",
        icon: "error",
      }).then((res) => {
        setLoading(false);
      });
    }
  };

  const updateData = async () => {
    setLoading(true);
    // photo dulu
    const fd = new FormData();
    if (file) {
      fd.append("image", file);

      const response = await Http.post("/mahasiswa/image/" + data.NIM, fd, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      data.photo = response.data.data["photo"];
      console.log(response);
    }

    // baru data json

    const response = await Http.post("/mahasiswa/" + data.NIM, data, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${user?.token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      LokalMahasiswa.SetMahasiswa(response.data.data);
      Swal.fire({
        title: "Berhasil",
        text: "Data Berhasil Diperbarui",
        icon: "success",
      }).then((res) => {
        setLoading(false);
      });
    } else {
      Swal.fire({
        title: "Gagal",
        text: "Data Gagal Diperbarui",
        icon: "error",
      }).then((res) => {
        setLoading(false);
      });
    }
  };

  const hiddenFileInput = useRef(
    null
  ) as unknown as MutableRefObject<HTMLInputElement>;
  const uploudGambar = async (e: any) => {
    hiddenFileInput.current?.click();
  };

  const handleChange = (event: any) => {
    const fileUploaded = event.target.files[0];
    setFile(fileUploaded);
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="w-full flex h-screen">
        <SidebarOp name={operator?.nama || ""} />
        <div className="flex-1 flex flex-col p-4">
          <h1 className="text-4xl font-bold">Update Data Mahasiswa</h1>
          <div className="p-4 mt-5 rounded-2xl bg-[#EFF2FB] flex flex-col justify-center items-center">
            <div className="relative w-32 h-32">
              <img
                className="object-cover w-24 h-24 mx-2 rounded-full border bg-gray-200 border-gray-100 shadow-sm"
                src={file ? URL.createObjectURL(file) : data.photo!}
                alt="user profil"
              />
              <div
                className="absolute top-0 right-0 h-7 w-7 my-1 border-2 border-white rounded-full bg-green-400 z-2"
                onClick={uploudGambar}
              >
                <img
                  className="rounded-full bg-white shadow-sm"
                  src="/images/edit.png"
                  alt="edit"
                />
                <input
                  type="file"
                  accept=".png,.jpg,.jpeg"
                  onChange={handleChange}
                  ref={hiddenFileInput}
                  style={{ display: "none" }}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 w-full mt-4 gap-2">
              <div className="mb-2">
                <CustomInput
                  name="nim"
                  label="NIM"
                  required={true}
                  type="text"
                  readOnly={true}
                  value={data.NIM ?? ""}
                  onChange={onChange}
                />
              </div>
              <div className="mb-2">
                <CustomInput
                  name="username"
                  label="Username"
                  required={true}
                  type="text"
                  readOnly={true}
                  value={userData.username ?? ""}
                  onChange={onChange}
                />
              </div>
              <div className="mb-2">
                <CustomInput
                  name="nama"
                  label="Nama"
                  required={true}
                  type="text"
                  value={data.nama ?? ""}
                  onChange={onChange}
                />
              </div>
              <div className="mb-2">
                <CustomTextarea
                  name="alamat"
                  label="Alamat"
                  required={true}
                  type="text"
                  value={data.alamat ?? ""}
                  onChange={(e) => {
                    setData({
                      ...data,
                      alamat: e.target.value,
                    });
                  }}
                ></CustomTextarea>
              </div>
              <div className="mb-2">
                <label className={`text-sm text-slate-400`}>Provinsi</label>
                <select
                  name="provinsi"
                  className="bg-white text-black input input-bordered input-primary w-full"
                  onChange={changeProvinsi}
                >
                  {data.provinsi === "" ? (
                    <option>Pilih Provinsi</option>
                  ) : (
                    <option>{data.provinsi}</option>
                  )}
                  {provinsi.map((item: any) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-2">
                <label className={`text-sm text-slate-400`}>
                  Kabupaten / Kota
                </label>
                <select
                  name="kabkota"
                  className="bg-white text-black input input-bordered input-primary w-full"
                  onChange={onChangeKabupaten}
                >
                  {data.kabkota === "" ? (
                    <option>Pilih Kota</option>
                  ) : (
                    <option>{data.kabkota}</option>
                  )}
                  {kabupaten.map((item: any) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-2">
                <CustomInput
                  name="angkatan"
                  label="Angkatan"
                  required={true}
                  type="text"
                  value={data.angkatan ?? ""}
                  onChange={onChange}
                />
              </div>
              <div className="mb-2">
                <label className={`text-sm text-slate-400`}>Jalur Masuk</label>
                <select
                  name="jalurMasuk"
                  className="bg-white text-black input input-bordered input-primary w-full"
                  onChange={onChangeSelect}
                >
                  {data.jalurMasuk === "" ? (
                    <option>Pilih Jalur Masuk</option>
                  ) : (
                    <option>{data.jalurMasuk}</option>
                  )}
                  <option>SNMPTN</option>
                  <option>SBMPTN</option>
                  <option>Mandiri</option>
                  <option>Lainnya</option>
                </select>
              </div>
              <div className="mb-2">
                <CustomInput
                  name="email"
                  label="Email"
                  required={true}
                  type="email"
                  value={data.email ?? ""}
                  readOnly={false}
                  onChange={onChange}
                />
              </div>
              <div className="mb-2">
                <CustomInput
                  name="noHP"
                  label="No Ponsel"
                  required={true}
                  type="text"
                  value={data.noHP ?? ""}
                  onChange={onChange}
                />
              </div>
              <div className="mb-2">
                <label className={`text-sm text-slate-400`}>
                  Status Sekarang
                </label>
                <select
                  name="status"
                  className="bg-white text-black input input-bordered input-primary w-full"
                  onChange={onChangeSelect}
                >
                  {data.status === "" ? (
                    <option>Pilih Status</option>
                  ) : (
                    <option>{data.status}</option>
                  )}
                  <option>Aktif</option>
                  <option>Cuti</option>
                </select>
              </div>
              <div className="mb-2">
                <label className={`text-sm text-slate-400`}>Dosen Wali</label>
                <select
                  name="dosenWaliNIP"
                  className="bg-white text-black input input-bordered input-primary w-full"
                  onChange={onChangeSelect}
                >
                  {data.dosenWaliNIP === "" ? (
                    <option>Pilih Dosen Wali</option>
                  ) : (
                    <option>{data.dosenWaliNIP}</option>
                  )}
                  {listDosenWali.map((item, index) => {
                    return (
                      <option key={item.NIP} value={item.NIP || ""}>
                        {item.nama}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="w-full flex justify-end items-end">
              <button
                name="reset"
                className="bg-[#e14040] text-white rounded-xl px-4 py-2 mt-4 mr-5"
                onClick={resetPassword}
              >
                Reset Password
              </button>
              <button
                name="delete"
                className="bg-[#e14040] text-white rounded-xl px-4 py-2 mt-4 mr-5"
                onClick={deleteData}
              >
                Hapus
              </button>
              <button
                name="submit"
                className="bg-[#162953] text-white rounded-xl px-4 py-2 mt-4 mr-5"
                onClick={onSubmit}
              >
                Ubah
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdataDataMahasiswaByOperator;
