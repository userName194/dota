"use client";
import Header from "../components/Header/Header"
import Main from "../components/Main/Main"
import Footer from "../components/Footer/Footer"
import "../../public/styles/reset.css"
import "../../public/styles/common.css"
import React, { useEffect } from 'react';

export default function Index() {
    useEffect(() => {
        const handleContextMenu = (event) => {
            event.preventDefault();
        };
        document.addEventListener('contextmenu', handleContextMenu);

        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
        };
    }, []);
    return (
        <>
            <Header />
            <Main />
            <Footer />
        </>
    )
}