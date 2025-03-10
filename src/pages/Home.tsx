import React from "react";
import { Link } from "react-router-dom";
import DarkModeToggle from "../components/DarkMode";

export default function Home() {
  return (
    <div className="min-h-screen  flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 opacity-50 animate-pulse"></div>

      {/* Main Content */}
      <div className="bg-white p-12 rounded-3xl shadow-2xl text-center max-w-md z-10 relative">
        {/* Dark Mode Toggle */}
        <div className="absolute top-4 right-4">
          <DarkModeToggle />
        </div>

        {/* Welcome Title */}
        <h1 className="text-5xl font-extrabold text-gray-800 mb-6">
          Welcome to <span className="text-blue-500">VanishVote</span>
        </h1>

        {/* Description Text */}
        <p className="text-lg text-gray-600 mb-8">
          Create polls, share them, and watch the results unfold in real-time. No sign-up required!
        </p>

        {/* Button */}
        <Link
          to="/create"
          className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-full shadow-xl transform transition duration-300 hover:scale-105"
        >
          Create a New Poll
        </Link>
      </div>

      {/* Floating Animation */}
      <div className="absolute bottom-12 right-12 animate-bounce text-white text-4xl">
        🎉
      </div>
    </div>
  );
}
