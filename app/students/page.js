import pool from "@/lib/db";
import { addStudent } from "./actions";

export default async function StudentsPage() {
  const result = await pool.query(
    "SELECT id, name, course FROM students ORDER BY id DESC"
  );

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold mb-4">Students</h1>

      <form action={addStudent} className="flex gap-2 mb-6">
        <input name="name" placeholder="Name" className="border p-2" />
        <input name="course" placeholder="Course" className="border p-2" />
        <button type="submit" className="border px-4 py-2">
          Save
        </button>
      </form>

      {result.rows.map((student) => (
        <div key={student.id} className="border p-3 mb-2">
          {student.name} — {student.course}
        </div>
      ))}
    </main>
  );
}