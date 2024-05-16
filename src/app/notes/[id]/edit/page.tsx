import React from "react";
import { baseUrl } from "@/lib/config/config";
import EditForm from "@/components/forms/editForm";

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
    const id = params.id;

    const note: Note = await fetch(`${baseUrl}/api/notes/${id}`, {
        cache: 'no-cache',
    }).then((res) => res.json());

    if (!note) {
        return <div>404</div>
    }

    return (<EditForm id={id} title={note.title} description={note.description} />);
}