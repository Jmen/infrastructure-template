import { forgotPasswordAction } from "@/actions/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { email } = await request.json();
    
    const result = await forgotPasswordAction(email);
    
    if (result?.error) {
        return NextResponse.json({ error: result.error }, { status: 400 });
    }
    
    return NextResponse.json({ success: true });
} 