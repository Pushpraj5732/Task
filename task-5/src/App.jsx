import React, { useState } from "react";
import sampleImage from "./assets/choto.jpg";

function App() {
  const [isDropped, setIsDropped] = useState(false);

  const handleDragStart = () => {
    console.log("Image drag started");
  };

  const handleDragOver = (e) => {
    e.preventDefault(); 
  };

  const handleDrop = () => {
    console.log("Image dropped");
    setIsDropped(true);
  };

  const handleReset = () => {
    setIsDropped(false);
  };

  return (
    <div className="container">
      <h1>Drag & Drop Image Only</h1>

      <div className="boxes">
        {/* Source Box */}
        <div className="box">
          <h2>Source Box</h2>
          {!isDropped && (
            <img
              src={sampleImage}
              alt="Draggable"
              className="drag-image"
              draggable={true}
              onDragStart={handleDragStart}
            />
          )}
        </div>

        <div className="box drop-box" onDragOver={handleDragOver} onDrop={handleDrop}>
          <h2>Drop Box</h2>
          {isDropped ? (
            <img src={sampleImage} alt="Dropped" className="drag-image" />
          ) : (
            <p>Drop image here</p>
          )}
        </div>
      </div>

      <button onClick={handleReset}>Reset</button>
    </div>
  );
}

export default App;