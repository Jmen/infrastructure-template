import { redirect } from "next/navigation";
import UserDetails from "@/components/userDetails";
import { ResetPasswordForm } from "@/components/auth/resetPasswordForm";
import { SignOutButton } from "@/components/auth/signOutButton";
import { createClient } from "@/lib/supabase/server";

export default async function Page() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/");
    }

    return (
        <div>
            <div className="flex flex-col items-center justify-between gap-6 p-12">
                <UserDetails/>
                <ResetPasswordForm/>
                <SignOutButton/>
            </div>
        </div>
    );
}