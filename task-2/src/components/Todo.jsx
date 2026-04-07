import React from 'react'

const TodoList = ({ todos, addTodo }) => {
  console.log("Child TodoList re-rendered")

  return (
    <div className="child-box">
      <h2>Todo List (Child Component)</h2>

      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>

      <button onClick={addTodo}>Add Todo</button>
    </div>
  )
}

export default React.memo(TodoList)