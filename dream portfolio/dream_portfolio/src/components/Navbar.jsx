import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Logo from '../assets/Logo.png'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-green-800/95 backdrop-blur-md px-6 py-3 flex justify-between items-center shadow-lg border-b border-green-700/50">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl overflow-hidden ring-2 ring-green-500/40 shadow-sm">
          <img src={Logo} alt="logo" loading="lazy" height={36} width={36} className="object-cover" />
        </div>
        <div className="flex flex-col leading-none">
          <h1 className="text-lg font-bold tracking-widest text-white uppercase">Dream Portfolio</h1>
          <span className="text-[10px] text-green-300 tracking-wider font-medium">Nifty 50 Simulator</span>
        </div>
      </div>
      <div className="hidden md:flex gap-2 ml-auto">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${isActive ? "bg-green-600 text-white shadow-sm" : "text-green-100 hover:bg-green-700 hover:text-white"}`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/fav"
          className={({ isActive }) =>
            `px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${isActive ? "bg-green-600 text-white shadow-sm" : "text-green-100 hover:bg-green-700 hover:text-white"}`
          }
        >
          Favourites
        </NavLink>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        <button
          id="menu-button"
          className="block md:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
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
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          ) : (
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
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          )}
        </button>
      </div>

      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="absolute top-full left-0 w-full flex flex-col gap-2 p-4 shadow-xl bg-green-800/97 backdrop-blur-md border-t border-green-700/50">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-5 py-3 rounded-lg text-sm font-semibold transition-all ${isActive ? "bg-green-600 text-white" : "text-green-100 hover:bg-green-700"}`
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/fav"
            className={({ isActive }) =>
              `px-5 py-3 rounded-lg text-sm font-semibold transition-all ${isActive ? "bg-green-600 text-white" : "text-green-100 hover:bg-green-700"}`
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Favourites
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;