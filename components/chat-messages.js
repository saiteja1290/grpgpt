"use client";

import { useEffect, useState, useCallback } from "react";

export default function ChatMessages({ roomId }) {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchMessages = useCallback(async () => {
        try {
            const response = await fetch(`/api/chat?roomId=${roomId}`);
            const data = await response.json();
            setMessages(data.messages);
        } catch (error) {
            console.error("Error fetching messages:", error);
        } finally {
            setLoading(false);
        }
    }, [roomId]);

    useEffect(() => {
        fetchMessages();

        // Set up polling for new messages every 30 seconds
        const intervalId = setInterval(fetchMessages, 30000);

        return () => clearInterval(intervalId);
    }, [roomId, fetchMessages]);

    // Function to add new messages without fetching all messages
    const addNewMessage = useCallback((newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
    }, []);

    if (loading) {
        return <div>Loading messages...</div>;
    }

    return (
        <div className="space-y-4">
            {messages.map((message) => (
                <div key={message.id} className="bg-gray-100 p-4 rounded-lg">
                    <p className="font-bold">{message.sender}</p>
                    <p>{message.content}</p>
                    <p className="text-sm text-gray-500">
                        {new Date(message.timestamp).toLocaleString()}
                    </p>
                </div>
            ))}
        </div>
    );
}