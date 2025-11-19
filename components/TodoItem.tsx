'use client';

import { useState, useTransition } from 'react';
import { Todo } from '@/types/todo';
import { toggleTodo, deleteTodo, updateTodo } from '@/app/actions';

export default function TodoItem({ todo }: { todo: Todo }) {
    const [isPending, startTransition] = useTransition();
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(todo.title);

    function handleEditSubmit() {
        if (editTitle.trim() && editTitle !== todo.title) {
            startTransition(() => updateTodo(todo.id, editTitle));
        }
        setIsEditing(false);
    }

    return (
        <div className="flex items-center justify-between p-3 bg-white rounded-xl shadow mb-3">
            {isEditing ? (
                <input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    onBlur={handleEditSubmit}
                    onKeyDown={(e) => e.key === 'Enter' && handleEditSubmit()}
                    className="flex-1 border rounded-xl p-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 "
                    autoFocus
                />
            ) : (
                <button
                    onClick={() => setIsEditing(true)}
                    className={`text-left flex-1 ${todo.completed ? 'line-through text-gray-400' : 'text-gray-900'}`}
                >
                    {todo.title}
                </button>
            )}

            <button
                onClick={() => startTransition(() => toggleTodo(todo.id))}
                className={`mr-2 text-sm px-2 py-1 rounded-lg ${todo.completed ? 'bg-green-500 text-white' : 'bg-green-600 text-black'}`}
            >
                {todo.completed ? '✓' : '◻ '}
            </button>

            <button
                onClick={() => startTransition(() => deleteTodo(todo.id))}
                className="bg-red-500 text-white text-sm px-2 py-1 rounded-lg"
            >
                Delete X
            </button>
        </div>
    );
}
