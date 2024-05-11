import Note from "@/components/notes/note";

type Note = {
    id: string;
    title: string;
    description: string;
};

export default async function Notes() {

    const notes: Note[] = await fetch('http://localhost:3000/api/notes', {
        cache: 'no-cache',
    }).then((res) => res.json());

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