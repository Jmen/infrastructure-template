import { resetPasswordAction } from "@/components/auth/actions";
import { NextRequest } from "next/server";
import { badRequest, ok } from "@/app/api/apiResponse";
import { withErrorHandler, withAuth } from "@/app/api/handlers";

export const POST = withErrorHandler(withAuth(async (request: NextRequest, { accessToken, refreshToken }) => {
    const { password } = await request.json();
    
    const result = await resetPasswordAction(password, accessToken, refreshToken);
    
    if (result?.error) {
        return badRequest(result.error.code, result.error.message);
    }
    
    return ok();
}));