import React, { FC, useState } from "react";
import Http from "../../helpers/Fetch";
import Swal from "sweetalert2";
import AuthUser from "../../helpers/AuthUser";
import { LoadingLayout } from "../../components/layouts";
import Navbar from "../../components/layouts/Navbar";

const UploudCSV = () => {
  const user = AuthUser.GetAuth();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async () => {
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

    if (response.status === 200) {
      Swal.fire({
        title: "Berhasil",
        text: "File berhasil di uploud, File CSV akses akun telah didownload!",
        icon: "success",
      });
      if (response.data?.linkDownload) {
        await Http.get("/pdf/" + response.data?.linkDownload, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${user?.token}`,
            "Content-Type": "application/json",
          },
        });
      }
    } else {
      Swal.fire({
        title: "Gagal",
        text: "File gagal di uploud!" + response.data?.message,
        icon: "error",
      });
    }
    setLoading(false);
  };

  const handleChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  return loading ? (
    <LoadingLayout></LoadingLayout>
  ) : (
    <div className="w-full h-screen">
      <Navbar></Navbar>
      <div className="w-full h-full flex flex-col justify-center items-center gap-10">
        <input type="file" accept=".csv" onChange={handleChange} />
        <button
          onClick={onSubmit}
          className="w-[312px] h-[99px] border border-black text-3xl font-inter"
        >
          Upload File
        </button>
      </div>
    </div>
  );
};

export default UploudCSV;
