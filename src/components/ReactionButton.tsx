import React, { useState } from 'react';

const ReactionButtons = () => {
    const [likes, setLikes] = useState(0);
    const [trending, setTrending] = useState(0);

    return (
        <div className="flex justify-around mt-6">
            <button
                className="flex items-center gap-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all"
                onClick={() => setTrending(trending + 1)}
            >
                🔥 Trending <span className="font-bold">{trending}</span>
            </button>

            <button
                className="flex items-center gap-2 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-all"
                onClick={() => setLikes(likes + 1)}
            >
                👍 Like <span className="font-bold">{likes}</span>
            </button>
        </div>
    );
};

export default ReactionButtons;
