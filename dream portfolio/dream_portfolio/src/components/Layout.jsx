import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
    <div className="flex flex-col min-h-screen">
      <Navbar/>
      <main className="flex-1 container mx-auto p-4">
        <Outlet/>
      </main>
      <Footer/>
    </div>
    </>
  )
}

export default Layout   