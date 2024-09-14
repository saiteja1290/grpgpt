import { NextResponse } from "next/server";
import { generateResponse } from "@/lib/gemini";
import { addMessage, getRoomMessages, getRepoContext } from "@/lib/db";
export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const roomId = searchParams.get("roomId");

    const messages = await getRoomMessages(roomId);

    return NextResponse.json({ messages });
}
export async function POST(request) {
    const { roomId, content, sender } = await request.json();

    const userMessage = await addMessage(roomId, {
        id: Date.now().toString(),
        content,
        sender,
        timestamp: Date.now(),
    });

    const repoContext = await getRepoContext(roomId);
    let aiPrompt = content;

    if (repoContext) {
        const fileContents = repoContext.contents.map(file =>
            `File: ${file.path}\n\nContent:\n${file.content}\n\n---\n\n`
        ).join('');

        aiPrompt = `Context: This is a GitHub repository for ${repoContext.owner}/${repoContext.repo}. 
      The repository contains the following files with their contents:
  
      ${fileContents}
  
      User question: ${content}
  
      Please provide an answer based on this context, referencing specific parts of the code when relevant.`;
    }

    // Generate a response using Gemini API
    const aiResponseContent = await generateResponse(aiPrompt);

    const aiMessage = await addMessage(roomId, {
        id: (Date.now() + 1).toString(),
        content: aiResponseContent,
        sender: "AI",
        timestamp: Date.now(),
    });

    return NextResponse.json({ success: true, userMessage, aiMessage });
}