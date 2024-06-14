import Header from "../components/Header/Header";
import Main from "../components/Main/Main";
import Footer from "../components/Footer/Footer";
import "../../public/styles/reset.css";
import "../../public/styles/common.css";

export default function Index() {

    return (
        <>
            <Header />
            <Main />
            <Footer />
        </>
    )
}


/*
import React, { useEffect } from 'react';

    useEffect(() => {
        const handleContextMenu = (event) => {
            event.preventDefault();
        };
        document.addEventListener('contextmenu', handleContextMenu);

        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
        };
    }, []);

*/