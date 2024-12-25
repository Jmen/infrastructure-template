"use client";

import { signOutAction } from "@/actions/auth";
import { Button } from "@/components/ui/button";

export function SignOutButton() {
    return (
        <Button onClick={signOutAction}>
            Sign out
        </Button>
    );
}