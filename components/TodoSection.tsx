"use client"

import { useState } from "react"
import { DndProvider, useDrag, useDrop } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { TouchBackend } from "react-dnd-touch-backend"
import { useMediaQuery } from "@/hooks/use-media-query"

interface TodoItem {
  id: number
  text: string
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
  updateItemText,
  finishEditing,
}: {
  item: TodoItem
  index: number
  moveItem: (dragIndex: number, hoverIndex: number) => void
  toggleComplete: (id: number) => void
  deleteItem: (id: number) => void
  startEditing: (id: number) => void
  updateItemText: (id: number, text: string) => void
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
      <input
        type="checkbox"
        checked={item.completed}
        onChange={() => toggleComplete(item.id)}
        className="w-5 h-5 mr-3 accent-green-500 cursor-pointer"
        aria-label={`Mark "${item.text}" as ${item.completed ? "incomplete" : "complete"}`}
      />

      {item.isEditing ? (
        <input
          type="text"
          value={item.text}
          onChange={(e) => updateItemText(item.id, e.target.value)}
          onBlur={() => finishEditing(item.id)}
          onKeyDown={(e) => e.key === "Enter" && finishEditing(item.id)}
          className="flex-grow p-1 border border-gray-300 rounded"
          autoFocus
        />
      ) : (
        <span onClick={() => startEditing(item.id)} className="flex-grow cursor-text">
          {item.text}
        </span>
      )}

      <button
        onClick={() => deleteItem(item.id)}
        className="ml-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100"
        aria-label={`Delete "${item.text}"`}
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
  const [todoItems, setTodoItems] = useState<TodoItem[]>([
    { id: 1, text: "This is a new task", completed: false },
    { id: 2, text: "Develop the To-do list page", completed: false },
    { id: 3, text: "Create the drag-and-drop functionality", completed: false },
    { id: 4, text: "Add new tasks", completed: false },
    { id: 5, text: "Delete items", completed: false },
    { id: 6, text: "Erase all", completed: false },
    { id: 7, text: "Checked items goes to Done list", completed: false },
    { id: 8, text: "This text indicates the item may be edited", completed: false },
    { id: 9, text: "Editing an item", completed: false },
  ])

  const [completedItems, setCompletedItems] = useState<TodoItem[]>([
    { id: 101, text: "Get FTP credentials", completed: true },
    { id: 102, text: "Home Page Design", completed: true },
    { id: 103, text: "E-mail John about the deadline", completed: true },
    { id: 104, text: "Create a Google Drive folder", completed: true },
    { id: 105, text: "Send a gift to the client", completed: true },
  ])

  const [newTaskText, setNewTaskText] = useState("")
  const isMobile = useMediaQuery("(max-width: 768px)")
  const Backend = isMobile ? TouchBackend : HTML5Backend

  const moveItem = (dragIndex: number, hoverIndex: number) => {
    const draggedItem = todoItems[dragIndex]
    const newItems = [...todoItems]
    newItems.splice(dragIndex, 1)
    newItems.splice(hoverIndex, 0, draggedItem)
    setTodoItems(newItems)
  }

  const toggleComplete = (id: number) => {
    const item = todoItems.find((item) => item.id === id)
    if (item) {
      // Remove from todoItems
      setTodoItems(todoItems.filter((item) => item.id !== id))
      // Add to completedItems
      setCompletedItems([...completedItems, { ...item, completed: true }])
    } else {
      const completedItem = completedItems.find((item) => item.id === id)
      if (completedItem) {
        // Remove from completedItems
        setCompletedItems(completedItems.filter((item) => item.id !== id))
        // Add to todoItems
        setTodoItems([...todoItems, { ...completedItem, completed: false }])
      }
    }
  }

  const deleteItem = (id: number) => {
    setTodoItems(todoItems.filter((item) => item.id !== id))
    setCompletedItems(completedItems.filter((item) => item.id !== id))
  }

  const eraseAllTodos = () => {
    setTodoItems([])
  }

  const eraseAllCompleted = () => {
    setCompletedItems([])
  }

  const addNewTask = () => {
    if (newTaskText.trim()) {
      const newItem: TodoItem = {
        id: Date.now(),
        text: newTaskText,
        completed: false,
      }
      setTodoItems([...todoItems, newItem])
      setNewTaskText("")
    }
  }

  const startEditing = (id: number) => {
    setTodoItems(todoItems.map((item) => (item.id === id ? { ...item, isEditing: true } : item)))
  }

  const updateItemText = (id: number, text: string) => {
    setTodoItems(todoItems.map((item) => (item.id === id ? { ...item, text } : item)))
  }

  const finishEditing = (id: number) => {
    setTodoItems(todoItems.map((item) => (item.id === id ? { ...item, isEditing: false } : item)))
  }

  return (
    <section id="todo-list" className="w-full bg-black text-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">To-do List</h2>
        <p className="text-center mb-12 max-w-2xl mx-auto">
          Drag and drop to set your main priorities, check when done and create what's new.
        </p>

        <div className="flex flex-col md:flex-row gap-8 max-w-5xl mx-auto">
          <DndProvider backend={Backend}>
            <div className="w-full md:w-1/2 bg-white text-black rounded-md p-6">
              <div className="border-t-4 border-orange-500 pt-4">
                <h3 className="text-xl font-bold mb-2">To-do</h3>
                <p className="text-gray-600 mb-4">Take a breath. Start doing.</p>

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

                <div className="todo-list min-h-[300px]">
                  {todoItems.map((item, index) => (
                    <TodoItem
                      key={item.id}
                      item={item}
                      index={index}
                      moveItem={moveItem}
                      toggleComplete={toggleComplete}
                      deleteItem={deleteItem}
                      startEditing={startEditing}
                      updateItemText={updateItemText}
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

            <div className="w-full md:w-1/2 bg-white text-black rounded-md p-6">
              <div className="border-t-4 border-green-500 pt-4">
                <h3 className="text-xl font-bold mb-2">Done</h3>
                <p className="text-gray-600 mb-4">
                  Congratulations!
                  <span className="block font-medium">You have done {completedItems.length} tasks</span>
                </p>

                <div className="completed-list min-h-[300px]">
                  {completedItems.map((item, index) => (
                    <div key={item.id} className="flex items-center p-2 mb-2 border-b border-gray-200">
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => toggleComplete(item.id)}
                        className="w-5 h-5 mr-3 accent-green-500 cursor-pointer"
                        aria-label={`Mark "${item.text}" as incomplete`}
                      />
                      <span className="flex-grow line-through text-gray-500">{item.text}</span>
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
