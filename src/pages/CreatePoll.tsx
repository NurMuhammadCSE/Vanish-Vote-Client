import React, { useState } from 'react';
import axios from 'axios'; // Make sure to install axios for making HTTP requests

const CreatePoll = () => {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['']);
    const [expiry, setExpiry] = useState('1h');
    const [pollLink, setPollLink] = useState('');

    const addOption = () => setOptions([...options, '']);

    // Calculate expiration date based on selected expiry time
    const calculateExpiryDate = (expiryTime) => {
        const now = new Date();
        if (expiryTime === '1h') {
            now.setHours(now.getHours() + 1);
        } else if (expiryTime === '12h') {
            now.setHours(now.getHours() + 12);
        } else if (expiryTime === '24h') {
            now.setHours(now.getHours() + 24);
        }
        return now;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const expiryDate = calculateExpiryDate(expiry);

        try {
            const response = await axios.post('https://vanish-vote-server.vercel.app/api/polls/create', {
                question,
                options,
                expiresIn: expiry,
                expiresAt: expiryDate,
                resultsHidden: true, // Default value: hide results
            });

            // On successful poll creation, show the poll link
            setPollLink(`${window.location.origin}/poll/${response.data._id}`);
        } catch (error) {
            console.error('Error creating poll:', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full">
                <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
                    Create a New Poll
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Question Input */}
                    <input
                        type="text"
                        placeholder="Enter your poll question"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        className="w-full p-3 border border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {/* Poll Options */}
                    {options.map((option, idx) => (
                        <input
                            key={idx}
                            type="text"
                            placeholder={`Option ${idx + 1}`}
                            value={option}
                            onChange={(e) => {
                                const updatedOptions = [...options];
                                updatedOptions[idx] = e.target.value;
                                setOptions(updatedOptions);
                            }}
                            className="w-full p-3 border border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    ))}

                    {/* Add Option Button */}
                    <button
                        type="button"
                        onClick={addOption}
                        className="w-full cursor-pointer bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all"
                    >
                        ➕ Add Option
                    </button>

                    {/* Expiry Time Select */}
                    <select
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        className="w-full p-3 border border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="1h">Expires in 1 Hour</option>
                        <option value="12h">Expires in 12 Hours</option>
                        <option value="24h">Expires in 24 Hours</option>
                    </select>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full cursor-pointer bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-all"
                    >
                        🚀 Create Poll
                    </button>
                </form>

                {/* Display the Poll Link if created */}
                {pollLink && (
                    <div className="mt-6 text-center">
                        <h3 className="text-lg font-semibold text-green-600">Poll Created Successfully!</h3>
                        <p className="mt-2 text-sm text-gray-600">Share this link with others to participate:</p>
                        <a
                            href={pollLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 underline mt-2 block"
                        >
                            {pollLink}
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreatePoll;
