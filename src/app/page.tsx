import { SignIn } from "@/components/buttons/SignIn";
import { auth } from "@/auth";
import { SignOut } from "@/components/buttons/SignOut";
import Notes from "@/components/notes/notes";

export default async function Home() {
    const session = await auth();
    return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12">
        <div className="flex flex-col gap-6">
            <SignIn/>
            <div className="flex flex-col rounded-md bg-neutral-100">
                <div className="p-4 font-bold rounded-t-md bg-neutral-200">
                    Current Session
                </div>
                <pre className="py-6 px-4 whitespace-pre-wrap break-all">
                    {JSON.stringify(session, null, 2)}
                </pre>
            </div>
            <SignOut/>
        </div>
        <Notes/>
    </main>
    );
}
