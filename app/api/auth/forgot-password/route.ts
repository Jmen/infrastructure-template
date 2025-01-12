import { forgotPasswordAction } from "@/components/auth/actions";
import { badRequest, ok } from "@/app/api/apiResponse";

export async function POST(request: Request) {
    const { email } = await request.json();
    
    const result = await forgotPasswordAction(email);
    
    if (result?.error) {
        return badRequest(result.error);
    }
    
    return ok();
} 