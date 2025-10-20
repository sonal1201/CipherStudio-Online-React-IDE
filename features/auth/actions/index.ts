"use server"

import { db } from "@/lib/db"

export const getUserById = async (id: string) => {
    try {
        const user = await db.user.findUnique({
            where: {
                id
            },
            include: { accounts: true }
        })
        return user;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const getAccountByUserId = async (userId: string) => {
    try {
        const account = await db.account.findFirst({
            where: {
                userId
            }
        })
        return account;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const currentUser = async () => {
    // defer import to avoid circular dependency between auth and this module
    const { auth } = await import("@/auth");
    const user = await auth();
    return user?.user;
}