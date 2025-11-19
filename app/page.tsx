import { getTodos } from "@/app/actions";
import TodoForm from "@/components/TodoForm";
import TodoItemList from "@/components/TodoItemList";

export default async function Page() {
    const todos = await getTodos();

    return (
        <main className="max-w-lg mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6 text-center">Todo App</h1>

            {/* Client-side interactive form */}
            <TodoForm />

            {/* Client-side interactive todo list */}
            <TodoItemList todos={todos} />
        </main>
    );
}
