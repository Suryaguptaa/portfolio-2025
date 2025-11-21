import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Project } from '@/lib/models';
import { verifyToken } from '@/lib/auth';

export async function DELETE(req) {
  try {
    // 1. Security Check
    const token = req.cookies.get('token')?.value;
    if (!verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Get the ID from the URL (?id=12345)
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    // 3. Delete it
    await dbConnect();
    await Project.findByIdAndDelete(id);

    return NextResponse.json({ message: 'Deleted' }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}