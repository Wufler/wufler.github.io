"use server"
import { prisma } from "@/lib/prisma";

export async function fetchProjects() {
    return await prisma.projects.findMany({
        orderBy: {
            createdAt: 'desc',
        },
    });
}

export async function fetchBuilds() {
    return await prisma.builds.findMany({
        orderBy: {
            createdAt: 'desc',
        },
    });
}