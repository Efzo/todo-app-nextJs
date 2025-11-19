'use client';

import { useState, useTransition, FormEvent } from "react";
import { addTodo } from "@/app/actions";

export default function TodoForm() {
    const [title, setTitle] = useState('');
    const [isPending, startTransition] = useTransition();

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (!title.trim()) return;

        startTransition(() => addTodo(title));
        setTitle('');
    }

    return (
        <form onSubmit={handleSubmit} className="flex gap-2">
            <input
                type="text"
                placeholder="Add a todo..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="flex-1 p-2 rounded-xl border border-gray-300"
            />
            <button type="submit" className="bg-blue-600 text-white px-4 rounded-xl">
                Add
            </button>
        </form>
    );
}
