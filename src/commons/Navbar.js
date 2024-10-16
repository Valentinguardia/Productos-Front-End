"use client"
import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux"; 

const Navbar = () => {
  //const user = useSelector((state) => state.user);

  return (
    <nav className="bg-custom-white fixed top-0 w-full z-50">
       <div className="pl-[8.3rem] py-5 flex justify-between items-center">
      <div className="flex space-x-4">
         <Link href="/">
          <p className="hover:text-blue-400">Productos</p>
        </Link>
        <Link href="/brands">
          <p className="hover:text-blue-400">Marcas</p>
        </Link> 
      </div>

      {/* <div className="flex space-x-4 items-center">
        {user && (
          <>
            
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              +
            </button>
 
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Logout
            </button>
          </>
        )}
        {!user && (

          <Link href="/login">
            <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Login
            </a>
          </Link>
        )}
      </div> */}
       </div>
    </nav>
  );
};

export default Navbar;




