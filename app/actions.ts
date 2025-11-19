'use server';

import { prisma } from '@/db/prisma';
import {revalidatePath} from "next/cache";


export async function getTodos() {
    return prisma.todo.findMany({
        orderBy: { createdAt: 'desc' },
    });
}

export async function addTodo(title: string) {
    if (!title.trim()) return;
    await prisma.todo.create({
        data: { title },
    });

    revalidatePath("/")
}

export async function toggleTodo(id: number) {
    const todo = await prisma.todo.findUnique({ where: { id } });
    if (!todo) return;

    await prisma.todo.update({
        where: { id },
        data: { completed: !todo.completed },
    });

    revalidatePath("/")
}

export async function deleteTodo(id: number) {
    await prisma.todo.delete({ where: { id } });
    revalidatePath("/")
}

export async function updateTodo(id: number, title: string) {
    if (!title.trim()) return;
    await prisma.todo.update({
        where: { id },
        data: { title },
    });

    revalidatePath("/")
}
