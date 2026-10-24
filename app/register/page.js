"use client";

import { registerUser } from "./actions";
import { useActionState } from "react";

const initialState = {
  success: false,
  message: "",
};

export default async function page() {
  const [state, formAction, isPending] = useActionState(
    registerUser,
    initialState,
  );

  return (
    <div className="flex gap-3 p-4">
      <form action={registerUser} className="space-y-2">
        <input name="name" placeholder="name" className="p-1 border" />
        <input name="email" placeholder="email" className="p-1 border" />
        <input name="password" placeholder="name" className="p-1 border" />
        <button type="submit " disabled={isPending} className="p-2 bg-red-400 ">
          {isPending ? "Registering..." : "register"}
        </button>

        {state.message && (
          <p className={state.success ? "text-green-600" : "text-red-600"}>
            {state.message}
          </p>
        )}
      </form>
    </div>
  );
}
