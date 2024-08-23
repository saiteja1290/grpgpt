"use client";

import { useEffect, useState } from "react";

export default function ChatMessages({ roomId }) {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
            const response = await fetch(`/api/chat?roomId=${roomId}`);
            const data = await response.json();
            setMessages(data.messages);
        };

        fetchMessages();

        // Set up polling for new messages every 2 seconds
        const intervalId = setInterval(fetchMessages, 2000);

        return () => clearInterval(intervalId);
    }, [roomId]);

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