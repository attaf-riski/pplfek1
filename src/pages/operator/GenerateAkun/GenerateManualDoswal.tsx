import React, { useEffect, useState } from "react";
import Http from "../../../helpers/Fetch";
import AuthUser from "../../../helpers/AuthUser";
import Swal from "sweetalert2";
import LokalDoswal from "../../../helpers/LokalDoswal";
import LokalOperator from "../../../helpers/LokalOperator";
import Navbar from "../../../components/layouts/Navbar";
import SidebarOp from "../SidebarOp";
import { CustomInput } from "../../../components/input";
import DataDoswal from "../../../inteface/DoswalInterface";

const GenerateManualDoswal = () => {
  const user = AuthUser.GetAuth();
  const operator = LokalOperator.GetOperator();
  const [loading, setLoading] = useState<boolean>(false);

  const [data, setData] = useState<DataDoswal>({
    NIP: "",
    nama: "",
    email: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value,
    });
  };

  const onSubmit = async () => {
    setLoading(true);

    // baru data json

    try {
      const response = await Http.post("/doswal/create", data, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        LokalDoswal.SetDoswal(response.data.data);
        Swal.fire({
          title: "Berhasil",
          text:
            "Data Berhasil Ditambahkan\nusername: " +
            response.data.data.username +
            "\npassword: 12345678",
          icon: "success",
        }).then((res) => {
          setLoading(false);
        });
      }
    } catch (error: any) {
      Swal.fire({
        title: "Gagal",
        text: error.response?.data?.message,
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
          <h1 className="text-4xl font-bold">Generate Akun</h1>
          <div className="p-4 mt-5 rounded-2xl bg-[#EFF2FB] flex flex-col justify-center items-center">
            <div className="grid grid-cols-1 w-full mt-2 gap-1">
              <div className="mb-2">
                <CustomInput
                  name="NIP"
                  label="NIP"
                  required={true}
                  type="text"
                  readOnly={false}
                  value={data.NIP ?? ""}
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
                  readOnly={false}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="w-full flex justify-end items-end">
              <button
                className="bg-[#162953] text-white rounded-xl px-4 py-2 mt-4 mr-2"
                onClick={onSubmit}
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GenerateManualDoswal;
