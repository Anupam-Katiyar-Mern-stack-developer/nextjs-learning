"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>Counter: {count}</h2>

      <button onClick={() => setCount((prev) => prev + 1)}>
        Increase
      </button>

      <button
        onClick={() => setCount((prev) => prev - 1)}
        disabled={count === 0}
      >
        Decrease
      </button>

      <button onClick={() => setCount(0)}>
        Reset
      </button>
    </div>
  );
}