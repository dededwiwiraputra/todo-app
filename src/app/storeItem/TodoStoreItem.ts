import { create } from "zustand";

export type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

type Filter = "all" | "active" | "completed";

type TodoStore = {
  todos: Todo[];
  filter: Filter;
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  removeTodo: (id: string) => void;
  clearCompleted: () => void;
  setFilter: (filter: Filter) => void;
  setTodos: (todos: Todo[]) => void;
  lastTodos: Todo[] | null;
  clearAll: () => void;
  restoreLastTodos: () => void;
};

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  filter: "all",
  addTodo: (text) =>
    set((state) => ({
      todos: [
        ...state.todos,
        { id: crypto.randomUUID(), text, completed: false },
      ],
    })),
  toggleTodo: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    })),
  removeTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),
  clearCompleted: () =>
    set((state) => ({
      todos: state.todos.filter((todo) => !todo.completed),
    })),
  setFilter: (filter) => set({ filter }),
  setTodos: (todos) => set({ todos }),
  lastTodos: null,
  clearAll: () =>
    set((state) => ({
      lastTodos: state.todos,
      todos: [],
    })),
  restoreLastTodos: () =>
    set((state) =>
      state.lastTodos ? { todos: state.lastTodos, lastTodos: null } : {}
    ),
}));
