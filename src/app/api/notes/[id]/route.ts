import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/prisma";

interface Props {
    params: {
        id: string
    }
}

export async function GET(request: NextRequest, { params }: Props) {
    const id = params.id;

    const note = await prisma.note.findFirst({
        where: {
            id
        }
    })

    return NextResponse.json(note);
}

export async function POST(request: NextRequest, { params }: Props) {
    const id = params.id;

    const body = JSON.parse(await request.text());

    const note = await prisma.note.update({
        where: {
            id
        },
        data: {
            ...body
        }
    })

    return NextResponse.json(note);
}

export async function DELETE(request: NextRequest, { params }: Props) {
    const id = params.id;

    await prisma.note.delete({
        where: {
            id
        }
    })

    return NextResponse.json({ message: 'Success' });
}