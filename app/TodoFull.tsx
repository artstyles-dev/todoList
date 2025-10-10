"use client";
import { useState, useEffect } from "react";
import { ArrowDownToLine, Check, Pencil, Trash, X } from "lucide-react";
import toast from "react-hot-toast";
import { motion } from "motion/react";

const TodoFull = () => {
  const [text, setText] = useState<string>(""); //text in input
  const [todos, setTodos] = useState<string[]>([]); // list of todos when click add

  //edit
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingText, setEditingText] = useState<string>("");

  //active
  const [activeIndex, setActiveIndex] = useState<boolean[]>([]);

  //tab
  const [tab, setTab] = useState<"all" | "done" | "not">("all");

  // load from localstorage json.parse is to convert string to array for show
  useEffect(() => {
    const savedTodos = localStorage.getItem("saved");
    const savedActive = localStorage.getItem("active");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
    if (savedActive) {
      setActiveIndex(JSON.parse(savedActive));
    }
  }, []);

  // when have change todos = save to localstorage json.stringify is to convert array to string for save
  useEffect(() => {
    localStorage.setItem("saved", JSON.stringify(todos));
    localStorage.setItem("active", JSON.stringify(activeIndex));
  }, [activeIndex, todos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) {
      toast.error("Please enter a todo list.");
      return;
    }
    setTodos([text, ...todos]);
    setActiveIndex([false, ...activeIndex]);
    setText("");
  };

  const handleActive = (index: number) => {
    const newActiveIndex = [...activeIndex];
    newActiveIndex[index] = !newActiveIndex[index];
    setActiveIndex(newActiveIndex);
  };

  const handleDelete = (index: number) => {
    setTodos(todos.filter((item, i) => i !== index));
  };

  const handleSave = (index: number) => {
    const newTodos = [...todos];
    newTodos[index] = editingText;
    if (!editingText.trim()) {
      toast.error("Please enter a editing todo.");
      return;
    }
    setTodos(newTodos);
    setEditingIndex(null);
    setEditingText("");
  };

  const handleCancel = () => {
    setEditingIndex(null);
  };

  const handleEdit = (item: string, index: number) => {
    setEditingIndex(index);
    setEditingText(item);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-950 to-blue-900 flex justify-center">
      <div className="w-fit py-30 flex flex-col items-center">
        <h1 className="text-6xl font-bold mb-8 text-white md:text-8xl">
          Just do it now!!
        </h1>
        {/* text */}
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-5 m-8"
        >
          <div className="flex gap-3">
            <input
              className="flex-1 px-6 py-4 text-white bg-black/20 hover:bg-black/30 rounded-full transition shadow-xl placeholder:text-gray-400 focus:outline-none focus:bg-black/40 "
              type="text"
              placeholder="Add a new todo..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button
              type="submit"
              className="bg-white/80 hover:bg-white rounded-full font-semibold px-6 py-4 text-lg shadow-xl transition transform hover:scale-105"
            >
              Add
            </button>
          </div>
        </form>
        {/* select */}
        <nav aria-label="Todo filters" className="flex text-start w-full gap-2 px-5 mb-8 justify-center">
          <button
            onClick={() => setTab("all")}
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
            className={`w-15 px-2 py-2 flex justify-center rounded-full font-semibold transition transform hover:scale-105 ${
              tab === "not"
                ? "bg-black text-white shadow-md"
                : "bg-gray-200 text-black hover:bg-black hover:text-white"
            }`}
          >
            Todo
          </button>
        </nav>

        {/* todo */}

        <ul className="w-full flex flex-col gap-4">
          {todos
            .map((item, index) => ({ item, index }))
            .filter(({ index }) => {
              if (tab === "done") return activeIndex[index];
              if (tab === "not") return !activeIndex[index];
              return true;
            })
            .map(({ item, index }) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, scale: 1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.7,
                  ease: "easeOut",
                }}
                className={`flex items-center justify-between gap-3 p-2 bg-black/20 hover:bg-black/30 rounded-full transition shadow-xl placeholder:text-gray-400 focus:outline-none focus:bg-black/40 hover:scale-[1.02] ${
                  activeIndex[index]
                    ? "text-gray-400 line-through"
                    : "text-white"
                }`}
              >
                {/* tick done */}
                <div className="flex items-center gap-3 flex-1">
                  {editingIndex !== index && (
                    <label className="flex items-center cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={activeIndex[index] || false}
                        onChange={() => handleActive(index)}
                        className="hidden peer"
                      />
                      <span className="border-2 w-10 h-10 rounded-full border-white/20 flex items-center justify-center hover:bg-green-500 hover:border-0 peer-checked:bg-green-500 peer-checked:border-green-500 transition text-white font-bold text-lg">
                        {activeIndex[index] ? <Check /> : null}
                      </span>
                    </label>
                  )}
                  {/* edit input */}
                  {editingIndex === index ? (
                    <input
                      type="text"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      className="flex-1 px-3 py-2 text-gray-100 rounded-full focus:outline-none bg-gray-300/5 hover:bg-gray-300/15 shadow-xl transition-shadow"
                    />
                  ) : (
                    <span className="flex-1 truncate">{item}</span>
                  )}
                </div>

                <div className="flex gap-3">
                  {editingIndex === index ? (
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleSave(index)}
                        className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-full shadow-md transition transform hover:shadow-lg hover:scale-105"
                      >
                        <ArrowDownToLine />
                      </button>
                      <button
                        onClick={handleCancel}
                        className="bg-gray-300 hover:bg-gray-400 text-black font-semibold px-4 py-2 rounded-full shadow-md transition transform hover:shadow-lg hover:scale-105"
                      >
                        <X />
                      </button>
                    </div>
                  ) : (
                    <>
                      {activeIndex[index] ? null : (
                        <button
                          onClick={() => handleEdit(item, index)}
                          className="bg-white/80 hover:bg-blue-600 hover:text-white text-black font-semibold px-4 py-2 rounded-full shadow-md transition transform hover:shadow-lg hover:scale-105"
                        >
                          <Pencil />
                        </button>
                      )}

                      <button
                        onClick={() => handleDelete(index)}
                        className="bg-white/80 hover:bg-red-600 hover:text-white text-black font-semibold px-4 py-2 rounded-full shadow-md transition transform hover:shadow-lg hover:scale-105"
                      >
                        <Trash />
                      </button>
                    </>
                  )}
                </div>
              </motion.li>
            ))}
        </ul>
        {/* todo */}
      </div>
    </main>
  );
};

export default TodoFull;
