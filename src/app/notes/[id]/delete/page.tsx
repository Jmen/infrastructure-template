import React from "react";
import { baseUrl } from "@/lib/config/config";
import DeleteForm from "@/components/forms/deleteForm";

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
    const id = params.id;

    const note: Note = await fetch(`${baseUrl}/api/notes/${id}`, {
        cache: 'no-cache',
    }).then((res) => res.json());

    if (!note) {
        return <div>404</div>
    }

    return (<DeleteForm id={id} title={note.title} description={note.description}/>);
}