'use client'

import { Task } from "app/types";
import { useState } from "react";
import { TasksContext } from "./contexts";

export default function TasksProvider({ children }: {children: React.ReactNode}) {
  const [tasks, setTasks] = useState<Task[]>([])

  return (
    <TasksContext.Provider value={{tasks, setTasks}} >
      {children}
    </TasksContext.Provider>
  );
}