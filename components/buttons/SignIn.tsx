import { signIn } from "@/auth"

export function SignIn() {
    return (
        <form
            className="border-solid border-2 border-gray-500 p-1 rounded"
            action={async () => {
                "use server"
                await signIn("github")
            }}
        >
            <button type="submit">Sign in with GitHub</button>
        </form>
    )
}