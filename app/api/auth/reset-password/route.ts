import { resetPasswordAction } from "@/components/auth/actions";
import { NextRequest, NextResponse } from "next/server";
import { getTokens } from "@/app/api/auth";

export async function POST(request: NextRequest) {
    const { accessToken, refreshToken, error } = await getTokens(request);

    if (error || !accessToken || !refreshToken) {
        return { errorResponse: NextResponse.json({ error }, { status: 401 }) };
    }

    const { password } = await request.json();
    
    const result = await resetPasswordAction(password, accessToken, refreshToken);
    
    if (result?.error) {
        return NextResponse.json({ error: result.error }, { status: 400 });
    }
    
    return NextResponse.json({ success: true });
}