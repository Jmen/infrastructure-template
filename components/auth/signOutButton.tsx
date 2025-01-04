"use client";

import { signOutAction } from "@/actions/auth";
import { redirect } from "next/navigation";
import { DebouncedButton } from "../debouncedButton";

export function SignOutButton() {

    async function onClick() {
        await signOutAction();
        redirect("/");
    }

    return (
        <DebouncedButton onDebouncedClick={onClick}>
            Sign out
        </DebouncedButton>
    );
}