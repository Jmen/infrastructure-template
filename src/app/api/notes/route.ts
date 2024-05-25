import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma/prisma";
import { auth } from "@/auth";

export async function GET(request: NextRequest) {
    const session = await auth();

    if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const skip = parseInt(request.nextUrl.searchParams.get('skip') ?? '0') || 0;
    const take = parseInt(request.nextUrl.searchParams.get('take') ?? '10') || 10;

    const notes = await prisma.note.findMany({
        orderBy: {
            updatedAt: 'desc'
        },
        where: {
            userId: session.user.id
        },
        skip,
        take
    })

    console.log("Notes Endpoint", JSON.stringify(notes, null, 2));

    return NextResponse.json(notes);
}

export async function POST(request: NextRequest) {
    const session = await auth();

    if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();

    const draftNote = {
        userId: session.user.id,
        title: data.title,
        description: data.description,
    }

    const note = await prisma.note.create({
        data: draftNote,
    });

    return NextResponse.json(note);
}