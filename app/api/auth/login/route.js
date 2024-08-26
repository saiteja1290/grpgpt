import clientPromise from '@/lib/mongodb'; // Make sure this path is correct
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Missing email or password' }, { status: 400 });
    }

    // Connect to MongoDB
    const client = await clientPromise; // Await the connection to MongoDB
    const db = client.db('your-database-name'); // Make sure you have the correct database name

    // Find the user by email
    const user = await db.collection('users').findOne({ email });

    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Compare the hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Return success response if login is successful
    return NextResponse.json({ message: 'Login successful' }, { status: 200 });
  } catch (error) {
    console.error('Error in login:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
