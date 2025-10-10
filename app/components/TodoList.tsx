"use client";
import { Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface TodoListProps {
  todos: string[];
  setTodos: (todos: string[]) => void;
  editIndex: number | null;
  setEditIndex: (index: number | null) => void;
  editText: string;
  setEditText: (text: string) => void;
  completed: boolean[];
  setCompleted: (completed: boolean[]) => void;
  tab: "all" | "done" | "not";
  setTab: (tab: "all" | "done" | "not") => void;
}

const TodoList = ({
  todos,
  setTodos,
  editIndex,
  setEditIndex,
  editText,
  setEditText,
  completed,
  setCompleted,
  tab,
  setTab,
}: TodoListProps) => {
  const handleDelete = (index: number) => {
    setTodos(todos.filter((item, i) => i !== index));
    setCompleted(completed.filter((item, i) => i !== index));
  };

  const handleEdit = (item: string, index: number) => {
    setEditIndex(index);
    setEditText(item);
  };

  const handleSave = (index: number) => {
    if (!editText.trim()) {
      toast.error("Empty?");
      return;
    }
    const newTodos = [...todos];
    newTodos[index] = editText;
    setTodos(newTodos);
    setEditIndex(null);
    setEditText("");
  };

  const handleCancel = () => {
    setEditIndex(null);
    setEditText("");
  };

  const handleComplete = (index: number) => {
    const newCompleted = [...completed];
    newCompleted[index] = !newCompleted[index];
    setCompleted(newCompleted);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const listPerPage = 6;
  const indexOfLast = currentPage * listPerPage;
  const indexOfFirst = indexOfLast - listPerPage;
  const currentList = todos.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(todos.length / listPerPage);

  useEffect(()=>{
    const newTotalPage = Math.ceil(todos.length / listPerPage)
    if(currentPage > newTotalPage) {
      setCurrentPage(newTotalPage>0 ? newTotalPage : 1)
    }
  },[currentPage, todos.length])

  return (
    <div className="flex justify-center py-10">
      <section aria-label="Todo list" className="w-200 px-4 gap-4">
        <ul>
          <AnimatePresence>
            {currentList
              .map((item, index) => ({ item, index }))
              .filter(({ index }) => {
                if (tab === "done") return completed[index];
                if (tab === "not") return !completed[index];
                return true;
              })
              .map(({ item, index }) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, scale: 1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className={`flex items-center justify-between gap-3 p-2 mb-4 bg-black/20 hover:bg-black/30 rounded-full transition shadow-xl placeholder:text-gray-400 focus:outline-none focus:bg-black/40 hover:scale-[1.02] ${
                    completed[index] ? "text-gray-400" : "text-white"
                  }`}
                >
                  {editIndex !== index ? (
                    //if not editing text
                    <div className="flex items-center gap-3 flex-1 px-1">
                      {completed && (
                        <label
                          htmlFor={`complete-checkbox-${index}`}
                          className="flex items-center cursor-pointer select-none"
                        >
                          <input
                            id={`complete-checkbox-${index}`}
                            type="checkbox"
                            checked={completed[index] || false}
                            onChange={() => handleComplete(index)}
                            className="hidden peer"
                          />
                          <span className="border-2 w-10 h-10 rounded-full border-white/20 flex items-center justify-center hover:bg-green-500 hover:border-0 peer-checked:bg-green-500 peer-checked:border-green-500 transition text-white font-bold text-lg">
                            {completed[index] ? <Check /> : null}
                          </span>
                        </label>
                      )}
                      <span
                        className={`flex-1 text-start truncate ${
                          completed[index] ? "line-through" : ""
                        }`}
                      >
                        {item}
                      </span>
                      <AnimatePresence mode="wait">
                        {completed[index] ? null : (
                          //edit text button
                          <motion.button
                            key="edit-btn"
                            initial={{ opacity: 0, scale: 1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1 }}
                            transition={{ duration: 0.1, ease: "easeOut" }}
                            onClick={() => handleEdit(item, index)}
                            className="bg-white/80 hover:bg-blue-600 hover:text-white text-black font-semibold px-4 py-2 rounded-full shadow-md transition transform hover:shadow-lg hover:scale-105"
                            aria-label={`Edit todo: ${item}`}
                          >
                            EDIT
                          </motion.button>
                        )}
                      </AnimatePresence>
                      {/* delete button */}
                      <button
                        onClick={() => handleDelete(index)}
                        className="bg-white/80 hover:bg-red-600 hover:text-white text-black font-semibold px-4 py-2 rounded-full shadow-md transition transform hover:shadow-lg hover:scale-105"
                        aria-label={`Delete todo: ${item}`}
                      >
                        DEL
                      </button>
                    </div>
                  ) : (
                    //if editing text
                    <motion.div
                      className="flex flex-1 gap-3 px-1"
                      initial={{ opacity: 0, scale: 1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1 }}
                      transition={{
                        duration: 0.9,
                        ease: "easeOut",
                      }}
                    >
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="flex-1 px-4 text-gray-100 rounded-full focus:outline-none bg-gray-300/5 hover:bg-gray-300/15 shadow-xl transition-shadow"
                      />
                      {/* save button */}
                      <button
                        onClick={() => handleSave(index)}
                        className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-full shadow-md transition transform hover:shadow-lg hover:scale-105"
                        aria-label={`Save edited todo: ${editText}`}
                      >
                        save
                      </button>
                      {/* cancel button */}
                      <button
                        onClick={handleCancel}
                        className="bg-gray-300 hover:bg-gray-400 text-black font-semibold px-4 py-2 rounded-full shadow-md transition transform hover:shadow-lg hover:scale-105"
                        aria-label="Cancel editing todo"
                      >
                        cancel
                      </button>
                    </motion.div>
                  )}
                </motion.li>
              ))}
          </AnimatePresence>
        </ul>
        <div>
          {todos.length > 6 ? (
            <div className="flex items-center justify-center gap-4 mt-6 ">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-full font-semibold transition-colors shadow-md border border-transparent ${
                  currentPage === 1
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-white/80 text-black hover:bg-blue-600 hover:text-white hover:border-blue-600 cursor-pointer"
                }`}
                aria-label="Previous page"
              >
                Prev
              </button>
              <span className="px-4 py-2 rounded-full bg-black/40 text-white font-medium shadow-inner select-none">
                {currentPage} <span className="opacity-60">/</span> {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-full font-semibold transition-colors shadow-md border border-transparent ${
                  currentPage === totalPages
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-white/80 text-black hover:bg-blue-600 hover:text-white hover:border-blue-600 cursor-pointer"
                }`}
                aria-label="Next page"
              >
                Next
              </button>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
};

export default TodoList;
