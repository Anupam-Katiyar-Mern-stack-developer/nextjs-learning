import { getCurrentUser } from "@/lib/auth";
import { logoutUser } from "./actions";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  return (
    <main className="p-6">
      <h1>Welcome, {user.name}</h1>
      <p>{user.email}</p>

      <form action={logoutUser}>
        <button
          type="submit"
          className="mt-4 rounded bg-red-600 px-4 py-2 text-white"
        >
          Logout
        </button>
      </form>
    </main>
  );
}