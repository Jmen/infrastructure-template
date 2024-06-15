import Link from "next/link";
import { SignOut } from "@/components/buttons/SignOut";
import { SignIn } from "@/components/buttons/SignIn";

export default async function Menu() {
    return (
        <nav>
        <ul className="flex flex-row justify-center items-center gap-5 m-5">
            <li>
                <Link href="/">Home</Link>
            </li>
            <li>
                <Link href="/notes/create">New +</Link>
            </li>
            <li>
                <SignIn/>
            </li>
            <li>
                <SignOut/>
            </li>
        </ul>
        </nav>
    );
}