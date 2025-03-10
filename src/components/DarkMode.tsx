import React, { useState } from 'react';

const DarkModeToggle = () => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        if (darkMode) {
            document.documentElement.classList.remove('dark');
        } else {
            document.documentElement.classList.add('dark');
        }
    };

    return (
        <button
            onClick={toggleDarkMode}
            className="bg-blue-500 text-white p-2 rounded-md"
        >
            {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
        </button>
    );
};

export default DarkModeToggle;
