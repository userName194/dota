"use client";
import { useEffect } from 'react';

export function CommonJS() {
    // Отключение контекстного меню
    useEffect(() => {
        const handleContextMenu = (event) => {
            event.preventDefault();
        };
        document.addEventListener('contextmenu', handleContextMenu);
        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
        };
    }, []);

    return null
}


