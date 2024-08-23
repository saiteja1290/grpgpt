"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function ChatInput({ roomId }) {
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
                        sender: "User", // In a real app, this would be the authenticated user's name
                    }),
                });

                if (response.ok) {
                    setMessage("");
                    // The chat messages will update automatically due to polling in chat-messages.js
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
        <div className="flex gap-2">
            <Textarea
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-grow"
            />
            <Button onClick={handleSendMessage} disabled={isLoading}>
                {isLoading ? "Sending..." : "Send"}
            </Button>
        </div>
    );
}