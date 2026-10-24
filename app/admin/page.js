import { requireRole } from "@/lib/auth";

export default async function AdminPage(){
    const admin  =await requireRole(["admin"]);

    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold">
                Admin Dashboard
            </h1>

                 <p>Welcome, {admin.name}</p>
      <p>Role: {admin.role}</p>

        </main>
    )
}