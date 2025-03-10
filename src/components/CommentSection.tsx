import React, { useState, useEffect } from "react";

interface Comment {
    text: string;
    createdAt?: string; // Optional, for displaying when the comment was made
}

const CommentSection = ({ pollId }: { pollId: string }) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [commentText, setCommentText] = useState("");

    // Fetch comments on pollId change
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch(
                    `https://vanish-vote-server.vercel.app/api/polls/${pollId}/comments`
                );
                if (response.ok) {
                    const data = await response.json();
                    setComments(data);
                } else {
                    console.error("Error fetching comments");
                }
            } catch (error) {
                console.error("Error fetching comments", error);
            }
        };
        fetchComments();
    }, [pollId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!commentText.trim()) return;

        try {
            const response = await fetch(
                `https://vanish-vote-server.vercel.app/api/polls/${pollId}/comment`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ text: commentText }),
                }
            );

            if (response.ok) {
                const newComment = { text: commentText };
                setComments((prevComments) => [...prevComments, newComment]);
                setCommentText("");
            } else {
                console.error("Error posting comment");
            }
        } catch (error) {
            console.error("Error posting comment", error);
        }
    };

    return (
        <div className="mt-6">
            <h2 className="text-lg font-semibold mb-3">Comments</h2>
            <div className="space-y-4">
                {comments.map((comment, index) => (
                    <div key={index} className="p-4 border rounded-md bg-gray-50">
                        <p>{comment.text}</p>
                        {comment.createdAt && (
                            <small className="text-gray-500">{new Date(comment.createdAt).toLocaleString()}</small>
                        )}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="mt-4 flex items-center space-x-2">
                <textarea
                    className="w-full p-2 border rounded-md"
                    rows={2}
                    placeholder="Write a comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                />
                <button type="submit" className="bg-blue-500 cursor-pointer text-white p-2 rounded-md">
                    Post Comment
                </button>
            </form>
        </div>
    );
};

export default CommentSection;
