import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Project } from '@/lib/models';
import { verifyToken } from '@/lib/auth';

// 1. POST: Save a new project
export async function POST(req) {
  try {
    // Security Check: Is the user logged in?
    const token = req.cookies.get('token')?.value;
    if (!verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const body = await req.json();

    // Convert comma-separated tags into an array (e.g. "3D, Motion" -> ["3D", "Motion"])
    const formattedBody = {
      ...body,
      media: [body.media], // Putting single URL into array for now
      tags: body.tags.split(',').map(t => t.trim()),
      tools: body.tools.split(',').map(t => t.trim())
    };

    const project = await Project.create(formattedBody);
    return NextResponse.json({ message: 'Project Saved', project }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// 2. GET: Fetch all projects (We need this to show the list)
export async function GET(req) {
    await dbConnect();
    const projects = await Project.find({}).sort({ createdAt: -1 });
    return NextResponse.json(projects);
}