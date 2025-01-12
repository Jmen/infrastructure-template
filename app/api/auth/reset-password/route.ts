import { resetPasswordAction } from "@/components/auth/actions";
import { NextRequest } from "next/server";
import { getTokens } from "@/app/api/auth";
import { unauthorised, badRequest, ok } from "@/app/api/apiResponse";

export async function POST(request: NextRequest) {
    const { accessToken, refreshToken, error } = await getTokens(request);

    if (error || !accessToken || !refreshToken) {
        return unauthorised(error);
    }

    const { password } = await request.json();
    
    const result = await resetPasswordAction(password, accessToken, refreshToken);
    
    if (result?.error) {
        return badRequest(result.error);
    }
    
    return ok();
}