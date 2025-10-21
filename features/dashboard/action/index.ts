"use server"

import { currentUser } from "@/features/auth/actions";
import { db } from "@/lib/db";
import { Templates } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const createPlayground = async (data: {
    title: string,
    templete: Templates;
    description: string;
}) => {
    const { templete, title, description } = data;
    const user = await currentUser();

    try {
        const newProject = await db.project.create({
            data: {
                title,
                description,
                templete,
                userId: user?.id!
            }
        });
        return newProject;
    } catch (error) {
        console.error("Failed to create Project", error);
        throw error;
    }
}


export const getAllProject = async () => {
    const user = await currentUser();

    try {
        const user = await currentUser();
        const projects = await db.project.findMany({
            where: {
                userId: user?.id!
            },
            include: {
                user: true
            }
        })
        return projects;
    } catch (error) {
        console.error(error);
        return null
    }

}

export const deleteProjectById = async (id: string) => {
    try {
        await db.project.delete({
            where: {
                id
            }
        })
        revalidatePath("/dashboard")
    } catch (error) {
        console.error(error);
        return null
    }
}

export const editProject = async (id: string, data: { title: string, description: string }) => {
    try {
        await db.project.update({
            where: { id },
            data: data
        })
    } catch (error) {
        console.error(error);
    }
}