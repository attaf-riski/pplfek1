import DataDepartemen from "../inteface/DepartemenInterface";

const GetDepartemen = (): DataDepartemen | null => {
  const DepartemenString = localStorage.getItem("ps");

  if (DepartemenString) {
    const Departemen: DataDepartemen = JSON.parse(DepartemenString);

    return Departemen;
  }

  return null;
};
const SetDepartemen = (data: DataDepartemen) => {
  const DepartemenString = JSON.stringify(data);

  localStorage.setItem("ps", DepartemenString);
};

const RemoveDepartemen = () => {
  const DepartemenString = localStorage.getItem("ps");
  if (DepartemenString) {
    localStorage.removeItem("ps");
  }
};

export default { GetDepartemen, SetDepartemen, RemoveDepartemen };
