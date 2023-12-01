import React, {
  FC,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import Http from "../../helpers/Fetch";
import AuthUser from "../../helpers/AuthUser";
import Swal from "sweetalert2";
import LokalMahasiswa from "../../helpers/LokalMahasiswa";
import LokalOperator from "../../helpers/LokalOperator";
import Navbar from "../../components/layouts/Navbar";
import SidebarOp from "./SidebarOp";
import { CustomInput } from "../../components/input";
import DataDoswal from "../../inteface/DoswalInterface";

const GenerateManual = () => {
  const user = AuthUser.GetAuth();
  const operator = LokalOperator.GetOperator();
  const [loading, setLoading] = useState<boolean>(false);
  const [listDosenWali, setListDosenWali] = useState<DataDoswal[]>([]);

  const [data, setData] = useState({
    NIM: "",
    nama: "",
    angkatan: 0,
    dosenWaliNIP: "",
    status: "Aktif",
  });

  useEffect(() => {
    getDosenWaliList();
  }, []);

  const getDosenWaliList = async () => {
    const result = await Http.get("/doswal/listdoswal", {
      headers: {
        Authorization: `Bearer ${user?.token}`,
        "Content-Type": "application/json",
      },
    });
    setListDosenWali(result.data.data);
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

  const onSubmit = async () => {
    setLoading(true);

    // baru data json

    data.angkatan = parseInt(data.angkatan.toString());

    try {
      const response = await Http.post("/mahasiswa/create", data, {
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
                  name="NIM"
                  label="NIM"
                  required={true}
                  type="text"
                  readOnly={false}
                  value={data.NIM ?? ""}
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
                  name="angkatan"
                  label="Angkatan"
                  required={true}
                  type="text"
                  value={data.angkatan ?? ""}
                  readOnly={false}
                  onChange={onChange}
                />
              </div>

              <div className="mb-2">
                <label className={`text-sm text-slate-400`}>Dosen Wali</label>
                <select
                  name="dosenWaliNIP"
                  className="bg-white text-black input input-bordered input-primary w-full"
                  onChange={onChangeSelect}
                >
                  <option>Pilih Dosen Wali</option>
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

export default GenerateManual;
