"use client";

import React, {useEffect, useState} from "react";
import { useRouter } from "next/navigation";
import { baseUrl } from "@/lib/config/config";

interface Props {
    id: string;
}

type NoteEntity = {
    id: string;
    userId: string;
    title: string;
    description: string;
};

export default function DeleteForm({ id, }: Props) {
    const router = useRouter();

    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`${baseUrl}/api/notes/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setData(data)
                setLoading(false)
            })
    }, [])

    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>No data</p>

    const note = data as NoteEntity;

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