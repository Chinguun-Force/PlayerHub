"use client";

import React from 'react';
import { useThemeStore } from '../store/themeStore';
import { motion } from 'framer-motion';

const DarkModeToggle = () => {
  const darkMode = useThemeStore((state) => state.darkMode);
  const toggleDarkMode = useThemeStore((state) => state.toggleDarkMode);

  React.useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(darkMode ? 'light' : 'dark');
    root.classList.add(darkMode ? 'dark' : 'light');
  }, [darkMode]);

   return (
    <div className='border border-gray-300 dark:border-gray-700 rounded-full p-1 transition-colors duration-300 flex items-center justify-center w-10 h-6'>
        <button
            className="toggle-container"
            style={{
                ...container,
                justifyContent: "flex-" + (darkMode ? "start" : "end"),
            }}
            onClick={toggleDarkMode}
        >
            <motion.div
                className="toggle-handle"
                style={handle(darkMode)}
                layout
                transition={{
                    type: "spring",
                    visualDuration: 0.4,
                    bounce: 0.3,
                }}
            />
        </button>
    </div>
    )
};
const container = {
    width: "100%",
    height: "100%",
    backgroundColor: "var(--hue-3-transparent)",
    borderRadius: 50,
    cursor: "pointer",
    display: "flex",
}

const handle = (darkMode: boolean) => ({
    width: "50%",
    height: "100%",
    backgroundColor: darkMode ? "#fff" : "#050505ff",
    borderRadius: "100%",
});

export default DarkModeToggle;