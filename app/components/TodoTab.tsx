"use client";
import React from "react";

interface TodoTabProps {
  tab: "all" | "done" | "not";
  setTab: (tab: "all" | "done" | "not") => void;
}

const TodoTab = ({ tab, setTab }: TodoTabProps) => {
  return (
    <section aria-label="Todo filter tabs">
      <nav aria-label="Todo filters" className="flex text-start w-full gap-2 px-5 justify-center">
        <button
          onClick={() => setTab("all")}
          aria-pressed={tab === "all"}
          aria-label="Show all todos"
          className={`w-15 px-2 py-2 flex justify-center rounded-full font-semibold transition transform hover:scale-105 ${
            tab === "all"
              ? "bg-black text-white shadow-md"
              : "bg-gray-200 text-black hover:bg-black hover:text-white"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setTab("done")}
          aria-pressed={tab === "done"}
          aria-label="Show completed todos"
          className={`w-15 px-2 py-2 flex justify-center rounded-full font-semibold transition transform hover:scale-105 ${
            tab === "done"
              ? "bg-black text-white shadow-md"
              : "bg-gray-200 text-black hover:bg-black hover:text-white"
          }`}
        >
          Done
        </button>
        <button
          onClick={() => setTab("not")}
          aria-pressed={tab === "not"}
          aria-label="Show pending todos"
          className={`w-15 px-2 py-2 flex justify-center rounded-full font-semibold transition transform hover:scale-105 ${
            tab === "not"
              ? "bg-black text-white shadow-md"
              : "bg-gray-200 text-black hover:bg-black hover:text-white"
          }`}
        >
          Todo
        </button>
      </nav>
    </section>
  );
};

export default TodoTab;
