import { NextResponse } from "next/server";
import { getRepoContents } from "@/lib/github";
import { setRepoContext } from "@/lib/db";

export async function POST(request) {
    const { roomId, owner, repo, branch = 'main' } = await request.json();

    try {
        const repoContents = await getRepoContents(owner, repo, branch);

        if (repoContents && repoContents.length > 0) {
            await setRepoContext(roomId, { owner, repo, branch, contents: repoContents });
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ success: false, error: "No relevant contents found in the repository" }, { status: 400 });
        }
    } catch (error) {
        console.error('Error in POST /api/github:', error);
        return NextResponse.json({ success: false, error: error.message || "Failed to fetch repo contents" }, { status: 500 });
    }
}