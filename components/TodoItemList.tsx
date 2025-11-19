'use client';

import { Todo } from "@/types/todo";
import TodoItem from "./TodoItem";

interface TodoItemListProps {
    todos: Todo[];
}

export default function TodoItemList({ todos }: TodoItemListProps) {
    if (!todos || todos.length === 0) {
        return <p className="text-center text-gray-500">No todos yet. Add one!</p>;
    }

    return (
        <div className="mt-6">
            {todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
            ))}
        </div>
    );
}
