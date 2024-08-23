import { NextResponse } from "next/server";
import { generateResponse } from "@/lib/gemini";
import { addMessage, getRoomMessages } from "@/lib/db";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const roomId = searchParams.get("roomId");

    const messages = getRoomMessages(roomId);

    return NextResponse.json({ messages });
}

export async function POST(request) {
    const { roomId, content, sender } = await request.json();

    const userMessage = addMessage(roomId, {
        id: Date.now().toString(),
        content,
        sender,
        timestamp: Date.now(),
    });

    // Generate a response using Gemini API
    const aiResponseContent = await generateResponse(content);

    const aiMessage = addMessage(roomId, {
        id: (Date.now() + 1).toString(),
        content: aiResponseContent,
        sender: "AI",
        timestamp: Date.now(),
    });

    return NextResponse.json({ success: true, userMessage, aiMessage });
}