"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import api from "@/services/api";
import { useTasks } from "@/context/TaskContext";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function TaskForm() {
  const { refreshTasks, updateTask, createTask } = useTasks();

  const router = useRouter();
  const searchParams = useSearchParams();
  const taskId = searchParams.get("id"); // Obtém o ID da URL (se houver)

  const [end, setEnd] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("PENDENTE");


  // Buscar dados da tarefa ao carregar a página se for edição
  useEffect(() => {
    if (taskId) {
      api.get(`/task/${taskId}`)
        .then((response) => {
          const task = response.data;
          setTitle(task.title);
          setEnd(task.endData ?? null);
          setDescription(task.description);
          setStatus(task.status);
        })
        .catch((error) => {toast.error("Ops! Obtvemos um erro ao buscar os dados dessa tarefa!")});
    }
  }, [taskId]);


  useEffect(() =>{

    if(status != "CONCLUIDO"){
      setEnd(null);
    }

  },[status]);


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnd(event.target.value || null);
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if(status == "CONCLUIDO" && end == null){
      return toast.error("Preencha a data de finalização");
    }

    const  putTaskData = { id: taskId, title, description, status,endData: end || null};
    const taskData = { title, description, status }

    try {
      if (taskId) {

        updateTask(putTaskData);
        toast.success("Tarefa atualizada com sucesso!");
      } else {
        createTask(taskData);
        toast.success("Tarefa criada com sucesso!");
      }
      refreshTasks();
      router.push("/");
    } catch (error) {
      toast.error("Ops! Obtvemos um erro ao processar as informações! Tente novamente daqui alguns segundos.")
    }
  };

  return (
    <div className="bg-white flex items-center flex-col h-dvh dark:bg-gray-800 rounded-lg px-6 py-8 ring shadow-xl ring-gray-900/5">
      <h1 className="text-2xl text-center font-bold mb-4">
        {taskId ? "Editar Tarefa" : "Criar Nova Tarefa"}
      </h1>

      <button  className="absolute left-3 flex flex-row w-25 h-10 items-center cursor-pointer text-white p-2 rounded hover:bg-blue-600" onClick={() => router.push("/")}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 mr-2">
        <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clipRule="evenodd" />
      </svg>
        Voltar
      </button>

      <form onSubmit={handleSubmit} className="w-150 mt-10 ">
        <p className="text-gray-200 text-2xl">Titulo da Tarefa:</p>
        <input
          className="w-100 p-2 rounded bg-white text-gray-700 m-2 "
          type="text"
          maxLength={30}
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <p className="text-gray-200 text-2xl mt-4">Descrição da Tarefa:</p>
        <textarea
          className="w-full p-2 rounded bg-white text-gray-700 m-2 h-30 max-h-30"
          placeholder="Descrição"
          
          maxLength={255}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <div className="flex flex-row justify-between items-center mt-4">
          <p className="text-gray-200 text-lg">Selecione um Status para esta Tarefa:</p>
          <select
            className="w-50 p-3 h-10 text-[14px] cursor-pointer bg-blue-500 rounded ml-5 focus:outline-none focus:ring-0"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option className="text-black bg-white" value="PENDENTE">Pendente</option>
            <option className="text-black bg-white" value="EM_ANDAMENTO">Em andamento</option>
            <option className="text-black bg-white"  value="CONCLUIDO">Concluído</option>
          </select>
        </div>

        {status == "CONCLUIDO" ? <div  className="flex flex-row justify-between items-center mt-4"> <p className="text-gray-200 text-lg">Selecione a Data em que foi concluida:</p> <input type="datetime-local"  onChange={handleChange} id="datetime" className="p-2 ml-5 bg-white text-gray-700 cursor-pointer rounded-md shadow-sm focus:outline-none focus:ring-0" value={end || ""}/> </div> : <div></div> } 
      
      <div className="flex justify-center mt-9">
        <button
          className="w-60 bg-green-500 text-white p-2 rounded hover:bg-green-700 cursor-pointer"
          type="submit"
        >
          {taskId ? "Salvar Alterações" : "Criar Tarefa"}
        </button> 
      </div>

      </form>
    </div>
  );
}
