import Note from "@/components/notes/note";
import { baseUrl } from "@/lib/config/config";

type Note = {
    id: string;
    title: string;
    description: string;
};

export default async function Notes() {
    const notes: Note[] = await fetch(`${baseUrl}/api/notes`, {
        cache: 'no-cache',
    })
    .then((res) => res.json())
    .catch(() => []);

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