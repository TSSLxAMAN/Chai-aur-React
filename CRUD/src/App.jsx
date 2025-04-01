import React, { use } from 'react';
import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router';
import Layout from './components/Layout';
import Home from "./components/Home/Home";
import About from "./components/About/About"
import AddEmp from './components/AddEmp';
import EditEmp from './components/EditEmp';
import Login from './components/Login'
import Dashboard from './components/Dashboard';
import { useSelector } from 'react-redux';
import { toast } from "react-toastify";

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null)
  const empList = useSelector((state) => state.empData.data);

  function handleLogin(userCredential, navigate) {
    console.log(user);
    
    if (empList.find((emp) => emp.empName === userCredential.username && userCredential.password === "admin")) {
      localStorage.setItem("user", JSON.stringify(userCredential));
      setUser(userCredential)
      toast.success("Login successful!");
      navigate("/dashboard")
    } else {
      toast.warning("Invalid credentials");
    }
  };

  function handleLogout(navigate) {
    localStorage.removeItem("user");
    setUser(null);
    toast.success("Logged out successfully!");
    navigate("/login")
  }

  const router = createBrowserRouter(
    [
      {
        path: '/',
        element: <Layout />,
        children: [
          {
            path: '',
            element: <Home />,
          },
          {
            path: 'about',
            element: <About />,
          },
          {
            path: 'addEmp',
            element: <AddEmp />,
          },
          {
            path: 'editEmp',
            element: <EditEmp />,
          },
          {
            path: 'login',
            element: <Login />,
          },
          {
            path: 'dashboard',
            element: <Dashboard />,
          },
        ]
      }
    ]
  )
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
