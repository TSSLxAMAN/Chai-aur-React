import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet } from "react-router";
const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <header>
                <Navbar />
            </header>
            <main className="flex-grow">
                <Outlet />
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    )
}

export default Layout   