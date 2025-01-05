import { signUpAction } from "@/components/auth/actions";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { email, password } = await request.json();
    
    const result = await signUpAction(email, password);
    
    if (result?.error) {
        return NextResponse.json({ error: result.error }, { status: 400 });
    }

    if (!result.session?.access_token || !result.session?.refresh_token) {
        return NextResponse.json({ error: "Failed to create session" }, { status: 400 });
    }
    
    return NextResponse.json({
        accessToken: result.session.access_token,
        refreshToken: result.session.refresh_token,
    });
} 