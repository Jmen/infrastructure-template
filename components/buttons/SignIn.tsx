'use client'

import React from "react";
import { signInWithGoogle } from "@/lib/firebase-public/auth";

export function SignIn() {
    const handleSignIn = (event: React.MouseEvent<HTMLButtonElement>) => {
        event?.preventDefault();
        signInWithGoogle();
    };

    return (
        <form className="border-solid border-2 border-gray-500 p-1 rounded">
            <button type="submit" onClick={ handleSignIn }>Sign in with Google</button>
        </form>
    )
}