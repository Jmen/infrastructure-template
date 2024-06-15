'use client';

import { useEffect, useState } from "react";
import Note from "@/components/notes/note";
import { baseUrl, showErrors } from "@/lib/config/config";
import { getAuthHeaders } from "@/lib/firebase-public/auth";

type NoteEntity =
 {
    id: string;
    userId: string;
    title: string;
    description: string;
};

type ErrorResponse = {
    error: string;
};

export default function Notes() {
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(true)
    const [requestError, setError] = useState(null)

    useEffect(() => {
        getAuthHeaders()
            .then((headers) => {
                fetch(`${baseUrl}/api/notes`, {headers})
                    .then((res) => res.json())
                    .catch((error) => {
                        setError(error);
                        if (showErrors()) {
                            console.error(error);
                        }
                    })
                    .then((data) => {
                        setData(data);
                        setLoading(false);
                    })
            })
    }, [])

    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>No Notes</p>
    if (requestError || (data as ErrorResponse).error) return <p>Loading Failed</p>

    const notes = data as NoteEntity[];

    return (
        <div className="flex flex-col items-center gap-5">
            <ul className="grid grid-cols-4 gap-4">
                {notes && notes.map((note) => {
                    return <Note
                        key={note.id}
                        id={note.id}
                        title={note.title}
                        description={note.description}
                    />;
                })}
            </ul>
        </div>
    );
}