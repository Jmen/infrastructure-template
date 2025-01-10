import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/clients/server";

export const GET = async (request: NextRequest) => {
    const authHeader = request.headers.get('Authorization');
    const refreshToken = request.headers.get('X-Refresh-Token') || '';

    if (!authHeader?.startsWith('Bearer ')) {
        return NextResponse.json({error: "Authorization header required"}, {status: 401});
    }

    if (!refreshToken || refreshToken === '') {
        return NextResponse.json({error: "Refresh token required"}, {status: 401});
    }

    const token = authHeader.split(' ')[1];

    const supabase = await createClient();

    await supabase.auth.setSession({access_token: token, refresh_token: refreshToken});

    const userId = (await supabase.auth.getUser()).data.user?.id;

    const { data, error } = await supabase.from('profiles')
        .select('*')
        .eq('user_id', userId)
        .limit(1);

    if (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }

    if (data?.length === 0) {
        return NextResponse.json({ username: '' });
    }

    return NextResponse.json({ username: data[0].username });
}

export async function POST(request: Request) {
    try {
        const authHeader = request.headers.get('Authorization');
        const refreshToken = request.headers.get('X-Refresh-Token') || '';
    
        if (!authHeader?.startsWith('Bearer ')) {
            return NextResponse.json({error: "Authorization header required"}, { status: 401 });
        }
    
        if (!refreshToken || refreshToken === '') {
            return NextResponse.json({error: "Refresh token required"}, { status: 401 });
        }
    
        const token = authHeader.split(' ')[1];

        const supabase = await createClient();

        await supabase.auth.setSession({access_token: token, refresh_token: refreshToken});
        
        const userId = (await supabase.auth.getUser()).data.user?.id;
        
        const { username } = await request.json();

        const { data, error } = await supabase.from('profiles').upsert({
            user_id: userId,
            username
        }).select()
        .single();

        if (error) {
            console.error('Profile update error:', error);
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json({ success: true, username: data.username }, { 
            status: 200, 
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            } 
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
    }
}
