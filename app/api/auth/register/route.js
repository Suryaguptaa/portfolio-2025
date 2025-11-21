import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/db';
import { User } from '@/lib/models';

export async function POST(req) {
  try {
    await dbConnect();
    const { email, password } = await req.json();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    // Hash the password (security)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    await User.create({ email, password: hashedPassword });

    return NextResponse.json({ message: 'Admin created successfully' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}