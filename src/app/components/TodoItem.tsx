"use client";

import React from "react";
import { useTodoStore } from "../storeItem/TodoStoreItem";
import { CheckCircle, Circle, X } from "lucide-react";

interface TodoItemProps {
  id: string;
  text: string;
  completed: boolean;
}

export default function TodoItem({ id, text, completed }: TodoItemProps) {
  const { toggleTodo, removeTodo } = useTodoStore();

  return (
    <li
      className={`flex justify-between items-center bg-white dark:bg-gray-800 px-4 py-3 rounded-md shadow ${
        completed
          ? "line-through text-gray-400"
          : "text-gray-800 dark:text-white"
      }`}
    >
      <button onClick={() => toggleTodo(id)} className="mr-3">
        {completed ? (
          <CheckCircle className="text-green-500" size={20} />
        ) : (
          <Circle className="text-gray-400" size={20} />
        )}
      </button>
      <span className="flex-1">{text}</span>
      <button onClick={() => removeTodo(id)}>
        <X size={16} className="text-red-500 hover:text-red-700" />
      </button>
    </li>
  );
}
