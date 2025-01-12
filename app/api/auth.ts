import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/clients/server";

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

export async function getUserId(accessToken: string, refreshToken: string) {
    const supabase = await createClient();

    await supabase.auth.setSession({access_token: accessToken, refresh_token: refreshToken});

    const { data: { user }, error } = await supabase.auth.getUser();

    if (error) {
        console.error(error);
        return { error: { code: error.code, message: error.message } };
    }

    if (!user?.id) {
        console.error("User not found");
        return { error: { code: "user_not_found", message: "User not found" } };
    }

    return { userId: user.id, client: supabase };
}