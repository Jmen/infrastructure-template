import { signOut } from "@/auth"

export function SignOut() {
    return (
        <form
            className="border-solid border-2 border-gray-500 p-1 rounded"
            action={async () => {
                "use server"
                await signOut()
            }}
        >
            <button type="submit">Sign out</button>
        </form>
    )
}