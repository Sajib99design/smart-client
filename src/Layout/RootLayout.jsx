import React from 'react'
import Navbar from './../component/Navbar';
import { Outlet } from 'react-router';
import Footer from '../component/Footer';

function RootLayout() {
    return (
        <div className='max-w-[1440px] mx-auto'>
            <Navbar> </Navbar>
            <Outlet> </Outlet>
            <Footer></Footer>
        </div>
    )
}

export default RootLayout
