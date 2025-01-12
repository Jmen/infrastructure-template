import { signUpAction } from "@/components/auth/actions";
import { badRequest, internalServerError, ok } from "@/app/api/apiResponse";

export async function POST(request: Request) {
    const { email, password } = await request.json();
    
    const result = await signUpAction(email, password);
    
    if (result?.error) {
        return badRequest(result.error.code, result.error.message);
    }

    if (!result.session?.access_token || !result.session?.refresh_token) {
        console.error("Failed to create session");
        return internalServerError();
    }
    
    return ok({
        accessToken: result.session.access_token,
        refreshToken: result.session.refresh_token,
    });
} 