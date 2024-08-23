"use client";

import { useParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import ChatMessages from "@/components/chat-messages";
import ChatInput from "@/components/chat-input";

export default function ChatRoom() {
    const params = useParams();
    const roomId = params.roomId;
    const [username, setUsername] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Simulate user authentication
        const simulateAuth = async () => {
            await new Promise(resolve => setTimeout(resolve, 1000));
            setUsername(`User_${Math.floor(Math.random() * 1000)}`);
        };

        simulateAuth();
    }, []);

    const addNewMessage = useCallback((newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
    }, []);

    if (!username) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col h-screen">
            <header className="bg-gray-800 text-white p-4">
                <h1 className="text-2xl">Room: {roomId}</h1>
                <p>Logged in as: {username}</p>
            </header>
            <main className="flex-grow overflow-auto p-4">
                <ChatMessages roomId={roomId} messages={messages} setMessages={setMessages} />
            </main>
            <footer className="p-4">
                <ChatInput roomId={roomId} username={username} onNewMessage={addNewMessage} />
            </footer>
        </div>
    );
}