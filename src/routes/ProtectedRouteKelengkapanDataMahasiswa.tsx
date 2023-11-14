import { useLocation, Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import LokalMahasiswa from "../helpers/LokalMahasiswa";

const ProtectRouteKelengkapanDataMahasiswa = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const location = useLocation();
  const mahasiswa = LokalMahasiswa.GetMahasiswa();

  if (
    mahasiswa?.NIM === "" ||
    mahasiswa?.nama === "" ||
    mahasiswa?.alamat === "" ||
    mahasiswa?.provinsi === "" ||
    mahasiswa?.kabkota === "" ||
    mahasiswa?.angkatan === 0 ||
    mahasiswa?.jalurMasuk === "" ||
    mahasiswa?.email === "" ||
    mahasiswa?.noHP === "" ||
    mahasiswa?.status === "" ||
    mahasiswa?.photo === "" ||
    mahasiswa?.dosenWaliNIP === ""
  ) {
    Swal.fire({
      title: "Unauthorized",
      text: "Anda Belum Melengkapi Data Anda",
      icon: "error",
    });
    return (
      <Navigate
        to="/dashboardmahasiswa/profil"
        state={{ from: location }}
        replace
      />
    );
  }

  return children;
};

export default ProtectRouteKelengkapanDataMahasiswa;
