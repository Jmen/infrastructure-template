import { NextRequest } from "next/server";
import { ok, badRequest, internalServerError } from "@/app/api/apiResponse";
import { withAuth, withErrorHandler } from "@/app/api/handlers";

export const GET = withErrorHandler(withAuth(async (request: NextRequest, { userId, supabase }) => {
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
}));

export const POST = withErrorHandler(withAuth(async (request: NextRequest, { userId, supabase }) => {
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
}));