import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            // we require authentication for all access:
            if (isLoggedIn) return true;
            return false; // Redirect unauthenticated users to login page
        },
    },
    providers: [], // providers are added in auth.ts
} satisfies NextAuthConfig;