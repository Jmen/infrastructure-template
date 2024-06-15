import Notes from "@/components/notes/notes";
import Session from "@/components/session/session";
import { getAuthenticatedAppForUser } from "@/lib/firebase-public/serverApp";

export default async function Home() {
    const { currentUser } = await getAuthenticatedAppForUser();

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-12">
            <div className="flex flex-col gap-5">
                <Notes/>
                <Session initialUser={currentUser}/>
                { currentUser ? <Notes/> : <></> }
            </div>
        </main>
    );
}
