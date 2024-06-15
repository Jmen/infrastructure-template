"use client"

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

export default function EditForm({ id }: Props) {
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

    const editNote = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const body = {
            title: formData.get('title'),
            description: formData.get('description'),
        };

        const headers = await getAuthHeaders();
        headers.append('Content-Type', 'application/json')

        const res = await fetch(`${baseUrl}/api/notes/${id}`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers
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