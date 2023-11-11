import React from "react";
import { useState } from 'react';

// Buat component Functional untuk Navbar
function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleProfileClick = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="w-full flex justify-between items-center space-x-5 bg-[#162953] h-[78px]">
      <div className="flex items-center">
        <img src="/images/leaf.png" alt="" className="w-[36px] h-[36px] ml-4" />
        <p className="font-poppins text-white text-3xl font-bold ml-3">MonitorinQ</p>
      </div>
      <div className="flex items-center space-x-3">
        <p className="text-white mr-2">Selamat Datang, [Nama Pengguna]</p>
        <div className="relative">
          <img
            src="/images/leaf.png"
            alt="Foto Profil"
            className="w-[40px] h-[40px] rounded-full cursor-pointer mr-8"
            onClick={handleProfileClick}
          />
          {showDropdown && (
            <div className="absolute top-10 right-0 bg-white shadow-md rounded-md py-2">
              <ul>
                <li className="cursor-pointer px-4 py-2 hover:bg-gray-100">
                  <a href="#">Logout</a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>

    
  );
}

export default Navbar;
