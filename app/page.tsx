import React from "react";
import TodoClean from "./TodoClean";

export const metadata = {
  title: "Todo List - Just Do It Now!",
  description: "Manage your tasks efficiently with our simple and intuitive Todo List application.",
  keywords: "todo, task manager, productivity, tasks, list",
};

const Page = () => {
  return (
    <div className="bg-gradient-to-b from-blue-950 to-blue-900 min-h-[100vh] text-center">
      <main>
        <h1 className="text-white text-5xl md:text-8xl font-bold pt-20">Just Do It Now!!!</h1>
        <div className="mx-auto">
          <TodoClean />
        </div>
      </main>
    </div>
  );
};

export default Page;
