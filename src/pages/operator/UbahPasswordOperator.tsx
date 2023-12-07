import Navbar from "../../components/layouts/Navbar";
import { UbahPassword } from "../auth";
import SidebarOp from "./SidebarOp";
import LokalOperator from "../../helpers/LokalOperator";

const UbahPasswordOperator = () => {
  const operator = LokalOperator.GetOperator();

  return (
    <>
      <Navbar></Navbar>
      <div className="w-full flex h-screen">
        <SidebarOp name={operator?.nama || ""} />
        <div className="flex-1 flex flex-col p-4">
          <h1 className="text-4xl font-bold">Ubah Password</h1>
          <UbahPassword></UbahPassword>
        </div>
      </div>
      ;
    </>
  );
};

export default UbahPasswordOperator;
