"use client";

import React, { useState } from "react";
import { useTodoStore } from "../storeItem/TodoStoreItem";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import TodoItem from "./TodoItem";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

export default function TodoApp() {
  const [newTodo, setNewTodo] = useState("");
  const {
    todos,
    addTodo,
    setTodos,
    filter,
    setFilter,
    clearCompleted,
    clearAll,
    restoreLastTodos,
  } = useTodoStore();

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const handleAddTodo = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newTodo.trim()) {
      addTodo(newTodo.trim());
      setNewTodo("");
    }
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const newTodos = [...todos];
    const [reorderedItem] = newTodos.splice(result.source.index, 1);
    newTodos.splice(result.destination.index, 0, reorderedItem);

    setTodos(newTodos);
  };

  return (
    <section className="w-full max-w-xl p-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">
        TODO
      </h1>

      <div className="mt-6 flex justify-between text-sm text-gray-500 dark:text-gray-400">
        <span>{todos.filter((t) => !t.completed).length} items left</span>
        <div className="">
          <button onClick={clearCompleted} className="hover:text-blue-500">
            Clear Completed
          </button>
          <button onClick={clearAll} className="hover:text-red-500 ms-4">
            Clear All
          </button>
          <button
            onClick={restoreLastTodos}
            className="hover:text-green-500 ms-4"
          >
            Undo Clear
          </button>
        </div>
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-3 rounded-md shadow">
        <input
          type="text"
          className="flex-1 bg-transparent outline-none text-gray-700 dark:text-white"
          placeholder="Create a new todo..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={handleAddTodo}
        />
      </div>

      <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
        <div className="flex justify-center gap-2">
          {(["all", "active", "completed"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded transition-colors duration-300 ${
                filter === f
                  ? "bg-blue-500 text-white"
                  : "text-gray-500 hover:text-blue-500"
              }`}
            >
              {f[0].toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Drag & Drop List */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="todos">
          {(provided) => (
            <ul
              className="mt-6 space-y-2"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {filteredTodos.map((todo, index) => (
                <Draggable key={todo.id} draggableId={todo.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <TodoItem
                        id={todo.id}
                        text={todo.text}
                        completed={todo.completed}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </section>
  );
}
