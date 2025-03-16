import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./compnents/Home";
import Aboutus from "./compnents/Aboutus";
import Register from "./compnents/Register";
import Navbar from "./compnents/Navbar";
import Params from "./compnents/Params";
import Login from "./compnents/Login";
import Courses from "./compnents/Courses";
import { Children } from "react";
import Jee from "./compnents/Jee";
import Neet from "./compnents/Neet";
import Upsc from "./compnents/Upsc";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Navbar />
        <Home />
      </div>
    ),
  },
  {
    path: "/aboutus",
    element: (
      <div>
        <Navbar />
        <Aboutus />
      </div>
    ),
  },
  {
    path: "/register",
    element: (
      <div>
        <Navbar />
        <Register />
      </div>
    ),
  },
  {
    path: "/params/:id",
    element: (
      <div>
        <Navbar />
        <Params />
      </div>
    ),
  },
  {
    path: "/courses",
    element: (
      <div>
        <Navbar />
        <Courses />
      </div>
    ),
    children: [
      { path: "jee", element: <Jee /> },
      { path: "neet", element: <Neet /> },
      { path: "upsc", element: <Upsc /> },
    ],
  },
  {
    path: "/login",
    element: (
      <div>
        <Navbar />
        <Login />
      </div>
    ),
  },
  {
    path: "*",
    element: (
      <div>
        <Navbar />
        <h1>404 Page Not Found</h1>
      </div>
    ),
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
