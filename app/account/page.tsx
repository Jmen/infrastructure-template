import UserDetails from "@/components/userDetails";
import { SignOutButton } from "@/components/auth/signOutButton";

export default function Home() {
    return (
        <div>
            <div className="flex flex-col items-center justify-between gap-6 p-12">
                <UserDetails/>
                <SignOutButton/>
            </div>
        </div>
    );
}