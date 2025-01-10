"use client"

import { z } from "zod"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DebouncedButton } from '../debouncedButton'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/clients/client"

const schema = z.object({
    username: z.string()
        .min(3, { message: "username must be at least 3 characters" })
        .max(32, { message: "username must be less than 32 characters" })
});

export function ProfileForm() {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(true);
    const [username, setUsername] = useState('Loading...');

    useEffect(() => {
        const supabase = createClient();

        supabase.auth.getSession().then(({ data: { session } }) => {
            fetch('/api/my/profile', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${session?.access_token}`,
                    'X-Refresh-Token': session?.refresh_token || '',
                    'Content-Type': 'application/json',
                },
            })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    setError(data.error);
                    return;
                }
                setUsername(data.username || '');
                setIsLoading(false);
            })
            .catch(() => setError("Failed to load profile"));
        });
    }, []);

    async function onSubmit() {
        const result = schema.safeParse({ username });
        if (!result.success) {
            setError(result.error.errors[0].message);
            return;
        }

        const supabase = createClient();
        const { data: { session } } = await supabase.auth.getSession();

        try {
            const response = await fetch('/api/my/profile', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${session?.access_token}`,
                    'X-Refresh-Token': session?.refresh_token || '',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username })
            });

            const data = await response.json();
    
            if (data.error) {
                setError(data.error);
                return;
            }

            setError(null);
            setSuccess(true);

            setTimeout(() => {
                setSuccess(false);
            }, 2000);
        } catch (error) {
            console.error(error);
            setError('An unexpected error occurred');
        }
    }

    return (
        <Card className="w-[400px]">
            <CardHeader>
                <CardTitle>Profile</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={onSubmit} className="space-y-8">
                    <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <DebouncedButton type="submit" onDebouncedClick={onSubmit}>
                            Update Profile
                        </DebouncedButton>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        {success && <p className="text-green-500 text-sm">Profile updated</p>}
                    </div>
                </form>
            </CardContent>
        </Card>
    );
} 