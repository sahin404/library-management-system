import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Home/Navbar/Navbar'
import Footer from '../Home/Footer/Footer'

const Layout = () => {
    return (
        <div>
            <Outlet />
            <Footer />
        </div>
    )
}

export default Layout