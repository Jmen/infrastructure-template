"use client";

import { signOutAction } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export function SignOutButton() {

    async function onClick() {
        await signOutAction();
        redirect("/");
    }

    return (
        <Button onClick={onClick}>
            Sign out
        </Button>
    );
}