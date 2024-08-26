"use client";
import { useRouter } from 'next/navigation'; 
import { useState } from 'react';

export default function Signup() {
  const router = useRouter();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const username = e.target.username.value;

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, username }),
      });

      if (res.ok) {
        console.log('Signup successful');
        router.push('/login'); // Redirect to login page after successful signup
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to sign up.');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('An error occurred during signup.');
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-black text-white">
      <h1 className="text-4xl font-bold mb-8">Sign Up</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium">Username</label>
          <input
            type="text"
            id="username"
            className="mt-1 w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium">Email</label>
          <input
            type="email"
            id="email"
            className="mt-1 w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium">Password</label>
          <input
            type="password"
            id="password"
            className="mt-1 w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded"
            required
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Sign Up
        </button>
      </form>

      <p className="mt-4">
        Already have an account?{' '}
        <button onClick={() => router.push('/login')} className="text-blue-500 underline">
          Log in
        </button>
      </p>
    </main>
  );
}
