import React, { useState, useEffect } from "react";
import { Navigate, NavLink, useNavigate } from "react-router"; // Fix import
import Logo from "../assets/images/Logo.png"
import ThemeButton from "./ThemeButton";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/loginSlice";


const Navbar = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const setNavTheme = useSelector(state => state.theme.navBarBgColor)
  const setNavTextTheme = useSelector(state => state.theme.navBarTextColor)
  const setnavBarSelectedBtnColor = useSelector(state => state.theme.navBarSelectedBtnColor)
  const setnavBarSelectedBtnColorHover = useSelector(state => state.theme.navBarSelectedBtnColorHover)
  const isLogin = useSelector(state => state.user.userLogin)
  console.log(isLogin);
  const loggedInUser = useSelector((state) => state.user.userLogin);

  function handleLogout() {
    dispatch(logout())
    setTimeout(() => {
      navigate("/login");
    }, 0);
  }

  

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
    <nav className={`${setNavTheme} ${setNavTextTheme}`} >
      <div className=" mx-auto px-4 py-3 flex justify-between items-center">
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
            {
              isLogin &&
              (<NavLink
                to="/dashboard"
                className="p-3 text-lg font-semibold"
              >
                Dashboard
              </NavLink>
              )
            }

            {
              isLogin ?
                (<NavLink
                  to="/login"
                  className="p-3 text-lg font-semibold"
                  onClick={handleLogout}
                >
                  Logout
                </NavLink>)
                :
                (<NavLink
                  to="/login"
                  className="p-3 text-lg font-semibold"
                >
                  Login
                </NavLink>)

            }
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `p-2 font-semibold rounded ${isActive ? setnavBarSelectedBtnColor : setnavBarSelectedBtnColorHover}`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/addEmp"
            className={({ isActive }) =>
              `p-2 font-semibold rounded ${isActive ? setnavBarSelectedBtnColor : setnavBarSelectedBtnColorHover}`
            }
          >
            Add Employee
          </NavLink>

          <NavLink
            to="/editEmp"
            className={({ isActive }) =>
              `p-2 font-semibold rounded ${isActive ? setnavBarSelectedBtnColor : setnavBarSelectedBtnColorHover}`
            }
          >
            Edit Employee
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `p-2 font-semibold rounded ${isActive ? setnavBarSelectedBtnColor : setnavBarSelectedBtnColorHover}`
            }
          >
            About
          </NavLink>

          {
            isLogin &&
            (<NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `p-2 font-semibold rounded ${isActive ? setnavBarSelectedBtnColor : setnavBarSelectedBtnColorHover}`
              }
            >
              Dashboard
            </NavLink>
            )
          }

          {
            isLogin ?
              (<NavLink
                to="#"
                className={({ isActive }) =>
                  `p-2 font-semibold rounded ${isActive ? setnavBarSelectedBtnColor : setnavBarSelectedBtnColorHover}`
                }
                onClick={handleLogout}
              >
                Logout
              </NavLink>)
              :
              (<NavLink
                to="/login"
                className={({ isActive }) =>
                  `p-2 font-semibold rounded ${isActive ? setnavBarSelectedBtnColor : setnavBarSelectedBtnColorHover}`
                }
              >
                Login
              </NavLink>)

          }
          <div className='col-span-1 flex justify-center items-center'>
            <ThemeButton />
          </div>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
