import React from "react";
import { useState } from "react";
import Http from "../../helpers/Fetch";
import AuthUser from "../../helpers/AuthUser";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

// Buat component Functional untuk Navbar
function Navbar({ name }: { name: string }, props: any) {
  const navigate = useNavigate();
  const user = AuthUser.GetAuth();

  // Buat component Functional untuk Navbar
  const [showDropdown, setShowDropdown] = useState(false);

  const handleProfileClick = () => {
    setShowDropdown(!showDropdown);
  };

  const logout = async () => {
    const result = await Http.get("/user/logout", {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${user?.token}`,
        "Content-Type": "application/json",
      },
    });

    if (result.status === 200) {
      Swal.fire({
        title: "Berhasil",
        text: "Anda Berhasil Logout",
        icon: "success",
      });
      AuthUser.RemoveAuth();
      navigate("/auth/login");
    }
  };

  return (
    <div className="w-full flex justify-between items-center space-x-5 bg-[#162953] h-[78px]">
      <div className="flex items-center">
        <img src="/images/leaf.png" alt="" className="w-[36px] h-[36px] ml-4" />
        <p className="font-poppins text-white text-3xl font-bold ml-3">
          MonitorinQ
        </p>
      </div>
      <div className="flex items-center space-x-3">
        <p className="text-white mr-2">Selamat Datang, {user?.username}</p>
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
                  <button onClick={logout}>Logout</button>
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
