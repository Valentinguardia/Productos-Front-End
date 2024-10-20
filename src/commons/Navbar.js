"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import CreateItemModal from "./createItemModal";
import { logoutUser } from "@/services/userData";
import { set } from "@/state/userState";

const Navbar = ({ brands }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      dispatch(set({ isLoggedIn: false }));
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <nav className="bg-custom-white fixed top-0 w-full z-50 h-[65px]">
      <div className="hidden sm:flex justify-between items-center px-4 py-5 mx-auto max-w-screen-xl">
        <div className="flex space-x-12">
          <Link href="/">
            <p className="hover:text-blue-400">Productos</p>
          </Link>
          <Link href="/brands">
            <p className="hover:text-blue-400">Marcas</p>
          </Link>
        </div>

        <div className="flex space-x-6 items-center">
          {user.isLoggedIn ? (
            <>
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded"
                onClick={handleOpenModal}
              >
                +
              </button>
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/login">
              <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>

      <div className="sm:hidden flex justify-between items-center px-4 py-5">
        <button onClick={toggleMenu} className="focus:outline-none">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <div className="sm:hidden bg-custom-white py-2">
          <Link href="/">
            <p className="block px-4 py-2 hover:text-blue-400">Productos</p>
          </Link>
          <Link href="/brands">
            <p className="block px-4 py-2 hover:text-blue-400">Marcas</p>
          </Link>
          {user.isLoggedIn ? (
            <>
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded block w-full text-left mt-2"
                onClick={handleOpenModal}
              >
                Agregar +
              </button>
              <p
                className="hover:text-blue-400 block w-full text-left mt-2 ml-4"
                onClick={handleLogout}
              >
                Logout
              </p>
            </>
          ) : (
            <Link href="/login">
              <p className="hover:text-blue-400 block w-full text-left mt-2 ml-4">
                Login
              </p>
            </Link>
          )}
        </div>
      )}

      {isModalOpen && (
        <CreateItemModal onClose={handleCloseModal} brands={brands} />
      )}
    </nav>
  );
};

export default Navbar;
