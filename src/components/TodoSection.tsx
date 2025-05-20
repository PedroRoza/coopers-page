"use client"

import type React from "react"
import { useState } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

export default function TodoSection() {
  const user = true
  
  const todos = [{id: 0}, {id: 1}, {id: 2}]
  const completedTodos = [{id: 0}, {id: 1}, {id: 2}]
  const addTodo = ''
  const updateTodo = ''
  const deleteTodo = ''
  const completeTodo = ''
  function clearTodos(){ return true}
  const clearCompletedTodos = ''
  const moveTodo = ''


  const [newTodoText, setNewTodoText] = useState("")
  const [editingTodo, setEditingTodo] = useState<string | null>(null)
  const [editText, setEditText] = useState("")

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTodoText.trim()) {
      addTodo(newTodoText)
      setNewTodoText("")
    }
  }

  const handleEditStart = (id: string, text: string) => {
    setEditingTodo(id)
    setEditText(text)
  }

  const handleEditSave = (id: string) => {
    if (editText.trim()) {
      updateTodo(id, editText)
    }
    setEditingTodo(null)
  }

  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const { source, destination } = result

    // Se mover da lista de to-do para a lista de concluídos
    if (source.droppableId === "todoList" && destination.droppableId === "completedList") {
      const todoId = todos[source.index].id
      completeTodo(todoId)
      return
    }

    // Reordenar na mesma lista
    if (source.droppableId === destination.droppableId) {
      moveTodo(source.droppableId === "todoList" ? "todo" : "completed", source.index, destination.index)
    }
  }

  return (
    <section
      id="todo-section"
      className="relative bg-black text-white py-12 md:py-16 -skew-y-3 transform origin-top-right"
    >
      <div className="container-custom skew-y-3 transform">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">To-do List</h2>
          <p className="text-gray-300">
            Drag and drop to set your main priorities, check when done and create what's new.
          </p>
        </div>

        {user ? (
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white text-black rounded-lg overflow-hidden border-t-4 border-secondary">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">To-do</h3>
                  <p className="text-gray-600 text-sm mb-6">
                    Take a breath.
                    <br />
                    Start doing.
                  </p>

                  <Droppable droppableId="todoList">
                    {(provided) => (
                      <ul className="space-y-3" {...provided.droppableProps} ref={provided.innerRef}>
                        <li className="border-b border-gray-100 pb-3">
                          <form onSubmit={handleAddTodo} className="flex items-center">
                            <input
                              type="text"
                              value={newTodoText}
                              onChange={(e) => setNewTodoText(e.target.value)}
                              placeholder="Add new task"
                              className="flex-1 py-2 focus:outline-none"
                              aria-label="Adicionar nova tarefa"
                            />
                            <button
                              type="submit"
                              className="text-primary text-xl font-bold"
                              aria-label="Adicionar tarefa"
                            >
                              +
                            </button>
                          </form>
                        </li>

                        {todos.map((todo, index) => (
                          <Draggable key={todo.id} draggableId={todo.id} index={index}>
                            {(provided) => (
                              <li
                                className="flex items-center border-b border-gray-100 pb-3 group"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <div className="mr-3">
                                  <input
                                    type="checkbox"
                                    id={`todo-${todo.id}`}
                                    checked={false}
                                    onChange={() => completeTodo(todo.id)}
                                    className="w-5 h-5 border-2 border-gray-300 rounded-full appearance-none checked:bg-primary checked:border-primary focus:outline-none cursor-pointer"
                                    aria-label={`Marcar ${todo.text} como concluído`}
                                  />
                                  <label htmlFor={`todo-${todo.id}`} className="sr-only">
                                    Marcar como concluído
                                  </label>
                                </div>

                                {editingTodo === todo.id ? (
                                  <input
                                    type="text"
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                    onBlur={() => handleEditSave(todo.id)}
                                    onKeyDown={(e) => e.key === "Enter" && handleEditSave(todo.id)}
                                    className="flex-1 py-1 border-b border-primary focus:outline-none"
                                    autoFocus
                                  />
                                ) : (
                                  <span
                                    className="flex-1 cursor-pointer"
                                    onClick={() => handleEditStart(todo.id, todo.text)}
                                  >
                                    {todo.text}
                                  </span>
                                )}

                                <button
                                  className="opacity-0 group-hover:opacity-100 transition-opacity ml-2 text-gray-400 hover:text-gray-600"
                                  onClick={() => deleteTodo(todo.id)}
                                  aria-label={`Excluir tarefa ${todo.text}`}
                                >
                                  <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M2 4H3.33333H14"
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M5.33334 4V2.66667C5.33334 2.31305 5.47381 1.97391 5.72386 1.72386C5.97391 1.47381 6.31305 1.33334 6.66667 1.33334H9.33334C9.68696 1.33334 10.0261 1.47381 10.2761 1.72386C10.5262 1.97391 10.6667 2.31305 10.6667 2.66667V4M12.6667 4V13.3333C12.6667 13.687 12.5262 14.0261 12.2761 14.2761C12.0261 14.5262 11.687 14.6667 11.3333 14.6667H4.66667C4.31305 14.6667 3.97391 14.5262 3.72386 14.2761C3.47381 14.0261 3.33334 13.687 3.33334 13.3333V4H12.6667Z"
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </button>
                              </li>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </ul>
                    )}
                  </Droppable>

                  {todos.length > 0 && (
                    <button
                      className="w-full bg-black text-white py-3 mt-6 font-semibold lowercase"
                      onClick={clearTodos}
                      aria-label="Limpar todas as tarefas"
                    >
                      erase all
                    </button>
                  )}
                </div>
              </div>

              <div className="bg-white text-black rounded-lg overflow-hidden border-t-4 border-primary">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">Done</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    Congratulations!
                    <br />
                    <strong>You have done {completedTodos.length} tasks</strong>
                  </p>

                  <Droppable droppableId="completedList">
                    {(provided) => (
                      <ul className="space-y-3 mt-4" {...provided.droppableProps} ref={provided.innerRef}>
                        {completedTodos.map((todo, index) => (
                          <Draggable key={todo.id} draggableId={todo.id} index={index}>
                            {(provided) => (
                              <li
                                className="flex items-center border-b border-gray-100 pb-3"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <div className="mr-3">
                                  <input
                                    type="checkbox"
                                    id={`completed-${todo.id}`}
                                    checked={true}
                                    readOnly
                                    className="w-5 h-5 border-2 border-primary bg-primary rounded-full appearance-none relative"
                                    aria-label={`Tarefa ${todo.text} concluída`}
                                  />
                                  <label htmlFor={`completed-${todo.id}`} className="sr-only">
                                    Tarefa concluída
                                  </label>
                                </div>

                                <span className="flex-1 line-through text-gray-500">{todo.text}</span>

                                <span className="text-xs text-gray-400 ml-2">
                                  {new Date(todo.completedAt || Date.now()).toLocaleDateString("pt-BR", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "2-digit",
                                  })}
                                </span>
                              </li>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </ul>
                    )}
                  </Droppable>

                  {completedTodos.length > 0 && (
                    <button
                      className="w-full bg-black text-white py-3 mt-6 font-semibold lowercase"
                      onClick={clearCompletedTodos}
                      aria-label="Limpar todas as tarefas concluídas"
                    >
                      erase all
                    </button>
                  )}
                </div>
              </div>
            </div>
          </DragDropContext>
        ) : (
          <div className="bg-white text-black p-8 rounded-lg text-center max-w-md mx-auto">
            <p className="text-lg">Faça login para gerenciar suas tarefas</p>
          </div>
        )}
      </div>

      {/* Elemento decorativo verde no canto inferior esquerdo */}
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-primary skew-y-3 transform -translate-y-1/2"></div>
    </section>
  )
}
