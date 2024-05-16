"use client"

import Link from "next/link";
import React from "react";
import { useRouter} from "next/navigation";

interface Props {
    id: string;
    title: string;
    description: string;
}

export default function Note({ id, title, description }: Props) {
    const router = useRouter();

    const editClick = () => {
        router.push(`/notes/${id}/edit`);
    }

    const deleteClick = () => {
        router.push(`/notes/${id}/delete`);
    }

    return (
        <div className="flex flex-col gap-1 border-solid border-2 border-black-600 p-5 h-60">
            <Link className="" href={`/notes/${id}`}>{title}</Link>
            <p>{description}</p>
            <div className="">
                <button className="border-solid border-2 border-black-600 mr-5" type="submit" onClick={editClick}>Edit</button>
                <button className="border-solid border-2 border-black-600" type="submit" onClick={deleteClick}>Delete</button>
            </div>
        </div>
    );
}