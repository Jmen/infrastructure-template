import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/prisma";
import {auth} from "@/auth";

interface Props {
    params: {
        id: string
    }
}

export async function GET(request: NextRequest, { params }: Props) {
    const session = await auth();

    if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const id = params.id;

    const note = await prisma.note.findFirst({
        where: {
            id,
            userId: session.user.id
        }
    })

    return NextResponse.json(note);
}

export async function POST(request: NextRequest, { params }: Props) {
    const session = await auth();

    if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const id = params.id;

    const body = JSON.parse(await request.text());

    const note = await prisma.note.update({
        where: {
            id,
            userId: session.user.id
        },
        data: {
            ...body
        }
    })

    return NextResponse.json(note);
}

export async function DELETE(request: NextRequest, { params }: Props) {
    const session = await auth();

    if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const id = params.id;

    await prisma.note.delete({
        where: {
            id,
            userId: session.user.id
        }
    })

    return NextResponse.json({ message: 'Success' });
}