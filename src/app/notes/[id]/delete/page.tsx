import React from "react";
import DeleteForm from "@/components/forms/deleteForm";

interface Props {
    params: {
        id: string
    }
}

export default async function Delete({ params }: Props) {
    return (<DeleteForm id={params.id}/>);
}