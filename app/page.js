
"use client";

import { useActionState } from "react";
import { askAI } from "./actions";

const initialState = {
  answer: "",
  error: "",
};

export default function Home() {
  const [state, formAction, isPending] = useActionState(
    askAI,
    initialState
  );

  return (
    <main style={{ padding: "40px", maxWidth: "600px" }}>
      <h1>My First AI App 🤖</h1>

      <form action={formAction}>
        <textarea
          name="question"
          placeholder="AI se kuch poochho..."
          required
          rows={5}
          style={{ width: "100%", padding: "10px" }}
        />

        <button type="submit" disabled={isPending}>
          {isPending ? "Thinking..." : "Ask AI"}
        </button>
      </form>

      {state.error && <p>{state.error}</p>}

      {state.answer && (
        <div>
          <h2>AI Answer:</h2>
          <p style={{ whiteSpace: "pre-wrap" }}>
            {state.answer}
          </p>
        </div>
      )}
    </main>
  );
}
