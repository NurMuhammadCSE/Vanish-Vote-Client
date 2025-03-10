import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-md">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          Welcome to <span className="text-blue-500">VanishVote</span>
        </h1>
        <p className="text-gray-500 mb-6">
          Create polls, share them, and watch the results unfold in real-time. No sign-up required!
        </p>
        <Link
          to="/create"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300"
        >
          Create a New Poll
        </Link>
      </div>
    </div>
  );
}
