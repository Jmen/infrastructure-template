import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/prisma";
import { getDecodedToken } from "@/lib/firebase-admin/token";

interface Props {
    params: {
        id: string
    }
}

export async function GET(request: NextRequest, { params }: Props) {
    const decodedToken = await getDecodedToken(request);

    if (!decodedToken) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const id = params.id;

    const note = await prisma.note.findFirst({
        where: {
            id,
            user_id: decodedToken.uid
        }
    })

    return NextResponse.json(note);
}

export async function POST(request: NextRequest, { params }: Props) {
    const decodedToken = await getDecodedToken(request);

    if (!decodedToken) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const id = params.id;

    const body = JSON.parse(await request.text());

    console.log('user_id', decodedToken.uid);
    console.log('ID', id);
    console.log('Body', body);

    const note = await prisma.note.update({
        where: {
            id,
            user_id: decodedToken.uid
        },
        data: {
            ...body
        }
    })

    return NextResponse.json(note);
}

export async function DELETE(request: NextRequest, { params }: Props) {
    const decodedToken = await getDecodedToken(request);

    if (!decodedToken) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const id = params.id;

    await prisma.note.delete({
        where: {
            id,
            user_id: decodedToken.uid
        }
    })

    return NextResponse.json({ message: 'Success' });
}