import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactionButtons from './ReactionButton';

const PollDetails = () => {
    const { id } = useParams();
    interface PollOption {
        text: string;
        votes: number;
    }

    interface Poll {
        question: string;
        options: PollOption[];
        resultsHidden: boolean;
        _id: string;
    }

    const [poll, setPoll] = useState<Poll | null>(null);
    const [selectedOption, setSelectedOption] = useState('');
    const [hasVoted, setHasVoted] = useState(false);
    const [resultsHidden, setResultsHidden] = useState(true);

    useEffect(() => {
        // Fetch poll data from the server
        const fetchPoll = async () => {
            const response = await fetch(`http://localhost:5000/api/polls/${id}`);
            const data = await response.json();
            setPoll(data);
        };

        fetchPoll();
    }, [id]);

    // const handleVote = () => {
    //     if (!selectedOption) return alert('Please select an option to vote!');
        
    //     setHasVoted(true);
    //     alert(`You voted for: ${selectedOption}`);

    //     // Here, you would typically send the vote to the server to update the poll data.
    // };

    const handleVote = () => {
        if (!selectedOption) return alert('Please select an option to vote!');
        
        setHasVoted(true);
        alert(`You voted for: ${selectedOption}`);
    
        // Send the vote to the backend
        fetch(`http://localhost:5000/api/polls/${id}/vote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ selectedOption })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log("Vote successful!");
            }
        })
        .catch(error => {
            console.error("Error voting:", error);
        });
    };
    

    const toggleResults = () => {
        setResultsHidden(!resultsHidden);
    };

    if (!poll) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full">
                <h1 className="text-3xl font-bold text-blue-600 text-center mb-4">{poll.question}</h1>

                {/* Poll Options */}
                <div className="space-y-2">
                    {poll.options.map((option, idx) => (
                        <label
                            key={idx}
                            className={`block p-3 border rounded-lg cursor-pointer ${
                                selectedOption === option.text ? 'bg-blue-500 text-white' : 'bg-gray-100'
                            }`}
                        >
                            <input
                                type="radio"
                                name="poll-option"
                                value={option.text}
                                checked={selectedOption === option.text}
                                onChange={() => setSelectedOption(option.text)}
                                className="hidden"
                            />
                            {option.text}
                        </label>
                    ))}
                </div>

                {/* Vote Button */}
                {!hasVoted && (
                    <button
                        onClick={handleVote}
                        className="w-full bg-green-500 text-white py-3 rounded-lg mt-4 hover:bg-green-600 transition-all"
                    >
                        🗳️ Submit Vote
                    </button>
                )}

                {/* Results Section */}
                {hasVoted && (
                    <div className="mt-6 text-center">
                        {poll.resultsHidden && resultsHidden ? (
                            <p className="text-gray-500 italic">Results are hidden until the poll ends.</p>
                        ) : (
                            <div>
                                <h2 className="text-xl font-bold mb-2">Results</h2>
                                {poll.options.map((option, idx) => (
                                    <p key={idx}>
                                        {option.text}: {option.votes} votes
                                    </p>
                                ))}
                            </div>
                        )}
                        {/* Button to toggle results visibility */}
                        <button
                            onClick={toggleResults}
                            className="mt-4 text-blue-500"
                        >
                            {resultsHidden ? 'Show Results' : 'Hide Results'}
                        </button>
                    </div>
                )}

                {/* Reaction Buttons */}
                <ReactionButtons />
            </div>
        </div>
    );
};

export default PollDetails;
