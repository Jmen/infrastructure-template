"use client"

import React from "react";
import { signOut } from "@/lib/firebase-public/auth";

export function SignOut() {
    const handleSignOut = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        signOut();
    };

    return (
        <form className="border-solid border-2 border-gray-500 p-1 rounded">
            <button type="submit" onClick={handleSignOut}>Sign out</button>
        </form>
    )
}