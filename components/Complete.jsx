"use client";
import { useState } from "react";

export default function Toggle_button() {
  const [isComplete, setIsComplete] = useState(false);

  const handleClick = () => {
    setIsComplete(!isComplete);
  };
  return (
    <div>
      <button
        onClick={handleClick}
        className={`px-4 py-1 text-white rounded-lg ${
          isComplete ? "bg-green-600" : "bg-red-600"
        }`}
      >
        {isComplete ? <h1>Completed</h1> : <h1>Incomplete</h1>}
      </button>
    </div>
  );
}
