import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./lib/db"
import authConfig from "./auth.config"
import { getAccountByUserId, getUserById } from "./features/auth/actions"

export const { auth, handlers, signIn, signOut } = NextAuth({
    callbacks: {
        async signIn({ user, account, profile }) {
            if (!user || !account) return false;

            const existingUser = await db.user.findUnique({
                where: { email: user.email! }
            })

            if (!existingUser) {
                const newUser = await db.user.create({
                    data: {
                        email: user.email!,
                        name: user.name,

                        accounts: {
                            // @ts-ignore
                            create: {
                                type: account.type,
                                provider: account.provider,
                                providerAccountId: account.providerAccountId,
                                refreshToken: account.refresh_token,
                                accessToken: account.access_token,
                                expiresAt: account.expires_at,
                                tokenType: account.token_type,
                                scope: account.scope,
                                idToken: account.id_token,
                                sessionState: account.session_state,
                            },
                        },
                    }
                });

                if (!newUser) return false;
            } else {
                const existingAccount = await db.account.findUnique({
                    where: {
                        provider_providerAccountId: {
                            provider: account.provider,
                            providerAccountId: account.providerAccountId,
                        }
                    }
                })

                if (!existingAccount) {
                    await db.account.create({
                        data: {
                            userId: existingUser.id,
                            type: account.type,
                            provider: account.provider,
                            providerAccountId: account.providerAccountId,
                            refreshToken: account.refresh_token,
                            accessToken: account.access_token,
                            expiresAt: account.expires_at,
                            tokenType: account.token_type,
                            scope: account.scope,
                            idToken: account.id_token,
                            // @ts-ignore
                            sessionState: account.session_state,
                        },
                    });
                }
            }
            return true;
        },

        async jwt({ token }) {
            if (!token.sub) return token;

            const existingUser = await getUserById(token.sub)
            if (!existingUser) return token;


            const exisitingAccount = await getAccountByUserId(existingUser.id);

            token.name = existingUser.name;
            token.email = existingUser.email;


            return token;
        },

        async session({ session, token }) {
            // attach the user ID from the token to the session
            if (token.sub && session.user) {
                session.user.id = token.sub
            }
            return session;
        },
    },
    secret: process.env.AUTH_SECRET,
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig
})