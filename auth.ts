import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import type { NextAuthConfig } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma/prisma";

export const config = {
    theme: { logo: "https://authjs.dev/img/logo-sm.png" },
    adapter: PrismaAdapter(prisma),
    providers: [
        GitHub,
    ],
    basePath: "/auth",
    callbacks: {
        authorized({ request, auth }) {
            const { pathname } = request.nextUrl
            if (pathname === "/middleware-example") return !!auth
            return true
        },
        jwt({ token, trigger, session, user }) {
            if (trigger === "update") {
                token.name = session.user.name
            }
            return token
        },
        session({ session, token }) {
            return session
        },
    },
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)
