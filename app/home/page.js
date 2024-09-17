import RoomCreation from "@/components/room-creation";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-black text-white">
      <h1 className="text-4xl font-bold mb-8">Group ChatGPT with Gemini</h1>
      <RoomCreation />
    </main>
  );
}