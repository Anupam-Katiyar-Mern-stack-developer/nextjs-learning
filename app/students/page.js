import pool from "@/lib/db";
import { addStudent } from "./actions";

export default async function StudentsPage() {
  const result = await pool.query(
    "SELECT id, name, course FROM students ORDER BY id DESC"
  );

  const students = result.rows;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-5">
        Student Management
      </h1>

      <form action={addStudent} className="flex gap-3 mb-6">
        <input
          type="text"
          name="name"
          placeholder="Student name"
          className="border p-2"
          required
        />

        <input
          type="text"
          name="course"
          placeholder="Course"
          className="border p-2"
          required
        />

        <button type="submit" className="border px-4 py-2">
          Add Student
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-3">
        All Students
      </h2>

      {students.length === 0 ? (
        <p>No students found</p>
      ) : (
        <div className="space-y-2">
          {students.map((student) => (
            <div key={student.id} className="border p-3">
              <p>{student.name}</p>
              <p>{student.course}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}