import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactionButtons from './ReactionButton';
import CommentSection from './CommentSection';
import Swal from 'sweetalert2';

const PollDetails = () => {
    const { id } = useParams<{ id: string }>();

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
        const fetchPoll = async () => {
            try {
                const response = await fetch(`https://vanish-vote-server.vercel.app/api/polls/${id}`);
                const data = await response.json();
                setPoll(data);
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Failed to fetch poll data!',
                });
            }
        };

        fetchPoll();
    }, [id]);

    const handleVote = () => {
        if (!selectedOption) {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Please select an option before voting!',
            });
            return;
        }

        Swal.fire({
            position: "center",
            icon: "success",
            title: `You voted for: ${selectedOption}`,
            showConfirmButton: false,
            timer: 1500
        });

        setHasVoted(true);

        fetch(`https://vanish-vote-server.vercel.app/api/polls/${id}/vote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ selectedOption })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Swal.fire({
                    //     icon: 'success',
                    //     title: 'Vote Successful!',
                    //     text: `Your vote for "${selectedOption}" has been recorded.`,
                    // });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Failed to submit your vote. Please try again.',
                    });
                }
            })
            .catch(() => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong! Please try again later.',
                });
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
                            className={`block p-3 border rounded-lg cursor-pointer 
                            ${selectedOption === option.text ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
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
                        className="w-full cursor-pointer bg-green-500 text-white py-3 rounded-lg mt-4 hover:bg-green-600 transition-all"
                    >
                        🗳️ Submit Vote
                    </button>
                )}

                {/* Results Section */}
                {hasVoted && (
                    <div className="mt-6 text-center">
                        {poll.resultsHidden && resultsHidden ? (
                            <p className="text-gray-500 italic">
                                Results are hidden until the poll ends.
                            </p>
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
                <CommentSection pollId={id ?? ''} />
            </div>
        </div>
    );
};

export default PollDetails;
