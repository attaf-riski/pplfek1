import React, { FC, useState } from "react";
import { CustomInput } from "../../components/input";
import InputValidation from "../../helpers/InputValidation";
import Swal from "sweetalert2";
import Http from "../../helpers/Fetch";
import AuthUser from "../../helpers/AuthUser";

const UbahPassword: FC = () => {
  const user = AuthUser.GetAuth();
  const [errData, setErrData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [data, setData] = useState({
    userId: user?.id,
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const { name, value } = e.target;

    let strErr = "";
    if (name === "newPassword") {
      strErr = InputValidation.PasswordValidation(
        value,
        8,
        12,
        "New Password",
        true
      );
    }

    setErrData({
      ...errData,
      [name]: strErr,
    });

    setData({
      ...data,
      [name]: value,
    });
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();

    Swal.fire({
      icon: "warning",
      title: "Apakah anda yakin?",
      text: "Apakah anda yakin ingin mengubah password?",
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (data.newPassword !== data.confirmPassword) {
          Swal.fire({
            icon: "error",
            title: "Gagal",
            text: "Password Baru tidak sama dengan Confirm Password",
          });
          return;
        }

        try {
          const response = await Http.post("/user/updatepassword", data, {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${user?.token}`,
              "Content-Type": "application/json",
            },
          });
          if (response.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Berhasil",
              text: "Berhasil mengubah password",
            });
          }
        } catch (error: any) {
          Swal.fire({
            icon: "error",
            title: "Gagal",
            text: "Gagal mengubah password, " + error.response.data.message,
          });
        }
      }
    });
  };

  return (
    <div className="flex">
      <div className="grid grid-cols-1 w-full mt-4 gap-2">
        <div className="mb-2">
          <CustomInput
            name="oldPassword"
            label="Old Password"
            required={true}
            type="password"
            value={data.oldPassword ?? ""}
            error={errData.oldPassword}
            onChange={onChange}
          />
        </div>
        <div className="mb-2">
          <CustomInput
            name="newPassword"
            label="New Password"
            required={true}
            type="password"
            value={data.newPassword ?? ""}
            error={errData.newPassword}
            onChange={onChange}
          />
        </div>
        <div className="mb-2">
          <CustomInput
            name="confirmPassword"
            label="Confirm Password"
            required={true}
            type="password"
            value={data.confirmPassword ?? ""}
            error={errData.confirmPassword}
            onChange={onChange}
          />
        </div>
        <div className="w-full flex justify-end items-end">
          <button
            className="bg-[#162953] text-white rounded-xl px-4 py-2 mt-4 mr-5"
            onClick={onSubmit}
          >
            Ubah Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default UbahPassword;
