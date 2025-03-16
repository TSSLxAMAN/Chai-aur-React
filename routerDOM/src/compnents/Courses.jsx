import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import "../courses.css";
import "../navbar.css";
const Courses = () => {
  return (
    <div className="courses">
      <h1>Courses</h1>
      <ul>
        <li>
          <NavLink
            to={"/courses/jee"}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Jee
          </NavLink>
        </li>
        <br />
        <li>
          <NavLink
            to={"/courses/neet"}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Neet
          </NavLink>
        </li>
        <br />
        <li>
          <NavLink
            to={"/courses/upsc"}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            UPSC
          </NavLink>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};

export default Courses;
