import React, { useCallback, useMemo, useState } from 'react'
import TodoList from './components/Todo'

function App() {
  console.log("Parent App re-rendered")

  const [count, setCount] = useState(0)
  const [todos, setTodos] = useState([
    "Learn React",
    "Learn useMemo"
    
  ])

  function increaseCount() {
    setCount((prev) => prev + 1)
  }

  const addTodo = useCallback(() => {
    setTodos((prevTodos) => [...prevTodos, `New Todo ${prevTodos.length + 1}`])
  }, [])

  const memoizedTodos = useMemo(() => {
    return todos
  }, [todos])

  return (
    <div className="container">
      <h1>useMemo + React.memo Demo</h1>

      <div className="parent-box">
        <h2>Parent Component</h2>
        <p>Counter: {count}</p>
        <button onClick={increaseCount}>Increase Counter</button>
      </div>

      <TodoList todos={memoizedTodos} addTodo={addTodo} />
    </div>
  )
}

export default App