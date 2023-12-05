import React, { FC, useEffect, useState } from "react";
import Navbar from "../../components/layouts/Navbar";
import { CustomInput } from "../../components/input";
import HttpKabKota from "../../helpers/FetchKabKota";
import Http from "../../helpers/Fetch";
import AuthUser from "../../helpers/AuthUser";
import Swal from "sweetalert2";
import LokalMahasiswa from "../../helpers/LokalMahasiswa";
import SidebarOp from "./SidebarOp";
import LokalOperator from "../../helpers/LokalOperator";
import { useNavigate, useParams } from "react-router-dom";
import DataDoswal from "../../inteface/DoswalInterface";
import AuthAttributes from "../../inteface/AuthUserInterface";

const UpdataDataDoswalByOperator: FC = () => {
  const user = AuthUser.GetAuth();
  const operator = LokalOperator.GetOperator();
  const navigate = useNavigate();
  const { NIP } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<DataDoswal>({});

  const [userData, setUserData] = useState<AuthAttributes>({
    id: 0,
    username: "",
  });

  useEffect(() => {
    getDoswal();
  }, []);

  const getUser = async (userId: any) => {
    const result = await Http.get("/user/getuserbyid/" + userId, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
        "Content-Type": "application/json",
      },
    });
    setUserData(result.data.data);
  };

  const getDoswal = async () => {
    const result = await Http.get("/operator/listdoswal/detail/" + NIP, {
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
        deleteDataDoswal();
      } else {
      }
    });
  };

  const deleteDataDoswal = async () => {
    setLoading(true);
    // hapus data doswal
    // hapus data user

    const response = await Http.delete("/doswal/delete/" + data.NIP, {
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

        navigate("/operator/pencariandoswal");

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
    // baru data json
    const response = await Http.post("/doswal/update/" + data.NIP, data, {
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

  return (
    <>
      <Navbar></Navbar>
      <div className="w-full flex h-screen">
        <SidebarOp name={operator?.nama || ""} />
        <div className="flex-1 flex flex-col p-4">
          <h1 className="text-4xl font-bold">Update Data Dosen Wali</h1>
          <div className="p-4 mt-5 rounded-2xl bg-[#EFF2FB] flex flex-col justify-center items-center">
            <div className="grid grid-cols-1 w-full mt-4 gap-2">
              <div className="mb-2">
                <CustomInput
                  name="NIP"
                  label="NIP"
                  required={true}
                  type="text"
                  readOnly={true}
                  value={data.NIP ?? ""}
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
                <CustomInput
                  name="email"
                  label="Email"
                  required={true}
                  type="text"
                  value={data.email ?? ""}
                  onChange={onChange}
                />
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

export default UpdataDataDoswalByOperator;
