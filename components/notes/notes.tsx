'use client';

import Note from "@/components/notes/note";
import { baseUrl } from "@/lib/config/config";
import { useEffect, useState } from "react";

type NoteEntity = {
    id: string;
    userId: string;
    title: string;
    description: string;
};

export default function Notes() {
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`${baseUrl}/api/notes`)
            .then((res) => res.json())
            .then((data) => {
                setData(data)
                setLoading(false)
            })
    }, [])

    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>No data</p>

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