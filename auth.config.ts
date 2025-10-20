import Google from "next-auth/providers/google"


import type { NextAuthConfig } from "next-auth"


export default {
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET
        })
    ]
} satisfies NextAuthConfig

export const config = {
  // copied from clerk
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};