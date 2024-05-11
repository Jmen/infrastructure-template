import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma/prisma";

export async function GET(request: NextRequest) {

    const skip = parseInt(request.nextUrl.searchParams.get('skip') ?? '0') || 0;
    const take = parseInt(request.nextUrl.searchParams.get('take') ?? '10') || 10;

    const notes = await prisma.note.findMany({
        orderBy: {
            updatedAt: 'desc'
        },
        skip,
        take
    })

    return NextResponse.json(notes);
}

export async function POST(request: NextRequest) {
    const data = await request.json();

    const noteDraft = {
        title: data.title,
        description: data.description,
    }

    const note = await prisma.note.create({
        data: noteDraft,
    });

    return NextResponse.json(note);
}