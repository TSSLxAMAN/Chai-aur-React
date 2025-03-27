import React, { useState, useEffect } from "react";
import { NavLink } from "react-router"; // Fix import
import Logo from "../assets/images/Logo.png"
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest("#mobile-menu") && !event.target.closest("#menu-button")) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMenuOpen]);

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="text-lg font-bold">
          <NavLink to="/" className="font-semibold hover:text-gray-200 flex">
            <img src={Logo} alt="" height={25} width={25} className="mx-2" />
            Employee Management System
          </NavLink>
        </div>

        {/* Hamburger Menu Button (Mobile) */}
        <button
          id="menu-button"
          className="block md:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
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
        </button>

        {/* Mobile Menu (Sliding from Right) */}
        <div
          id="mobile-menu"
          className={`fixed top-0 right-0 w-2/3 h-full bg-gray-900 text-white shadow-lg transition-transform transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"
            } md:hidden`}
          style={{ transition: "transform 1.3s ease-in-out duration-300" }}
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-white"
            onClick={() => setIsMenuOpen(false)}
          >
            ✖
          </button>

          {/* Links */}
          <div className="flex flex-col items-center mt-16 space-y-4">
            <NavLink to="/" className="p-3 text-lg font-semibold" onClick={() => setIsMenuOpen(false)}>Home</NavLink>
            <NavLink to="/addEmp" className="p-3 text-lg font-semibold" onClick={() => setIsMenuOpen(false)}>Add Employee</NavLink>
            <NavLink to="/editEmp" className="p-3 text-lg font-semibold" onClick={() => setIsMenuOpen(false)}>Edit Employee</NavLink>
            <NavLink to="/about" className="p-3 text-lg font-semibold" onClick={() => setIsMenuOpen(false)}>About</NavLink>
            <NavLink to="/contact" className="p-3 text-lg font-semibold" onClick={() => setIsMenuOpen(false)}>Contact Us</NavLink>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `p-2 font-semibold rounded ${isActive ? "bg-gray-300 text-gray-900" : "hover:bg-gray-300 hover:text-gray-900"}`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/addEmp"
            className={({ isActive }) =>
              `p-2 font-semibold rounded ${isActive ? "bg-gray-300 text-gray-900" : "hover:bg-gray-300 hover:text-gray-900"}`
            }
          >
            Add Employee
          </NavLink>

          <NavLink
            to="/editEmp"
            className={({ isActive }) =>
              `p-2 font-semibold rounded ${isActive ? "bg-gray-300 text-gray-900" : "hover:bg-gray-300 hover:text-gray-900"}`
            }
          >
            Edit Employee
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `p-2 font-semibold rounded ${isActive ? "bg-gray-300 text-gray-900" : "hover:bg-gray-300 hover:text-gray-900"}`
            }
          >
            About
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `p-2 font-semibold rounded ${isActive ? "bg-gray-300 text-gray-900" : "hover:bg-gray-300 hover:text-gray-900"}`
            }
          >
            Contact Us
          </NavLink>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
