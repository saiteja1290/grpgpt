import RoomCreation from "@/components/room-creation";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Develop Applications as a Team, with GroupGPT</h1>
      <RoomCreation />
    </main>
  );
}