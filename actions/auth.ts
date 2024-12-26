"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const signUpAction = async (email: string, password: string) => {
    const origin = (await headers()).get("origin");

    const supabase = await createClient();

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: `${origin}/api/auth/callback`,
        },
    });

    if (error) {
        console.error(error.code + " " + error.message);
        return { error: error.message };
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