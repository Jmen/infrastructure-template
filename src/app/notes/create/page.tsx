'use client';

import React from "react";
import { useRouter } from 'next/navigation';
import { getAuthHeaders } from "@/lib/firebase-public/auth";

export default function Create() {

    const router = useRouter();

    const createNote = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const body = {
            title: formData.get('title'),
            description: formData.get('description'),
        };

        const headers = await getAuthHeaders();
        headers.append('Content-Type', 'application/json');

        const res = await fetch('/api/notes', {
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
          <form onSubmit={createNote} className="flex flex-col gap-2">

              <label htmlFor="name">Title</label>
              <input className="border-solid border-2 border-black-600" type="text" name="title" placeholder="my title"/>

              <label htmlFor="description">Description</label>
              <textarea className="border-solid border-2 border-black-600 h-60" name="description" placeholder="this is a description..."/>

              <button className="border-solid border-2 border-black-600" type="submit">Create</button>
          </form>
      </div>
  );
}