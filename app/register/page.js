"use client";

import { useActionState } from "react";
import { registerUser } from "./actions";

const initialState = {
  success: false,
  message: "",
};

export default function RegisterForm() {
  const [state, formAction, isPending] = useActionState(
    registerUser,
    initialState
  );

  return (
    <form action={formAction} className="space-y-3">
      <input
        type="text"
        name="name"
        placeholder="Enter name"
        className="border p-2"
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Enter email"
        className="border p-2"
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Enter password"
        className="border p-2"
        minLength={8}
        required
      />

      <button
        type="submit"
        disabled={isPending}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {isPending ? "Registering..." : "Register"}
      </button>

      {state.message && (
        <p className={state.success ? "text-green-600" : "text-red-600"}>
          {state.message}
        </p>
      )}
    </form>
  );
}