import React, { FC, useState } from "react";
import { CustomInput } from "../../components/input";
import { useNavigate } from "react-router-dom";
import InputValidation from "../../helpers/InputValidation";
import "./Coba.css";
import Http from "../../helpers/Fetch";
import AuthAttributes from "../../inteface/AuthUserInterface";
import AuthUser from "../../helpers/AuthUser";
import Swal from "sweetalert2";

interface DataLogin {
  username?: string | null;
  password?: string | null;
}

const Login: FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<DataLogin>({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const [errData, setErrData] = useState<DataLogin>({
    username: "",
    password: "",
  });

  /* ------------------------------ OnChange Data ----------------------------- */
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const { name, value } = e.target;

    let strErr = "";
    if (name === "username") {
      strErr = InputValidation.UsernameValidation(value, 100, "username", true);
    }
    if (name === "password") {
      strErr = InputValidation.PasswordValidation(
        value,
        4,
        12,
        "Password",
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
  /* ------------------------------ End OnChange ------------------------------ */

  /* -------------------------------- OnSubmit -------------------------------- */
  const onSubmit = async () => {
    const valid = onValidation();
    if (valid) {
      setLoading(true);
      try {
        const response = await Http.post("/user/login", data, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });
        const responseData: AuthAttributes = {
          id: response.data?.data?.id,
          username: response.data?.data?.username,
          roleId: response.data?.data?.roleId,
          token: response.data?.data?.token,
          verified: response.data?.data?.verified,
          active: response.data?.data?.active,
        };
        setData({
          ...data,
          username: "",
          password: "",
        });

        AuthUser.SetAuth(responseData);
        setLoading(false);
        if (responseData.roleId === 1) {
          navigate("/*");
        } else if (responseData.roleId === 2) {
          navigate("/dashboardoperator");
        } else if (responseData.roleId === 3) {
          navigate("/*");
        } else if (responseData.roleId === 4) {
          navigate("/*");
        } else if (responseData.roleId === 5) {
          navigate("/*");
        }
      } catch (error: any) {
        Swal.fire({
          icon: "error",
          text: "Invalid Credentials",
          title: "Oops!!",
        });
        setLoading(false);
      }
    }
  };
  /* ------------------------------ End OnSubmit ------------------------------ */
  /* ------------------------------ On Validation ----------------------------- */
  const onValidation = (): boolean => {
    const tempValidation: DataLogin = {
      username: InputValidation.UsernameValidation(
        data.username,
        100,
        "username",
        true
      ),
      password: InputValidation.PasswordValidation(
        data.password,
        4,
        12,
        "Password",
        true
      ),
    };

    setErrData(tempValidation);

    for (var key in tempValidation) {
      if ((tempValidation as any)[key] !== "") {
        return false;
      }
    }
    return true;
  };
  /* ---------------------------- End On Validation --------------------------- */

  return (
    <div className="container">
      <div className="card w-96 bg-gray-200 shadow-xl">
        <figure>
          <img
            src="/images/logo.png"
            alt="Logo"
            width="150"
            height="150"
            className="d-inline-block align-text-top me-0 mt-5"
          />
        </figure>
        <br></br>
        <h4 className="font-bold text-center text-2xl text-menu-label mb-2 mt-2">
          Login
        </h4>
        <p className=" text-center font-normal mb-4">
          Sistem Monitoring dan Evaluasi
        </p>
        <hr className="horizontal-line" />
        <div className="mb-5 mr-4 ml-4 mt-8">
          <CustomInput
            name="username"
            label="username"
            required={true}
            type="username"
            value={data.username ?? ""}
            error={errData.username}
            onChange={onChange}
          />
        </div>
        <div className="mb-5 mr-4 ml-4">
          <CustomInput
            name="password"
            label="Password"
            required={true}
            type="password"
            value={data.password ?? ""}
            error={errData.password}
            onChange={onChange}
          />
        </div>

        <div className="flex justify-content-center items-center mr-4 ml-4 mb-5">
          <button
            onClick={onSubmit}
            className=" btn btn-primary normal-case mx-auto w-full font-bold"
          >
            LOGIN
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
