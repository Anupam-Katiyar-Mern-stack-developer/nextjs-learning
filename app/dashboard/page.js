import { getCurrentUser } from "@/lib/auth";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <main className="p-6">
        <h1>Please login first</h1>
      </main>
    );
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>

      <p>Email: {user.email}</p>
      <p>User ID: {user.id}</p>
    </main>
  );
}
