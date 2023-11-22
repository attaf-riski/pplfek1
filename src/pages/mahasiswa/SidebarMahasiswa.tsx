import React, { FC } from "react";
import { Link } from "react-router-dom";
import AuthUser from "../../helpers/AuthUser";

interface SidebarMahasiswaAttributes {
  name: string;
  photo?: string | null;
}

const SidebarMahasiswa: FC<SidebarMahasiswaAttributes> = ({ name, photo }) => {
  const user = AuthUser.GetAuth();
  return (
    <aside className="flex flex-col w-64 h-screen px-4 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
      <div className="flex flex-col items-center mt-6 -mx-2">
        <img
          className="object-cover w-24 h-24 mx-2 rounded-full"
          src={photo ?? "/images/orang.png"}
          alt="avatar"
        />
        <h4 className="mx-2 mt-2 font-medium text-gray-800 dark:text-gray-200">
          Hai,
        </h4>
        <p className="mx-2 mt-1 text-sm font-medium text-gray-600 dark:text-gray-400">
          {name}
        </p>
      </div>

      <div className="flex flex-col justify-between flex-1 mt-6">
        <nav>
          <Link
            to="/dashboardmahasiswa/profil"
            className="flex items-center px-4 py-2 mt-4 text-gray-700 bg-gray-100 rounded-lg dark:bg-gray-800 dark:text-gray-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>

            <span className="mx-4 font-medium">Profil</span>
          </Link>
          <Link
            to="/dashboardmahasiswa/irs"
            className="flex items-center px-4 py-2 mt-4 text-gray-700 bg-gray-100 rounded-lg dark:bg-gray-800 dark:text-gray-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>

            <span className="mx-4 font-medium">IRS</span>
          </Link>
          <Link
            to="/dashboardmahasiswa/khs"
            className="flex items-center px-4 py-2 mt-4 text-gray-700 bg-gray-100 rounded-lg dark:bg-gray-800 dark:text-gray-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>

            <span className="mx-4 font-medium">KHS</span>
          </Link>
          <Link
            to="/dashboardmahasiswa/pkl"
            className="flex items-center px-4 py-2 mt-4 text-gray-700 bg-gray-100 rounded-lg dark:bg-gray-800 dark:text-gray-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>

            <span className="mx-4 font-medium">PKL</span>
          </Link>
          <Link
            to="/dashboardmahasiswa/skripsi"
            className="flex items-center px-4 py-2 mt-4 text-gray-700 bg-gray-100 rounded-lg dark:bg-gray-800 dark:text-gray-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>

            <span className="mx-4 font-medium">Skripsi</span>
          </Link>

          {/* Tambahkan link-link lain sesuai kebutuhan */}
        </nav>
      </div>
    </aside>
  );
};

export default SidebarMahasiswa;
