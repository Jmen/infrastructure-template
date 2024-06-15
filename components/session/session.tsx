"use client";

import { User } from "firebase/auth";
import { useUserSession } from "@/lib/firebase-public/hooks";

export default function Session({ initialUser }: { initialUser: User | null }) {
    const user = useUserSession(initialUser);

    return (
        <div className="flex flex-col rounded-md bg-neutral-100">
            <div className="p-4 font-bold rounded-t-md bg-neutral-200">
                Current Session
            </div>
            <pre className="py-6 px-4 whitespace-pre-wrap break-all">
                {JSON.stringify(user, null, 2)}
            </pre>
        </div>
    );
}