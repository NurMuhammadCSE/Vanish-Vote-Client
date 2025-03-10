import React, { useState } from 'react';

const CreatePoll = () => {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['']);
    const [expiry, setExpiry] = useState('1h');

    const addOption = () => setOptions([...options, '']);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic to handle poll creation goes here
        console.log({ question, options, expiry });
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
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all"
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
                        className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-all"
                    >
                        🚀 Create Poll
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreatePoll;
