// import React from 'react';
// import {Link} from 'react-router';
// function Header() {
//   return (
//     <nav className='text-white bg-blue-600 flex justify-between px-32 h-18 items-center  '>
//       <div className='brand_logo'>
//       <span className=' text-3xl font-semibold'> Smart Expenses</span>
//       </div>
//       <div className='flex gap-5 items-center'>
//         <ul className='flex gap-5 hover:cursor-pointer'>
//           <li className="hover:bg-green-500 bg-black  rounded-lg px-3 py-1">
//             <Link to={"/dashboard"}>Dashboard</Link>
//           </li>
          
//             <li className="hover:bg-green-500 bg-black rounded-lg  px-3 py-1">
//             <Link to={"/category"}>Categories</Link>
//           </li> 
//           <li className="hover:bg-green-500 bg-black rounded-lg px-3 py-1">
//             <Link to={"/setting"}> Setting</Link> 
//           </li>
//           <li className="bg-green-400  rounded-lg px-3 py-1">
//             <Link to={"/sign-up"}> Signup</Link> 
//           </li>
          
//            <li className="bg-red-600 rounded-lg px-3 py-1">
//             <Link to={"/login"}> Login</Link>
//           </li> 
//         </ul>
      
//       </div>
//     </nav>
//   )
// }

// export default Header



// new one

import React from "react";
import { Link, useNavigate } from "react-router";
import { useAuthContext } from "../context/AuthContext";

function Header() {
  const { user,  logoutUser } = useAuthContext();
   useNavigate();
  const displayName=user?.username || "Guest";
  const initial =displayName?.charAt(0)?.toUpperCase()||"G";
  return (
    <header className="bg-white  shadow-md fixed w-full top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand Name */}
          <div className="flex-shrink-0 text-xl font-semibold text-gray-800">
            <Link to={"/"}> ExpenseMate</Link>
          </div>

          {/* Menu Links */}
          <nav className="hidden md:flex space-x-50">
            <Link
              href="#"
              to={"/dashboard"}
              className="text-gray-600 hover:text-gray-900 transition"
            >
              Dashboard
            </Link>
           
            {/* <a
              href="#"
              className="text-gray-600 hover:text-gray-900 transition"
            >
              Reports
            </a> */}
            {/* <a
              href="#"
              className="text-gray-600 hover:text-gray-900 transition"
            >
              Categories
            </a> */}
            <a
              href="#"
              className="text-gray-600 hover:text-gray-900 transition"
            >
              Settings
            </a>
          </nav>

          {/* Auth Buttons */}
          {!user ? (
            <div className="flex space-x-4">
              <button className="text-gray-600 hover:text-gray-900 transition">
                <Link to={"/login"}> Login</Link>
              </button>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">
                <Link to={"/sign-up"}> Singup</Link>
              </button>
            </div>
          ): (
                        <div className="flex items-center gap-3">
                            <div className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1.5 ring-1 ring-gray-200">
                                <div className="h-7 w-7 rounded-full bg-indigo-600 text-white grid place-items-center text-xs font-bold">
                                    {initial}
                                </div>
                                <span className="text-sm font-medium text-gray-800 max-w-[10rem] truncate">
                                    {displayName}
                                </span>
                            </div>
                            <button className="px-3 py-2 rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition">
                                <Link
                                    onClick={(e) => {
                                        logoutUser();
                                    }}
                                    to={"#"}
                                >
                                    Logout
                                </Link>
                            </button>
                        </div>
                    )}










          
        </div>
      </div>
    </header>
  );
}

export default Header;