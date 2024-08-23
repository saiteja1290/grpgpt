"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RoomCreation() {
    const [roomId, setRoomId] = useState("");
    const router = useRouter();

    const handleCreateRoom = () => {
        if (roomId) {
            router.push(`/chat/${roomId}`);
        }
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <Input
                type="text"
                placeholder="Enter room ID"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
            />
            <Button onClick={handleCreateRoom}>Create or Join Room</Button>
        </div>
    );
}