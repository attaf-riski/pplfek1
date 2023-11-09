import React, { FC } from "react";
import Logo from "../../assets/logo/logo.png";

const LoadingScreen: FC = () => {
  return (
    <div className=" w-screen h-screen flex flex-col justify-center items-center">
      <img src={Logo} alt="logo" className=" animate-bounce w-[200px]" />
      <p className="text-3xl">Loading...</p>
    </div>
  );
};

export default LoadingScreen;
