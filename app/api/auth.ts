import { NextRequest } from "next/server";

export async function getTokens(request: NextRequest) {
    const authHeader = request.headers.get('Authorization');
    const refreshToken = request.headers.get('X-Refresh-Token');
    
    if (!authHeader?.startsWith('Bearer ')) {
        return { error: "Authorization header required" };
    }

    if (!refreshToken) {
        return { error: "Refresh token required" };
    }

    const accessToken = authHeader.split(' ')[1];

    return { accessToken, refreshToken };
}