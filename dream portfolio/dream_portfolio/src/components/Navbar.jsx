import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
    <NavLink to="/">
      home
    </NavLink>
    <NavLink to="/fav">
      Fav
    </NavLink>
    </>
  )
}

export default Navbar