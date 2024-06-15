import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "firebase/auth";
import { onAuthStateChanged } from "@/lib/firebase-public/auth";

export function useUserSession(initialUser: User | null) {
    const [user, setUser] = useState(initialUser);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged((authUser) => {
            setUser(authUser)
        })

        return () => unsubscribe()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        onAuthStateChanged((authUser) => {
            if (user === undefined) return



            // refresh when users changed to ease testing
            if (user?.email !== authUser?.email) {
                router.refresh()
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    return user;
}