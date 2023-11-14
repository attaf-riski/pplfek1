import React, { FC, useState } from "react";
import Http from "../../helpers/Fetch";
import Swal from "sweetalert2";
import AuthUser from "../../helpers/AuthUser";
import { LoadingLayout } from "../../components/layouts";
import Navbar from "../../components/layouts/Navbar";
import SidebarOp from "./SidebarOp";

const UploudCSV = () => {
  const user = AuthUser.GetAuth();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [link, setLink] = useState<string>("");

  const onSubmit = async () => {
    try {
      setLoading(true);
      if (!file) {
        Swal.fire({
          title: "Gagal",
          text: "File Mohon Diisi",
          icon: "error",
        }).then((res) => {
          setLoading(false);
        });
        return;
      }

      const fd = new FormData();
      fd.append("file", file);

      const response = await Http.post("/csv/uploud", fd, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      // tunggu 3 detik
      await new Promise((r) => {
        setLoading(true);
        setTimeout(r, 3000);
      });
      console.log(response.data?.data?.link);
      if (response.status === 200) {
        const responseDownload = await Http.get(
          "/uploud/" + response.data?.data.link,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${user?.token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setLoading(false);
        if (responseDownload.status === 200) {
          setLink(response.data?.data.link);
        } else if (responseDownload.status === 404) {
          setLink("");
        }
      } else {
        Swal.fire({
          title: "Gagal",
          text: "File gagal di uploud!" + response.data?.message,
          icon: "error",
        });
      }
    } catch (error: any) {
      if (error.response.status === 404) {
        setLink("");
        Swal.fire({
          title: "Gagal",
          text: "Semua data mahasiswa sudah ada",
          icon: "error",
        });
      }
      setLoading(false);
    }
  };

  const handleChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const DeleteCSV = async () => {
    try {
      // tunggu 3 detik
      await new Promise((r) => {
        setLoading(true);
        setTimeout(r, 3000);
      });
      await Http.delete("/uploud/" + link, {
        withCredentials: true,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return loading ? (
    <LoadingLayout></LoadingLayout>
  ) : (
    <>
      <Navbar></Navbar>
      <div className="w-full flex h-screen">
        <SidebarOp />
        <div className="flex-1 flex flex-col h-screen">
          <div className="w-full h-full flex flex-col justify-center items-center gap-10">
            <input type="file" accept=".csv" onChange={handleChange} />
            <button
              onClick={onSubmit}
              className="w-[312px] h-[99px] border border-black text-3xl font-inter"
            >
              Upload File
            </button>
            <button
              className={`w-[312px] h-[99px] border border-black text-3xl font-inter ${
                link === "" ? "hidden" : ""
              }`}
            >
              <a
                onClick={DeleteCSV}
                href={`http://localhost:5502/uploud/${link}`}
                target="_blank"
                rel="noreferrer"
              >
                Download Akses Akun
              </a>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploudCSV;
