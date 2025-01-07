"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
import { DebouncedButton } from '../debouncedButton'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { createClient } from "@/lib/supabase/clients/client"

const formSchema = z.object({
    username: z.string()
        .min(3, { message: "username must be at least 3 characters" })
        .max(32, { message: "username must be less than 32 characters" })
});

type Profile = z.infer<typeof formSchema>;

export function ProfileForm() {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const form = useForm<Profile>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
        },
    });

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
                form.reset(data);
            })
            .catch(() => setError("Failed to load profile"));
        });
    }, [form]);

    async function onSubmit(values: Profile) {
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
                body: JSON.stringify(values)
            });

            console.log(response);

            const data = await response.json();
    
            if (data.error) {
                setError(data.error);
                return;
            }
        } catch (error) {
            console.error(error);
        }

        setError(null);
        setSuccess(true);

        setTimeout(() => {
            setSuccess(false);
        }, 2000);
    }

    return (
        <Card className="w-[400px]">
            <CardHeader>
                <CardTitle>Profile</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center gap-4">
                            <DebouncedButton type="submit" onDebouncedClick={form.handleSubmit(onSubmit)}>
                                Update Profile
                            </DebouncedButton>
                            {error && <p className="text-red-500 text-sm">{error}</p>}
                            {success && <p className="text-green-500 text-sm">Profile updated</p>}
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
} 