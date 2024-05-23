import React from "react";
import EditForm from "@/components/forms/editForm";

interface Props {
    params: {
        id: string
    }
}

export default async function Edit({ params }: Props) {
    return (<EditForm id={params.id} />);
}