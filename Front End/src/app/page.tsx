"use client";

import { useEffect, useState } from "react";
import { useTasks } from "@/context/TaskContext";
import Link from "next/link";

import { toast } from "react-toastify";


export default function Home() {
  
  const { tasks, isLoading, totalPages, currentPage, setCurrentPage, updateTask, setOrdem, ordem, refreshTasks, deleteTask, status, setStatus } = useTasks();

  useEffect(()=>{
    
    refreshTasks();
  },[ordem])


  //toast de mensagem para o delete
  const confirmDelete = (id) => {
    toast.info(
      <div>
        <p>Tem certeza que deseja excluir esta tarefa?</p>
        <div className="flex justify-end gap-2 mt-3">
          <button
            onClick={() => toast.dismiss()} // Fecha o toast
            className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              toast.dismiss();
              deleteTask(id);
            }}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Confirmar
          </button>
        </div>
      </div>,
      { autoClose: false }
    );
  };

  if (isLoading) return <div className="text-center flex flex-row justify-center mt-4">
        <button className="flex flex-row justify-around  absolute w-50">    
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 animate-bounce">
          <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-.53 14.03a.75.75 0 0 0 1.06 0l3-3a.75.75 0 1 0-1.06-1.06l-1.72 1.72V8.25a.75.75 0 0 0-1.5 0v5.69l-1.72-1.72a.75.75 0 0 0-1.06 1.06l3 3Z" clipRule="evenodd" />
        </svg>

          Carregando tarefas...
        </button>
    </div>;



  return (
    <div className=" h-dvh w-dvw bg-white dark:bg-gray-800 rounded-lg px-6 py-8 ring shadow-xl ring-gray-900/5">
      <Link href="/task-form">
        <button className="flex flex-row justify-around w-50 px-4 py-2 absolute mr-70 right-0 bg-purple-500 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 rounded-md cursor-pointer hover:bg-purple-800">
          Nova Tarefa
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 ">
            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule="evenodd" />
          </svg>
        </button>
    </Link>
    <h1 className="text-center text-2xl font-bold mb-4">Lista de Tarefas</h1>
    
    {/* Filtros */}
    <div className="flex gap-4 mb-4">
      <div className="flex flex-row justify-center ml-20 items-center">
        <p>Filtrar por:</p>
        <button
            className="bg-blue-500 flex flex-row ml-2 mr-4 cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => setOrdem(ordem === "asc" ? "desc" : "asc")}
            >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
              <path fillRule="evenodd" d="M3.792 2.938A49.069 49.069 0 0 1 12 2.25c2.797 0 5.54.236 8.209.688a1.857 1.857 0 0 1 1.541 1.836v1.044a3 3 0 0 1-.879 2.121l-6.182 6.182a1.5 1.5 0 0 0-.439 1.061v2.927a3 3 0 0 1-1.658 2.684l-1.757.878A.75.75 0 0 1 9.75 21v-5.818a1.5 1.5 0 0 0-.44-1.06L3.13 7.938a3 3 0 0 1-.879-2.121V4.774c0-.897.64-1.683 1.542-1.836Z" clipRule="evenodd" />
            </svg>

            {ordem === "asc" ? "Mais Antigas" : "Mais Recentes"}
        </button>
        <p>Listar:</p>
            <select
            className=" ml-2 p-2 rounded bg-gray-300 text-black"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">Todos</option>
              <option value="PENDENTE">Pendente</option>
              <option value="EM_ANDAMENTO">Em andamento</option>
              <option value="CONCLUIDO">Concluído</option>
          </select>
      </div>    
      
    </div>
    <div className="justify-items-center">

    {/* Lista de Tarefas */}
    {isLoading ? (
        <p className="text-gray-500">Carregando ...</p>
    ) : tasks.length === 0 ? (
      <p className="text-gray-500">Nenhuma tarefa encontrada.</p>
    ) : (
      <ul className="w-300 pt-4  grid grid-cols-2 justify-items-center">
  
        {tasks.map((task) => (
          <li key={task.id} className="w-125 p-2 mb-8 h-54  rounded-lg bg-gray-100">

              <div className="flex flex-row items-center">
                 
                <Link href={`/task-form?id=${task.id}`}>
                  <button className=" text-black h-8 w-8 cursor-pointer items-center transition-opacity duration-300 hover:opacity-50">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4  ml-3">
                      <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                    </svg>
                    
                  </button>
                </Link>
                
                <h2 className="font-semibold text-center basis-128 text-gray-800">{task.title}</h2>
                
                <button onClick={()=> confirmDelete(task.id)} className=" text-red-500 h-8 w-8 cursor-pointer items-center transition-opacity duration-300 hover:opacity-50">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                      <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                    </svg>
                </button>
              
              </div>

            <p className="text-gray-800 h-25 bg-gray-300 rounded-lg text-sm pl-2 pt- break-words">{task.description}</p>
            <div className="flex justify-between m-1">

              <span className="text-[12px] text-gray-600">Criado em: {new Date(task.dataCreate).toLocaleDateString("pt-BR")}</span>

              {
                task.status === "CONCLUIDO" ? <span className="text-[12px] text-gray-500">Finalizado em: {new Date(task.endData).toLocaleDateString("pt-BR")}</span> :  <span className="text-sm text-gray-500">Status: {task.status}</span>
              }
             
            </div>
            <button
                  className={`h-8 items-center transition-all duration-300  flex justify-around  text-white rounded ${
                    task.status === "CONCLUIDO" ? "bg-green-500 w-full" : "cursor-pointer w-50 bg-gray-500 hover:bg-green-600"
                  }`}
                  disabled={task.status === "CONCLUIDO"}
                  onClick={() => updateTask({ id: task.id, endData: new Date(), title: task.title, description: task.description, status: "CONCLUIDO" })}
                >

                  {task.status === "CONCLUIDO" ? "Concluído" : "Marcar como Concluído"}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                  </svg>

            </button>
          </li>
        ))}
      </ul>
    )}
    </div>

   
     <div className="absolute bottom-2 w-full flex justify-center ">
        <button
          className={`px-4 py-2 mr-2 rounded-md ${currentPage === 0 ? "opacity-50 cursor-not-allowed" : "bg-blue-400 hover:bg-gray-300 hover:text-gray-950"}`}
          disabled={currentPage === 0}
          onClick={() => setCurrentPage(currentPage -1)}
        >
          Anterior
        </button>
        <span className="px-4 py-2">{currentPage + 1 } de {totalPages}</span>
        <button
          className={`px-4 py-2 ml-2 rounded-md ${currentPage === totalPages -1 ? "opacity-50 cursor-not-allowed" : "bg-blue-400 hover:bg-gray-300 hover:text-gray-950"}`}
          disabled={currentPage  === totalPages -1}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Próxima
        </button>
      </div>
  </div>
  );
}
