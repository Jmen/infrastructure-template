import { signOutAction } from "@/components/auth/actions";
import { ok, unauthorised, badRequest } from "../../apiResponse";

export async function POST(request: Request) {
    const authHeader = request.headers.get('Authorization');
    
    if (!authHeader?.startsWith('Bearer ')) {
        return unauthorised();
    }

    const token = authHeader.split(' ')[1];
    const result = await signOutAction(token);
    
    if (result?.error) {
        return badRequest(result.error.code, result.error.message);
    }
    
    return ok({ success: true });
}