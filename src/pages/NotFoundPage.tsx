import React, { FC } from "react";

const NotFoundPage: FC = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-10">
      <img src="/images/logo.png" alt="" className="w-[100px]" />
      <h1 className="text-3xl font-bold">404 - Coming Sooooon...</h1>
    </div>
  );
};

export default NotFoundPage;
