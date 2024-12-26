import UserDetails from "@/components/userDetails";
import { ResetPasswordForm } from "@/components/auth/resetPasswordForm";
import { SignOutButton } from "@/components/auth/signOutButton";

export default function Home() {
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