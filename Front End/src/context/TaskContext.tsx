"use client";
import { createContext, useContext, useState } from "react";
import useSWR from "swr";
import api from "@/services/api";

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  dateCreate: string;
  endDate?: string;
}

interface TaskContextProps {
  tasks: Task[];
  isLoading: boolean;
  createTask: (task: Omit<Task, "id">) => Promise<void>;
  updateTask: (updatedTask: []) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  refreshTasks: () => void;
  totalPages: number;
  ordem: string;
  setOrdem: (page: string) =>void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export function TaskProvider({ children }: { children: React.ReactNode }) {

    const [ordem, setOrdem] = useState<"asc" | "desc">("desc");
    const [currentPage, setCurrentPage] = useState(0);
    const [numberPages, setNumberPages] = useState(0);
    const [status, setStatus] = useState("");
    const tasksPerPage = 4;
    
    const { data, error, mutate } = useSWR(`/task?page=${currentPage}&size=${tasksPerPage}&status=${status}&sortBy=dataCreate&direction=${ordem}`, async () => {
        const response = await api.get(`/task?page=${currentPage}&size=${tasksPerPage}&status=${status}&sortBy=dataCreate&direction=${ordem}`);
        setNumberPages(response.data.totalPages);
        return response.data.content;
      });
      

  const createTask = async (task: Omit<Task, "id">) => {
    await api.post("/task", task);
    mutate();
  };

  const updateTask = async ( updatedTask: []) => {
    await api.put("/task", updatedTask);
    mutate();
  };

  const deleteTask = async (id: string) => {
    await api.delete(`/task/${id}`);
    mutate();
  };

  return (
    <TaskContext.Provider
      value={{ tasks: data || [], isLoading: !data && !error, createTask, updateTask, deleteTask, totalPages:numberPages,  currentPage, setCurrentPage, refreshTasks: mutate, ordem, setOrdem, setStatus, status}}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks deve ser usado dentro do TaskProvider");
  return context;
}
