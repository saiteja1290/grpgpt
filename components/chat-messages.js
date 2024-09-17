"use client";

import { useEffect, useState, useCallback } from "react";
import CodeBlock from "./codeblock";
const detectCodeBlock = (content) => {
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(content)) !== null) {
        if (match.index > lastIndex) {
            parts.push({ type: 'text', content: content.slice(lastIndex, match.index) });
        }
        parts.push({
            type: 'code',
            language: match[1] || 'javascript',
            content: match[2].trim()
        });
        lastIndex = match.index + match[0].length;
    }

    if (lastIndex < content.length) {
        parts.push({ type: 'text', content: content.slice(lastIndex) });
    }

    return parts;
};
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

        // Set up polling for new messages every 3 seconds
        const intervalId = setInterval(fetchMessages, 3000);

        return () => clearInterval(intervalId);
    }, [roomId, fetchMessages]);

    // Function to add new messages without fetching all messages
    const renderMessageContent = (content) => {
        const parts = detectCodeBlock(content);
        return parts.map((part, index) => {
            if (part.type === 'code') {
                return <CodeBlock key={index} language={part.language} code={part.content} />;
            }
            return <p key={index}>{part.content}</p>;
        });
    };

    if (loading) {
        return <div>Loading messages...</div>;
    }

    return (
        <div className="space-y-4">
            {messages.map((message) => (
                <div key={message.id} className="bg-gray-800 p-4 rounded-lg text-white">
                    <p className="font-bold">{message.sender}</p>
                    <div>{renderMessageContent(message.content)}</div>
                    <p className="text-sm text-gray-500">
                        {new Date(message.timestamp).toLocaleString()}
                    </p>
                </div>
            ))}
        </div>
    );
}