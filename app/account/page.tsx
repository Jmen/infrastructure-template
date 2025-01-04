"use server"

import UserDetails from "@/components/userDetails";
import { ResetPasswordForm } from "@/components/auth/resetPasswordForm";
import { SignOutButton } from "@/components/auth/signOutButton";
import { createClient } from "@/lib/supabase/server";
import { User } from "@supabase/auth-js";

export default async function Page() {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    function hasUsedEmailProvider(user: User | null) {
        return user?.app_metadata?.providers?.includes("email");
    }

    return (
        <div>
            <div className="flex flex-col items-center justify-between gap-6 p-12">
                <UserDetails/>
                {hasUsedEmailProvider(user) && <ResetPasswordForm/>}
                <SignOutButton/>
            </div>
        </div>
    );
}