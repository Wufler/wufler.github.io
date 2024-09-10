"use server"
import prisma from "@/lib/prisma";

export async function fetchProjects() {
    return await prisma.projects.findMany({
        orderBy: {
            createdAt: 'desc',
        },
        select: {
            id: true,
            title: true,
            description: true,
            img: true,
            href: true,
            category: true,
            new: true,
            updated: true,
            outdated: true,
            visible: true,
            createdAt: true,
            updatedAt: true,
        },
    });
}