"use server"

import { currentUser } from "@/features/auth/actions"
import { db } from "@/lib/db";
import { ReactFolder } from "../lib/path-to-json";



export const getReactIdeById = async (id: string) => {
    try {
        const user = await currentUser();

        const reactIde = await db.project.findUnique({
            where: { id },

            select: {
                title: true,
                description: true,
                reactFiles: {
                    select: {
                        content: true
                    }
                }
            }

        })
        return reactIde;
    } catch (error) {
        console.error(error)
    }
}

export const SaveUpdateCode = async (projectId: string, data: ReactFolder) => {
    const user = await currentUser();

    if (!user) return null;

    try {
        const upadateReactIde = await db.reactFiles.upsert({
            where: { projectId },
            update: { content: JSON.stringify(data) },
            create: {
                projectId,
                content: JSON.stringify(data)
            }
        })
        return upadateReactIde;
    } catch (error) {
        console.log("SaveUpdatedCode error:", error);
        return null;
    }
}