'use client';

import { Todo } from '@/types/todo';
import { useState, useTransition, FormEvent } from 'react';
import { toggleTodo, deleteTodo, updateTodo } from '@/app/actions';

interface TodoItemProps {
    todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(todo.title);
    const [isPending, startTransition] = useTransition();

    function handleEditSubmit(e: FormEvent) {
        e.preventDefault();
        startTransition(async () => {
            await updateTodo(todo.id, title);
            setIsEditing(false);
        });
    }

    return (
        <div className="p-3 bg-white rounded-xl shadow mb-3 flex items-center justify-between gap-3">
            {isEditing ? (
                <form onSubmit={handleEditSubmit} className="flex-1 flex gap-2">
                    <input
                        className="border rounded p-1 flex-1 text-black"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        autoFocus
                    />
                    <button className="bg-green-600 text-white px-3 rounded">Save</button>
                </form>
            ) : (
                <>
                    <button
                        onClick={() => startTransition(() => toggleTodo(todo.id))}
                        className={`text-left flex-1 ${
                            todo.completed ? 'line-through text-gray-400' : 'text-gray-900'
                        }`}
                    >
                        {todo.title}
                    </button>

                    <button
                        onClick={() => setIsEditing(true)}
                        className="bg-blue-600 text-white py-1 px-2 rounded underline text-sm"
                    >
                        Edit
                    </button>

                    <button
                        onClick={() => startTransition(() => deleteTodo(todo.id))}
                        className="bg-red-500 text-white text-sm px-2 py-1 rounded"
                    >
                        Delete X
                    </button>
                </>
            )}
        </div>
    );
}
