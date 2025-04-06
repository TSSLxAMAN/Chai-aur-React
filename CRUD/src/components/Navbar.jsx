import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router"; // Fixed import
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
      <div className="mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="text-lg font-bold">
          <NavLink to="/" className="font-semibold hover:text-gray-200 flex items-center">
            <img src={Logo} alt="" height={25} width={25} className="mx-2" />
            Employee Management System
          </NavLink>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
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
          
          {/* Theme Button - Desktop */}
          <div className="ml-2">
            <ThemeButton />
          </div>
        </div>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center space-x-3">
          {/* Theme Button - Mobile */}
          <ThemeButton />
          
          {/* Hamburger Menu Button */}
          <button
            id="menu-button"
            className="text-white focus:outline-none"
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
        </div>
        
        {/* Mobile Menu (Sliding from Right) */}
        <div
          id="mobile-menu"
          className={`${setNavTheme} fixed top-0 right-0 w-2/3 h-full text-white shadow-lg transition-transform transform ${isMenuOpen ? "translate-x-0" : "translate-x-full "
            } md:hidden`}
          style={{ transition: "transform 0.3s ease-in-out" }}
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-white"
            onClick={() => setIsMenuOpen(false)}
          >
            ✖
          </button>

          {/* Links */}
          <div className={`flex flex-col items-center mt-16 space-y-4`}>
            <NavLink to="/" className="p-3 text-lg font-semibold" onClick={() => setIsMenuOpen(false)}>Home</NavLink>
            <NavLink to="/addEmp" className="p-3 text-lg font-semibold" onClick={() => setIsMenuOpen(false)}>Add Employee</NavLink>
            <NavLink to="/editEmp" className="p-3 text-lg font-semibold" onClick={() => setIsMenuOpen(false)}>Edit Employee</NavLink>
            <NavLink to="/about" className="p-3 text-lg font-semibold" onClick={() => setIsMenuOpen(false)}>About</NavLink>
            {
              isLogin &&
              (<NavLink
                to="/dashboard"
                className="p-3 text-lg font-semibold"
                onClick={() => setIsMenuOpen(false)}
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
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                >
                  Logout
                </NavLink>)
                :
                (<NavLink
                  to="/login"
                  className="p-3 text-lg font-semibold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </NavLink>)
            }
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;