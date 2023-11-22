import React, {
    FC,
    MutableRefObject,
    useEffect,
    useRef,
    useState,
  } from "react";
  import Navbar from "../../components/layouts/Navbar";
  import SidebarOp from "./SidebarOp";
  import { CustomInput, CustomTextarea } from "../../components/input";
  import HttpKabKota from "../../helpers/FetchKabKota";
  import Http from "../../helpers/Fetch";
  import AuthUser from "../../helpers/AuthUser";
  import Swal from "sweetalert2";
  import LokalMahasiswa from "../../helpers/LokalMahasiswa";
  
  interface DataMahasiswa {
    NIM?: string | null;
    nama?: string | null;
    alamat?: string | null;
    provinsi?: string | null;
    kabkota?: string | null;
    angkatan?: number | null;
    jalurMasuk?: string | null;
    email?: string | null;
    noHP?: string | null;
    status?: string | null;
    photo?: string | null;
    dosenWaliNIP?: string | null;
  }
  
  const GenerateManual: FC = () => {
    const user = AuthUser.GetAuth();
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState<boolean>(false);
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
    }, []);
  
    const provinsiChangeHandler = async (event: any) => {
      const result = await HttpKabKota.get(
        "/api-wilayah-indonesia/api/regencies/" + event.target.value + ".json"
      );
  
      setKabupaten(result.data);
    };
  
    const getMahasiswa = async () => {
      const result = await Http.get("/mahasiswa/" + user?.id, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json",
        },
      });
      setData(result.data.data);
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
      }).then((res) => {
        if (res.isDismissed) {
          return;
        } else {
        }
      });
  
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
      if (
        data.photo ===
        "https://www.pngarts.com/files/10/Default-Profile-Picture-PNG-Transparent-Image.png"
      ) {
        Swal.fire({
          title: "Gagal",
          text: "Photo Mohon Diperbarui",
          icon: "error",
        }).then((res) => {
          setLoading(false);
        });
      } else {
        const response = await Http.post("/mahasiswa/" + data.NIM, data, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${user?.token}`,
            "Content-Type": "application/json",
          },
        });
  
        if (response.status === 200) {
          console.log(response);
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
            <SidebarOp name={data.nama || ""} />
            <div className="flex-1 flex flex-col p-4">
                <h1 className="text-4xl font-bold">Generate Akun</h1>
                <div className="p-4 mt-5 rounded-2xl bg-[#EFF2FB] flex flex-col justify-center items-center">
                
                <div className="grid grid-cols-1 w-full mt-2 gap-1">
                    <div className="mb-2">
                    <CustomInput
                        name="nim"
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
                        <option>AKTIF</option>
                        ) : (
                        <option>{data.status}</option>
                        )}
                        <option>AKTIF</option>
                        
                    </select>
                    </div>
                    <div className="mb-2">
                    <CustomInput
                        name="doswal"
                        label="Dosen Wali"
                        required={true}
                        type="text"
                        value={data.dosenWaliNIP ?? ""}
                        readOnly={false}
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
  
  export default GenerateManual;
  