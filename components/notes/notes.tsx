'use client';

import { useEffect, useState } from "react";
import Note from "@/components/notes/note";
import { baseUrl, showErrors } from "@/lib/config/config";

type NoteEntity = {
    id: string;
    userId: string;
    title: string;
    description: string;
};

export default function Notes() {

    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(true)
    const [errorResponse, setError] = useState(null)

    useEffect(() => {
        fetch(`${baseUrl}/api/notes`)
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
    }, [])

    if (errorResponse) return <p>Loading Failed</p>
    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>No Notes</p>

    const notes = data as NoteEntity[];

    return (
        <div className="flex flex-col items-center gap-5">
            <ul className="grid grid-cols-4 gap-4">
                {notes.map((note) => {
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