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
import { signInAction } from "@/actions/auth";
import { useState } from "react";
import { DebouncedButton } from '../debouncedButton';

const formSchema = z.object({
    email: z.string()
        .email({ message: "please enter a valid email address" })
        .max(256, { message: "email must be less than 256 characters" }),
    password: z.string()
        .min(6, { message: "password must be at least 6 characters" })
        .max(256, { message: "password must be less than 256 characters"}),
})

export function SignInForm() {
    const [error, setError] = useState<string | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const result = await signInAction(values.email, values.password);

        if (result?.error) {
            setError(result.error);
        } else {
            setError(null);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <DebouncedButton type="submit" onDebouncedClick={form.handleSubmit(onSubmit)}>
                    Sign In
                </DebouncedButton>
            </form>
            {error && <p className="text-red-500 p-6">{error}</p>}
        </Form>
    )
}
