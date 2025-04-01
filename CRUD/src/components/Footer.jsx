import React from 'react'
import { useSelector } from 'react-redux'           
const Footer = () => {
  const setNavTheme = useSelector(state => state.theme.navBarBgColor)

    return (
        <footer className={`${setNavTheme} py-4`}>
            <div className="container mx-auto text-center">
                <p className="text-sm text-white">
                    © {new Date().getFullYear()} MyApp. All rights reserved.
                </p>
            </div>
        </footer>
    )
}

export default Footer   