"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const signUpAction = async (email: string, password: string) => {
    const supabase = await createClient();

    const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
    });

    if (signUpError) {
        return { error: signUpError.message };
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (signInError) {
        return { error: signInError.message };
    }
};

export const signInAction = async (email: string, password: string) => {
    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        return { error: error.message };
    }
};

export const signOutAction = async () => {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
        console.error(error.code + " " + error.message);
    }

    return redirect("/");
};

export async function resetPasswordAction(newPassword: string) {
    const supabase = await createClient();
    
    const { error } = await supabase.auth.updateUser({
        password: newPassword
    });

    if (error) {
        return { error: error.message };
    }

    return { success: true };
}

export async function forgotPasswordAction(email: string) {
    const origin = (await headers()).get("origin");
    const redirectOrigin = origin?.replace('127.0.0.1', 'localhost');
    
    const supabase = await createClient();
    
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${redirectOrigin}/api/auth/callback?next=/auth/reset-password`,
    });

    if (error) {
        return { error: error.message };
    }

    return { success: true };
}

export async function signInWithGoogleAction() {
    const origin = (await headers()).get("origin");
    const redirectOrigin = origin?.replace('127.0.0.1', 'localhost');
    
    const supabase = await createClient();
    
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: `${redirectOrigin}/api/auth/callback?next=/account`,
            queryParams: {
                prompt: 'select_account',
                access_type: 'offline'
            }
        },
    });

    if (error) {
        return { error: error.message };
    }

    return { url: data.url };
}

export async function getAuthProvidersAction() {
    return {
        google: process.env.USE_GOOGLE_AUTH === "true"
    };
}