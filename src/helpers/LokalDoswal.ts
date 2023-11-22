import DataDoswal from "../inteface/DoswalInterface";

const GetDoswal = (): DataDoswal | null => {
  const doswalString = localStorage.getItem("ps");

  if (doswalString) {
    const doswal: DataDoswal = JSON.parse(doswalString);

    return doswal;
  }

  return null;
};
const SetDoswal = (data: DataDoswal) => {
  const doswalString = JSON.stringify(data);

  localStorage.setItem("ps", doswalString);
};

const RemoveDoswal = () => {
  const doswalString = localStorage.getItem("ps");
  if (doswalString) {
    localStorage.removeItem("ps");
  }
};

export default { GetDoswal, SetDoswal, RemoveDoswal };
