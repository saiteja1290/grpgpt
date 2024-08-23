"use client"
import { useRouter } from 'next/navigation'; // Use next/navigation in the app directory

export default function Login() {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Logging in...");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-black text-white">
      <h1 className="text-4xl font-bold mb-8">Login</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="mt-1 w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Login
        </button>
      </form>

      <p className="mt-4">
        Don&apos;t have an account?{' '}
        <button onClick={() => router.push('/signup')} className="text-blue-500 underline">
          Sign up
        </button>
      </p>
    </main>
  );
}
