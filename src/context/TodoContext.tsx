"use client"

import { createContext, useState, useEffect, type ReactNode } from "react"
import { useAuth } from "@/hooks/useAuth"

interface Todo {
  id: string
  text: string
  completed: boolean
  createdAt: number
  completedAt?: number
  userId: string
}

interface TodoContextType {
  todos: Todo[]
  completedTodos: Todo[]
  addTodo: (text: string) => void
  updateTodo: (id: string, text: string) => void
  deleteTodo: (id: string) => void
  completeTodo: (id: string) => void
  uncompleteTodo: (id: string) => void
  clearTodos: () => void
  clearCompletedTodos: () => void
  moveTodo: (listType: "todo" | "completed", fromIndex: number, toIndex: number) => void
}

export const TodoContext = createContext<TodoContextType>({
  todos: [],
  completedTodos: [],
  addTodo: () => {},
  updateTodo: () => {},
  deleteTodo: () => {},
  completeTodo: () => {},
  uncompleteTodo: () => {},
  clearTodos: () => {},
  clearCompletedTodos: () => {},
  moveTodo: () => {},
})

export function TodoProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [todos, setTodos] = useState<Todo[]>([])
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([])

  // Carregar todos do localStorage quando o componente montar ou o usuário mudar
  useEffect(() => {
    if (user) {
      const storedTodos = localStorage.getItem(`todos-${user.id}`)
      const storedCompletedTodos = localStorage.getItem(`completed-todos-${user.id}`)

      if (storedTodos) {
        try {
          setTodos(JSON.parse(storedTodos))
        } catch (error) {
          console.error("Erro ao carregar todos:", error)
          setTodos([])
        }
      } else {
        setTodos([])
      }

      if (storedCompletedTodos) {
        try {
          setCompletedTodos(JSON.parse(storedCompletedTodos))
        } catch (error) {
          console.error("Erro ao carregar todos concluídos:", error)
          setCompletedTodos([])
        }
      } else {
        setCompletedTodos([])
      }
    } else {
      // Limpar todos se não houver usuário logado
      setTodos([])
      setCompletedTodos([])
    }
  }, [user])

  // Salvar todos no localStorage quando mudarem
  useEffect(() => {
    if (user) {
      localStorage.setItem(`todos-${user.id}`, JSON.stringify(todos))
    }
  }, [todos, user])

  // Salvar todos concluídos no localStorage quando mudarem
  useEffect(() => {
    if (user) {
      localStorage.setItem(`completed-todos-${user.id}`, JSON.stringify(completedTodos))
    }
  }, [completedTodos, user])

  const addTodo = (text: string) => {
    if (!user) return

    const newTodo: Todo = {
      id: "todo-" + Date.now(),
      text,
      completed: false,
      createdAt: Date.now(),
      userId: user.id,
    }

    setTodos((prev) => [newTodo, ...prev])
  }

  const updateTodo = (id: string, text: string) => {
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, text } : todo)))
    setCompletedTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, text } : todo)))
  }

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
    setCompletedTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const completeTodo = (id: string) => {
    const todoToComplete = todos.find((todo) => todo.id === id)

    if (todoToComplete) {
      const updatedTodo = {
        ...todoToComplete,
        completed: true,
        completedAt: Date.now(),
      }

      setTodos((prev) => prev.filter((todo) => todo.id !== id))
      setCompletedTodos((prev) => [updatedTodo, ...prev])
    }
  }

  const uncompleteTodo = (id: string) => {
    const todoToUncomplete = completedTodos.find((todo) => todo.id === id)

    if (todoToUncomplete) {
      const updatedTodo = {
        ...todoToUncomplete,
        completed: false,
        completedAt: undefined,
      }

      setCompletedTodos((prev) => prev.filter((todo) => todo.id !== id))
      setTodos((prev) => [updatedTodo, ...prev])
    }
  }

  const clearTodos = () => {
    setTodos([])
  }

  const clearCompletedTodos = () => {
    setCompletedTodos([])
  }

  const moveTodo = (listType: "todo" | "completed", fromIndex: number, toIndex: number) => {
    if (listType === "todo") {
      const newTodos = [...todos]
      const [movedItem] = newTodos.splice(fromIndex, 1)
      newTodos.splice(toIndex, 0, movedItem)
      setTodos(newTodos)
    } else {
      const newCompletedTodos = [...completedTodos]
      const [movedItem] = newCompletedTodos.splice(fromIndex, 1)
      newCompletedTodos.splice(toIndex, 0, movedItem)
      setCompletedTodos(newCompletedTodos)
    }
  }

  return (
    <TodoContext.Provider
      value={{
        todos,
        completedTodos,
        addTodo,
        updateTodo,
        deleteTodo,
        completeTodo,
        uncompleteTodo,
        clearTodos,
        clearCompletedTodos,
        moveTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  )
}
