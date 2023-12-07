import React, { FC, useEffect, useState } from "react";
import Navbar from "../../components/layouts/Navbar";
import { CustomInput } from "../../components/input";
import Http from "../../helpers/Fetch";
import AuthUser from "../../helpers/AuthUser";
import Swal from "sweetalert2";
import LokalMahasiswa from "../../helpers/LokalMahasiswa";
import { Link, useNavigate, useParams } from "react-router-dom";
import AuthAttributes from "../../inteface/AuthUserInterface";
import SidebarDep from "./SidebarDep";
import LokalDepartemen from "../../helpers/LokalDepartemen";

const EditdataDepartemen: FC = () => {
  const user = AuthUser.GetAuth();
  const departemen = LokalDepartemen.GetDepartemen();
  const navigate = useNavigate();
  const { NIP } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState({
    NIP: "",
    email: "",
    nama: "",
    userId: 0,
  });

  const [userData, setUserData] = useState<AuthAttributes>({
    id: 0,
    username: "",
  });

  useEffect(() => {
    getdepartemen();
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

  const getdepartemen = async () => {
    const result = await Http.get("/operator/listdepartemen/detail/" + NIP, {
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

  const updateData = async () => {
    setLoading(true);
    // baru data json
    const response = await Http.post("/departemen/update/" + data.NIP, data, {
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
        <SidebarDep name={departemen?.nama || ""} />
        <div className="flex-1 flex flex-col p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold">Update Data Dosen Wali</h1>
            <div className="flex-1 flex justify-end items-center">
              <Link
                to={"/departemen/ubahpassword"}
                className="bg-[#162953] text-white rounded-xl px-4 py-2 mt-4 mr-5"
              >
                Ubah Password
              </Link>
            </div>
          </div>
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

export default EditdataDepartemen;
