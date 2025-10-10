"use client";
import React, { useEffect, useState } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import TodoTab from "./components/TodoTab";

const TodopageS = () => {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<string[]>([]);

  const [editText, setEditText] = useState("");
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const [completed, setCompleted] = useState<boolean[]>([]);

  const [tab, setTab] = useState<"all" | "done" | "not">("all");

  useEffect(() => {
    const savedIndex = localStorage.getItem("savedIndex");
    const savedCompleted = localStorage.getItem("savedCompleted");
    if (savedIndex) setTodos(JSON.parse(savedIndex));
    if (savedCompleted) setCompleted(JSON.parse(savedCompleted));
  }, []);

  useEffect(() => {
    localStorage.setItem("savedIndex", JSON.stringify(todos));
    localStorage.setItem("savedCompleted", JSON.stringify(completed));
  }, [todos, completed]);

  return (
    <div>
      <TodoInput
        text={text}
        setText={setText}
        todos={todos}
        setTodos={setTodos}
        completed={completed}
        setCompleted={setCompleted}
      />
      <TodoTab tab={tab} setTab={setTab} />
      <TodoList
        todos={todos}
        setTodos={setTodos}
        editIndex={editIndex}
        setEditIndex={setEditIndex}
        editText={editText}
        setEditText={setEditText}
        completed={completed}
        setCompleted={setCompleted}
        tab={tab}
        setTab={setTab}
      />
    </div>
  );
};

export default TodopageS;
