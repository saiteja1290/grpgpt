"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function ChatInput({ roomId, username, onNewMessage }) {
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSendMessage = async () => {
        if (message.trim() && !isLoading) {
            setIsLoading(true);
            try {
                const response = await fetch("/api/chat", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        roomId,
                        content: message,
                        sender: username,
                    }),
                });

                if (response.ok) {
                    const { userMessage, aiMessage } = await response.json();
                    onNewMessage(userMessage);
                    onNewMessage(aiMessage);
                    setMessage("");
                } else {
                    console.error("Failed to send message");
                }
            } catch (error) {
                console.error("Error sending message:", error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="flex gap-1">
            <Textarea
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-grow bg-gray-800 p-4 border-black text-white"
            />
            <Button onClick={handleSendMessage} disabled={isLoading}>
                {isLoading ? "Sending..." : "Send"}
            </Button>
        </div>
    );
}