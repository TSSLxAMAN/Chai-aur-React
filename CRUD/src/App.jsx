import React from 'react';
import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router';
import Layout from './components/Layout';
import Home from "./components/Home/Home";
import About from "./components/About/About"
import Contact from './components/Contact/Contact';
import AddEmp from './components/AddEmp';
import EditEmp from './components/EditEmp';

function App() {
  const router = createBrowserRouter(
    [
      { 
        path:'/',
        element:<Layout/>,
        children:[
          {
            path:'',
            element:<Home/>,
          },
          {
            path:'about',
            element:<About/>,
          },
          {
            path:'contact',
            element:<Contact/>,
          },
          {
            path:'addEmp',
            element:<AddEmp/>,
          },
          {
            path:'editEmp',
            element:<EditEmp/>,
          },
        ]
      }
    ]
  )
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
