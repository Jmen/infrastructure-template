"use server"

import { createClient } from "@/lib/supabase/server";
import UserDetails from "@/components/userDetails";
import { ResetPasswordForm } from "@/components/auth/resetPasswordForm";
import { SignOutButton } from "@/components/auth/signOutButton";
import { GoogleProfile } from "@/components/auth/googleProfile";

export default async function Page() {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    return (
        <div>
            <div className="flex flex-col items-center justify-between gap-6 p-12">
                <UserDetails/>
                <GoogleProfile user={user} />
                <ResetPasswordForm user={user}/>
                <SignOutButton/>
            </div>
        </div>
    );
}