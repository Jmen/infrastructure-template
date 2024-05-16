"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { baseUrl } from "@/lib/config/config";

interface Props {
    id: string;
    title: string;
    description: string;
}

export default function DeleteForm({ id, title, description }: Props) {
    const router = useRouter();

    const deleteNote = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const res = await fetch(`${baseUrl}/api/notes/${id}`, {
            method: 'DELETE'
        });

        await res.json();

        router.push('/');
        router.refresh();
    }

    return (
        <div className="flex flex-row justify-center">
            <form onSubmit={deleteNote} className="flex flex-col gap-2">

                <label htmlFor="name">Title</label>
                <input
                    className="border-solid border-2 border-black-600"
                    type="text"
                    name="title"
                    value={title}
                />

                <label htmlFor="description">Description</label>
                <textarea
                    className="border-solid border-2 border-black-600 h-60"
                    name="description"
                    value={description}
                />

                <button
                    className="border-solid border-2 border-black-600 bg-red-600 text-white"
                    type="submit">Delete
                </button>
            </form>
        </div>
    );
}