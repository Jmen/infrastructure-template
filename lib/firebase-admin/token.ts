import { NextRequest } from "next/server";
import admin from "@/lib/firebase-admin/admin";

export async function getDecodedToken(request: NextRequest) {
    if (!request.headers.has("Authorization")) {
        return null;
    }

    const authHeader = request.headers.get("Authorization") as string;

    const idToken = authHeader.replace("Bearer ", "");

    return await admin.auth().verifyIdToken(idToken, true);
}