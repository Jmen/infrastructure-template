"use client"

import React from "react";
import { useRouter } from "next/navigation";
import { baseUrl } from "@/lib/config/config";

interface Props {
    id: string;
    title: string;
    description: string;
}

export default function EditForm({ id, title, description }: Props) {
    const router = useRouter();

    const editNote = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const body = {
            title: formData.get('title'),
            description: formData.get('description'),
        };

        const res = await fetch(`${baseUrl}/api/notes/${id}`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        await res.json();

        router.push('/');
        router.refresh();
    }

    return (
        <div className="flex flex-row justify-center">
            <form onSubmit={editNote} className="flex flex-col gap-2">

                <label htmlFor="name">Title</label>
                <input
                    className="border-solid border-2 border-black-600"
                    type="text"
                    name="title"
                    defaultValue={title}
                />

                <label htmlFor="description">Description</label>
                <textarea
                    className="border-solid border-2 border-black-600 h-60"
                    name="description"
                    defaultValue={description}
                />

                <button
                    className="border-solid border-2 border-black-600"
                    type="submit">Update
                </button>
            </form>
        </div>
    );
}