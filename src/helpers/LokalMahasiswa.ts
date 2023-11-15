import DataMahasiswa from "../inteface/MahasiswaInterface";

const GetMahasiswa = (): DataMahasiswa | null => {
  const mahasiswaString = localStorage.getItem("ps");

  if (mahasiswaString) {
    const mahasiswa: DataMahasiswa = JSON.parse(mahasiswaString);

    return mahasiswa;
  }

  return null;
};
const SetMahasiswa = (data: DataMahasiswa) => {
  const mahasiswaString = JSON.stringify(data);

  localStorage.setItem("ps", mahasiswaString);
};

const RemoveMahasiswa = () => {
  const mahasiswaString = localStorage.getItem("ps");
  if (mahasiswaString) {
    localStorage.removeItem("ps");
  }
};

export default { GetMahasiswa, SetMahasiswa, RemoveMahasiswa };
