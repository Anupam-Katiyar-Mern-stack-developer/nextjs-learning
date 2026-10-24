"use client";

import { useActionState } from "react";
import { addStudent } from "@/app/students/actions";

const initialState = {
  success: false,
  message: "",
};

export default function AddStudentForm() {
  const [state, formAction, isPending] = useActionState(
    addStudent,
    initialState
  );

  return (
    <form action={formAction} className="space-y-3">
      <input
        name="name"
        placeholder="Name"
        className="border p-2"
      />

      <input
        name="course"
        placeholder="Course"
        className="border p-2"
      />

      <button
        type="submit"
        disabled={isPending}
        className="border px-4 py-2"
      >
        {isPending ? "Saving..." : "Save"}
      </button>

      {state.message && (
        <p className={state.success ? "text-green-600" : "text-red-600"}>
          {state.message}
        </p>
      )}
    </form>
  );
}