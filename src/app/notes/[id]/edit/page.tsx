"use client"

import React from "react";
import { useRouter } from "next/navigation";

interface Props {
    params: {
        id: string
    }
}

interface Note {
    title: string;
    description: string;
}

export default async function Edit({ params }: Props) {
    const router = useRouter();

    const id = params.id;

    const note: Note = await fetch(`http://localhost:3000/api/notes/${id}`, {
        cache: 'no-cache',
    }).then((res) => res.json());

    if (!note) {
        return <div>404</div>
    }

    const editNote = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const body = {
            title: formData.get('title'),
            description: formData.get('description'),
        };

        const res = await fetch(`/api/notes/${id}`, {
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
                    defaultValue={note.title}
                />

                <label htmlFor="description">Description</label>
                <textarea
                    className="border-solid border-2 border-black-600 h-60"
                    name="description"
                    defaultValue={note.description}
                />

                <button
                    className="border-solid border-2 border-black-600"
                    type="submit">Update
                </button>
            </form>
        </div>
    );
}