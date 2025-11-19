import { getTodos } from '@/app/actions';
import TodoItem from '@/components/TodoItem';
import TodoForm from '@/components/TodoForm';

export default async function Page() {
    const todos = await getTodos();

    return (
        <main className="max-w-lg mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6 text-center">Todo App</h1>

            <TodoForm />

            <div className="mt-6">
                {todos.length === 0 ? (
                    <p className="text-center text-gray-500">No todos yet. Add one!</p>
                ) : (
                    todos.map((t) => <TodoItem key={t.id} todo={t} />)
                )}
            </div>
        </main>
    );
}
