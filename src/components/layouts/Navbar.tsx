import React from "react";

const Navbar = () => {
  return (
    <div className="w-full flex justify-center items-center space-x-5 bg-[#162953] h-[78px]">
      <img src="/images/leaf.png" alt="" className="w-[36px] h-[36px]" />
      <p className="font-poppins text-white text-3xl font-bold">MonitorinQ</p>
    </div>
  );
};

export default Navbar;
