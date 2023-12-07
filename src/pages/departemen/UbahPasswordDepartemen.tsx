import Navbar from "../../components/layouts/Navbar";
import { UbahPassword } from "../auth";

import LokalDepartemen from "../../helpers/LokalDepartemen";
import { SidebarDepPage } from ".";

const UbahPasswordDepartemen = () => {
  const departemen = LokalDepartemen.GetDepartemen();

  return (
    <>
      <Navbar></Navbar>
      <div className="w-full flex h-screen">
        <SidebarDepPage name={departemen?.nama || ""} />
        <div className="flex-1 flex flex-col p-4">
          <h1 className="text-4xl font-bold">Ubah Password</h1>
          <UbahPassword></UbahPassword>
        </div>
      </div>
      ;
    </>
  );
};

export default UbahPasswordDepartemen;
