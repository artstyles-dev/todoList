"use client";
import React from "react";
import toast from "react-hot-toast";

interface TodoInputProps {
  text: string;
  setText: (text: string) => void;
  todos: string[];
  setTodos: (todos: string[]) => void;
  completed: boolean[]
  setCompleted: (completed: boolean[])=> void
}

const TodoInput = ({ text, setText, todos, setTodos, completed, setCompleted }: TodoInputProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text.trim()) {
      toast.error("Please enter a todo successfully!")
      return;
    }
    setTodos([text, ...todos]);
    setCompleted([false, ...completed])
    setText("");
  };

  return (
    <section aria-label="Add new todo" className="flex justify-center my-10">
      <form onSubmit={handleSubmit} className="w-200 px-4 flex gap-4">
        <label htmlFor="todo-input" className="sr-only">Add new todo</label>
        <input
          id="todo-input"
          type="text"
          value={text}
          placeholder="What needs to be succeeded?"
          onChange={(e) => {
            setText(e.target.value);
          }}
          className="flex-1 px-6 py-4 text-white bg-black/20 hover:bg-black/30 rounded-full transition shadow-xl placeholder:text-gray-400 focus:outline-none focus:bg-black/40 "
        />
        <button
          type="submit"
          aria-label="Add todo"
          className="bg-white/80 hover:bg-white rounded-full font-semibold px-6 py-4 text-lg shadow-xl transition transform hover:scale-105"
        >
          add
        </button>
      </form>
    </section>
  );
};

export default TodoInput;
