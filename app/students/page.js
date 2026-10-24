import pool from "@/lib/db";
import { deleteStudent } from "./actions";

import AddStudentForm from "@/components/AddStudent";
export default async function StudentsPage() {
  const result = await pool.query(
    "SELECT id, name, course FROM students ORDER BY id DESC",
  );

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold mb-4">Students</h1>
      <AddStudentForm />

      {result.rows.map((student) => (
        <div key={student.id} className="border p-3 mb-2">
          <h2>{student.name}</h2>
          <p>{student.course}</p>

          <form action={deleteStudent}>
            <input type="hidden" name="id" value={student.id} />

            <button type="submit">Delete</button>
          </form>
        </div>
      ))}
    </main>
  );
}
