import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/prisma";
import { getDecodedToken } from "@/lib/firebase-admin/token";

export async function POST(request: NextRequest) {
    const decodedToken = await getDecodedToken(request);

    if (!decodedToken) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const existingUser = await prisma.user.findUnique({
        where: {
            id: decodedToken.uid
        }
    });

    if (existingUser) {
        return NextResponse.json(existingUser);
    }

    const draftUser = {
        id: decodedToken.uid
    }

    const user = await prisma.user.create({
        data: draftUser,
    });

    return NextResponse.json(user);
}