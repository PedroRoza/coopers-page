"use client"

import { useEffect, useState } from "react"
import { DndProvider, useDrag, useDrop } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { TouchBackend } from "react-dnd-touch-backend"
import { useMediaQuery } from "@/hooks/use-media-query"

interface TodoItem {
  id: number
  content: string
  completed: boolean
  isEditing?: boolean
}

const ItemTypes = {
  TODO: "todo",
}

function TodoItem({
  item,
  index,
  moveItem,
  toggleComplete,
  deleteItem,
  startEditing,
  updateItemContent,
  finishEditing,
}: {
  item: TodoItem
  index: number
  moveItem: (dragIndex: number, hoverIndex: number) => void
  toggleComplete: (id: number) => void
  deleteItem: (id: number) => void
  startEditing: (id: number) => void
  updateItemContent: (id: number, content: string) => void
  finishEditing: (id: number) => void
}) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.TODO,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }))

  const [, drop] = useDrop(() => ({
    accept: ItemTypes.TODO,
    hover: (draggedItem: { index: number }) => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index)
        draggedItem.index = index
      }
    },
  }))

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`flex items-center p-2 mb-2 border-b border-gray-200 group ${isDragging ? "opacity-50" : "opacity-100"}`}
      style={{ cursor: "move" }}
    >
      <button
        onClick={() => toggleComplete(item.id)}
        aria-label={`Mark "${item.content}" as ${item.completed ? "incomplete" : "complete"}`}
        className={`w-8 h-8 mr-3 rounded-full flex items-center justify-center transition-colors duration-200
          ${item.completed ? "bg-green-500" : "bg-white-500 border-2 border-orange-500"}`}
      >
      </button>

      {item.isEditing ? (
        <input
          type="text"
          value={item.content}
          onChange={(e) => updateItemContent(item.id, e.target.value)}
          onBlur={() => finishEditing(item.id)}
          onKeyDown={(e) => e.key === "Enter" && finishEditing(item.id)}
          className="flex-grow p-1 border border-gray-300 rounded"
          autoFocus
        />
      ) : (
        <span onClick={() => startEditing(item.id)} className="flex-grow cursor-text">
          {item.content}
        </span>
      )}

      <button
        onClick={() => deleteItem(item.id)}
        className="ml-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100"
        aria-label={`Delete "${item.content}"`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 6h18"></path>
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
        </svg>
      </button>
    </div>
  )
}

export default function TodoSection() {
  const [todoItems, setTodoItems] = useState<TodoItem[]>([])
  const [completedItems, setCompletedItems] = useState<TodoItem[]>([])
  const [newTaskText, setNewTaskText] = useState("")

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await fetch("/api/todos")
        const data = await res.json()
        const mappedTodos = data.map((todo: any) => ({
          id: todo.id,
          content: todo.content,
          completed: todo.completed,
        }))
        setTodoItems(mappedTodos.filter((todo: TodoItem) => !todo.completed))
        setCompletedItems(mappedTodos.filter((todo: TodoItem) => todo.completed))
      } catch (error) {
        console.error("Failed to fetch todos", error)
      }
    }

    fetchTodos()
  }, [])

  const isMobile = useMediaQuery("(max-width: 768px)")
  const Backend = isMobile ? TouchBackend : HTML5Backend

  const moveItem = (dragIndex: number, hoverIndex: number) => {
    const draggedItem = todoItems[dragIndex]
    const newItems = [...todoItems]
    newItems.splice(dragIndex, 1)
    newItems.splice(hoverIndex, 0, draggedItem)
    setTodoItems(newItems)
  }

  const toggleComplete = async (id: number) => {
    const item = todoItems.find((item) => item.id === id)
    if (item) {
      try {
        const response = await fetch(`/api/todoUpdate`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id:item.id, content: item.content, completed: true }),
        })
        if (!response.ok) throw new Error("Failed to update todo")
        setTodoItems(todoItems.filter((item) => item.id !== id))
        setCompletedItems([...completedItems, { ...item, completed: true }])
      } catch (error) {
        console.error("Error updating todo:", error)
      }
    } else {
      const completedItem = completedItems.find((item) => item.id === id)
      if (completedItem) {
        try {
          const response = await fetch(`/api/todoUpdate`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: completedItem.id, content: completedItem.content, completed: false }),
          })
          if (!response.ok) throw new Error("Failed to update todo")
          setCompletedItems(completedItems.filter((item) => item.id !== id))
          setTodoItems([...todoItems, { ...completedItem, completed: false }])
        } catch (error) {
          console.error("Error updating todo:", error)
        }
      }
    }
  }

  const deleteItem = (id: number) => {
    setTodoItems(todoItems.filter((item) => item.id !== id))
    setCompletedItems(completedItems.filter((item) => item.id !== id))
  }

  const eraseAllTodos = () => setTodoItems([])
  const eraseAllCompleted = () => setCompletedItems([])

  const addNewTask = async () => {
    const userDataRaw = localStorage.getItem("userData")
    const userData = userDataRaw ? JSON.parse(userDataRaw) : null
    if (!userData?.id) return

    if (newTaskText.trim()) {
      try {
        const response = await fetch("/api/todoCreate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content: newTaskText,
            completed: false,
            userId: userData.id,
          }),
        })

        if (!response.ok) throw new Error("Failed to create todo")
        const newItem = await response.json()
        setTodoItems([...todoItems, { id: newItem.id, content: newItem.content, completed: newItem.completed }])
        setNewTaskText("")
      } catch (error) {
        console.error("Error creating todo:", error)
      }
    }
  }

  const startEditing = (id: number) => {
    setTodoItems(todoItems.map((item) => (item.id === id ? { ...item, isEditing: true } : item)))
  }

  const updateItemContent = (id: number, content: string) => {
    setTodoItems(todoItems.map((item) => (item.id === id ? { ...item, content } : item)))
  }

  const finishEditing = async (id: number) => {
    const item = todoItems.find((item) => item.id === id)
    if (!item) return

    try {
      const response = await fetch(`/api/todoUpdate`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({id:item.id, content: item.content, completed: item.completed }),
      })
      if (!response.ok) throw new Error("Failed to update todo content")
    } catch (error) {
      console.error("Error updating content:", error)
    }

    setTodoItems(todoItems.map((item) => (item.id === id ? { ...item, isEditing: false } : item)))
  }
  return (
    <section id="todo-list" className="w-ful py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8 max-w-5xl mx-auto">
          <DndProvider backend={Backend}>
            <div className="md:w-1/2 bg-white text-black rounded-md shadow-lg">
              <div className="bg-orange-500 w-full h-4"></div>
              <div className="p-6 pt-4">
                <h1 className="flex justify-center font-bold mb-2 text-6xl">To-do</h1>
                <p className="text-gray-600 flex justify-center text-xl">Take a breath.</p>
                <p className="text-gray-600 flex justify-center mb-4 text-xl">Start doing.</p>

                <div className="mb-4">
                  <div className="flex">
                    <input
                      type="text"
                      value={newTaskText}
                      onChange={(e) => setNewTaskText(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addNewTask()}
                      placeholder="Add a new task..."
                      className="flex-grow p-2 border border-gray-300 rounded-l"
                      aria-label="New task text"
                    />
                    <button
                      onClick={addNewTask}
                      className="bg-green-500 text-white px-4 py-2 rounded-r hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                      aria-label="Add task"
                    >
                      Add
                    </button>
                  </div>
                </div>
                <div className="todo-list max-h-[300px] overflow-y-auto">
                  {todoItems.map((item, index) => (
                    <TodoItem
                      key={item.id}
                      item={item}
                      index={index}
                      moveItem={moveItem}
                      toggleComplete={toggleComplete}
                      deleteItem={deleteItem}
                      startEditing={startEditing}
                      updateItemContent={updateItemContent}
                      finishEditing={finishEditing}
                    />
                  ))}

                  {todoItems.length === 0 && (
                    <p className="text-gray-500 text-center py-4">No tasks to do. Add a new one!</p>
                  )}
                </div>

                {todoItems.length > 0 && (
                  <button
                    onClick={eraseAllTodos}
                    className="w-full bg-black text-white py-2 mt-4 rounded hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black"
                    aria-label="Erase all to-do items"
                  >
                    erase all
                  </button>
                )}
              </div>
            </div>

            <div className="w-full md:w-1/2 bg-white text-black rounded-md  shadow-lg">
                <div className="bg-green-500 w-full h-4"></div>
              <div className="pt-4 p-6">
                <h3 className="flex justify-center font-bold mb-2 text-6xl">Done</h3>
                <p className="text-gray-600 flex justify-center text-xl">
                  {completedItems.length ? 'Congratulations!' : ''}
                </p>
                    <p className="flex justify-center text-xl mb-4">
                      {completedItems.length
                        ? `You have done ${completedItems.length} tasks`
                        : ''}
                    </p>
                <div className="completed-list max-h-[300px] overflow-y-auto">
                  {completedItems.map((item, index) => (
                    <div key={item.id} className="flex items-center p-2 mb-2 border-b border-gray-200">
                      <button
                        onClick={() => toggleComplete(item.id)}
                        aria-label={`Mark "${item.content}" as incomplete`}
                        className="w-8 h-8 mr-3 rounded-full flex items-center justify-center bg-green-500"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="white"
                          strokeWidth="3"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </button>

                      <span className="flex-grow line-through text-gray-500">{item.content}</span>
                      <span className="ml-2 text-xs text-gray-400">done</span>
                    </div>
                  ))}

                  {completedItems.length === 0 && (
                    <p className="text-gray-500 text-center py-4">No completed tasks yet.</p>
                  )}
                </div>

                {completedItems.length > 0 && (
                  <button
                    onClick={eraseAllCompleted}
                    className="w-full bg-black text-white py-2 mt-4 rounded hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black"
                    aria-label="Erase all completed items"
                  >
                    erase all
                  </button>
                )}
              </div>
            </div>
          </DndProvider>
        </div>
      </div>
    </section>
  )
}
