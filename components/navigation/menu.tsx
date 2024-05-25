import Link from "next/link";
import { SignOut } from "@/components/buttons/SignOut";
import { SignIn } from "@/components/buttons/SignIn";
import { auth } from "@/auth";

export default async function Menu() {
    const session = await auth();

    return (
        <nav>
        <ul className="flex flex-row justify-center gap-5 m-5">
            <li>
                <Link href="/">Home</Link>
            </li>
            <li>
                <Link href="/notes/create">New +</Link>
            </li>
            <li>
                { session?.user ? <SignOut/> : <SignIn/> }
            </li>
        </ul>
        </nav>
    );
}