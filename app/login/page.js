import { useActionState } from "react";
import { loginUser } from "./actions";

const initialState = {
  success: false,
  message: "",
};

export default function loginPage() {
  const [state, formAction, isPending] = useActionState(
    loginUser,
    initialState,
  );
  return (
    <div>
      <form action={formAction} className="space-y-3 border p-3 flex flex-col">
        <input name="email" placeholder="email" />
        <input name="password" placeholder="password" />
        <button type="submit" className="border p-1 bg-green-300">
          Submit
        </button>
      </form>
      {state.message && (
        <p className={state.success ? "text-green-400" : "text-red-500"}>
          {state.message}
        </p>
      )}
    </div>
  );
}
