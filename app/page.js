"use client"
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleLoginRedirect = () => {
    router.push('/login'); // Redirect to /login page
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-black text-white">
      <h1 className="text-4xl font-bold mb-8">Group ChatGPT with Gemini</h1>
      <button
        onClick={handleLoginRedirect}
        className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Login to use the app
      </button>
    </main>
  );
}
