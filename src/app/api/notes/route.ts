import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/prisma";
import { getDecodedToken } from "@/lib/firebase-admin/token";

export async function GET(request: NextRequest) {
    const decodedToken = await getDecodedToken(request);

    if (!decodedToken) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const skip = parseInt(request.nextUrl.searchParams.get('skip') ?? '0') || 0;
    const take = parseInt(request.nextUrl.searchParams.get('take') ?? '10') || 10;

    const notes = await prisma.note.findMany({
        orderBy: {
            updated: 'desc'
        },
        where: {
            user_id: decodedToken.uid
        },
        skip,
        take
    })
    
    return NextResponse.json(notes);
}

export async function POST(request: NextRequest) {
    const decodedToken = await getDecodedToken(request);

    if (!decodedToken) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();

    const draftNote = {
        user_id: decodedToken.uid,
        title: data.title,
        description: data.description,
    }

    const note = await prisma.note.create({
        data: draftNote,
    });

    return NextResponse.json(note);
}