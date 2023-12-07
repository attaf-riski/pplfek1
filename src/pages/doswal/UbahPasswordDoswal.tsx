import Navbar from "../../components/layouts/Navbar";
import { UbahPassword } from "../auth";
import SidebarDoswal from "./SidebarDoswal";
import LokalDoswal from "../../helpers/LokalDoswal";

const UbahPasswordDoswal = () => {
  const doswal = LokalDoswal.GetDoswal();

  return (
    <>
      <Navbar></Navbar>
      <div className="w-full flex h-screen">
        <SidebarDoswal name={doswal?.nama || ""} />
        <div className="flex-1 flex flex-col p-4">
          <h1 className="text-4xl font-bold">Ubah Password</h1>
          <UbahPassword></UbahPassword>
        </div>
      </div>
      ;
    </>
  );
};

export default UbahPasswordDoswal;
