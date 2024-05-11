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

export default async function Delete({ params }: Props) {
    const router = useRouter();

    const id = params.id;

    const note: Note = await fetch(`http://localhost:3000/api/notes/${id}`, {
        cache: 'no-cache',
    }).then((res) => res.json());

    if (!note) {
        return <div>404</div>
    }

    const deleteNote = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const res = await fetch(`/api/notes/${id}`, {
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
                    value={note.title}
                />

                <label htmlFor="description">Description</label>
                <textarea
                    className="border-solid border-2 border-black-600 h-60"
                    name="description"
                    value={note.description}
                />

                <button
                    className="border-solid border-2 border-black-600 bg-red-600 text-white"
                    type="submit">Delete
                </button>
            </form>
        </div>
    );
}