'use client';

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function UserDetails() {
    const [email, setEmail] = useState<string | undefined>(undefined);

    useEffect(() => {
        const client = createClient();

        client.auth.getSession().then((session) => {
            const email = session?.data?.session?.user?.email;

            console.log(JSON.stringify(session, null, 2));

            if (email) {
                setEmail(session?.data.session?.user.email);
            } else {
                setEmail("Not logged in");
            }
        });
    });

    return <Card className="w-[400px]">
        <CardHeader>
            <CardTitle>User Details</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col">
            <p>email: {email}</p>
        </CardContent>
    </Card>;
}