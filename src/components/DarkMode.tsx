import React, { useState, useEffect } from 'react';

const DarkModeToggle = () => {
    const [darkMode, setDarkMode] = useState(false);

    // On component mount, read from localStorage or use system default
    useEffect(() => {
        const storedMode = localStorage.getItem('theme');
        if (storedMode) {
            setDarkMode(storedMode === 'dark');
        } else {
            const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setDarkMode(systemPrefersDark);
        }
    }, []);

    // Apply the dark mode class to <html> tag whenever darkMode changes
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    // Toggle the darkMode state
    const toggleDarkMode = () => setDarkMode(!darkMode);

    return (
        <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-all"
        >
            {darkMode ? '🌙' : '🌞'}
        </button>
    );
};

export default DarkModeToggle;
