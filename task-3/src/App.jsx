import React, { useState } from "react";
import useStorage from "./hooks/hook";

function App() {
  const [storageType, setStorageType] = useState("local");

  const [name, setName, clearName] = useStorage("username", "", storageType);

  return (
    <div className="container">
      <h1>Custom Hook - localStorage / sessionStorage</h1>

      <div className="card">
        <label>Select Storage Type:</label>
        <select
          value={storageType}
          onChange={(e) => setStorageType(e.target.value)}
        >
          <option value="local">localStorage</option>
          <option value="session">sessionStorage</option>
        </select>

        <label>Enter Your Name:</label>
        <input
          type="text"
          placeholder="Type your name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <p>
          <strong>Saved Name:</strong> {name || "No name saved"}
        </p>

        <button onClick={clearName}>Clear Stored Value</button>
      </div>
    </div>
  );
}

export default App;