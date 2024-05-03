import NextAuth from "next-auth"

import GitHub from "next-auth/providers/github"

import type { NextAuthConfig } from "next-auth"

export const config = {
    theme: { logo: "https://authjs.dev/img/logo-sm.png" },
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
            if (user) {
                token.id = user.id
            }
            return token
        },
        session({ session, token }) {
            session.user.id = token.id as string;
            return session
        },
    },
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)
