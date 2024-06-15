"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { baseUrl, showErrors } from "@/lib/config/config";
import { getAuthHeaders } from "@/lib/firebase-public/auth";

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
    const [errorResponse, setError] = useState(null)

    useEffect(() => {
        getAuthHeaders().then((headers) => {
            fetch(`${baseUrl}/api/notes/${id}`, { headers })
                .then((res) => res.json())
                .catch((error) => {
                    setError(error);
                    if (showErrors()) {
                        console.error(error);
                    }
                })
                .then((data) => {
                    setData(data)
                    setLoading(false)
                })
        });
    }, [id])

    if (errorResponse) return <p>Loading Failed</p>
    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>No data</p>

    const note = data as NoteEntity;

    const deleteNote = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const headers = await getAuthHeaders();

        const res = await fetch(`${baseUrl}/api/notes/${id}`, {
            headers,
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