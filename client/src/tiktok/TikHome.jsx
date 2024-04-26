import React from 'react'
import logo from '../assets/logo.png'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Content from './components/Content'
const TikHome = () => {
    return (
        <>
            <Header />
            <div className="flex">
                <Sidebar />
                <Content />
            </div>
        </>
    )
}

export default TikHome
