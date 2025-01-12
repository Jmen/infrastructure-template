import { NextRequest } from "next/server";
import { getTokens, getUserId } from "@/app/api/auth";
import { ok, badRequest, internalServerError, unauthorised } from "@/app/api/apiResponse";

export const GET = async (request: NextRequest) => {
    const { accessToken, refreshToken, error: getTokensError } = await getTokens(request);

    if (getTokensError || !accessToken || !refreshToken) {
        return unauthorised(getTokensError);
    }

    const { userId, client: supabase, error: getUserIdError } = await getUserId(accessToken, refreshToken);

    if (getUserIdError) {
        return unauthorised("invalid token");
    }

    const { data, error } = await supabase.from('profiles')
        .select('*')
        .eq('user_id', userId)
        .limit(1);

    if (error) {
        console.error(error);
        return internalServerError();
    }

    if (data?.length === 0) {
        return ok({ username: '' });
    }

    return ok(data[0]);
}

export async function POST(request: NextRequest) {
    const { accessToken, refreshToken, error: getTokensError } = await getTokens(request);

    if (getTokensError || !accessToken || !refreshToken) {
        return unauthorised(getTokensError);
    }

    const { userId, client: supabase, error: getUserIdError } = await getUserId(accessToken, refreshToken);

    if (getUserIdError) {
        return unauthorised("invalid token");
    }

    try {
        const body = await request.json();
        const { username } = body;

        if (!username) {
            return badRequest("username_is_required", "username not found in request body");
        }

        const { data, error } = await supabase
            .from('profiles')
            .upsert({ user_id: userId, username })
            .select()
            .single();

        if (error) {
            console.error(error);
            return internalServerError();
        }

        return ok({ username: data.username });
    } catch (error) {
        console.error(error);
        return internalServerError();
    }
}