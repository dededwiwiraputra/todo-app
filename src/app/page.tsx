import Image from "next/image";
import TodoApp from "./components/TodoApp";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-gray-100 dark:bg-gray-900">
      <TodoApp />
    </main>
  );
}
