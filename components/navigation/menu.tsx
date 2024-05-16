import Link from "next/link";

export default function Menu() {
    return (
        <nav>
        <ul className="flex flex-row justify-center gap-5 m-5">
            <li>
                <Link href="/">Home</Link>
            </li>
            <li>
                <Link href="/notes/create">New +</Link>
            </li>
        </ul>
        </nav>
    );
}