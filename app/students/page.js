import pool from "@/lib/db";
import { deleteStudent, updateStudent } from "./actions";
import AddStudentForm from "@/components/AddStudent";

export default async function StudentsPage() {
  const result = await pool.query(
    "SELECT id, name, course FROM students ORDER BY id DESC",
  );

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold mb-4">Students</h1>

      <AddStudentForm />

      <div className="mt-6 space-y-3">
        {result.rows.map((student) => {
          const updateStudentWithId = updateStudent.bind(null, student.id);

          return (
            <div key={student.id} className="border p-3 rounded-lg">
              <h2 className="font-semibold">{student.name}</h2>
              <p className="mb-3">{student.course}</p>

              {/* UPDATE FORM */}
              <form action={updateStudentWithId} className="flex gap-2 mb-3">
                <input
                  type="text"
                  name="name"
                  defaultValue={student.name}
                  className="border p-2 rounded"
                  required
                />

                <input
                  type="text"
                  name="course"
                  defaultValue={student.course}
                  className="border p-2 rounded"
                  required
                />

                <button
                  type="submit"
                  className="bg-blue-600 text-white px-3 py-2 rounded"
                >
                  Update
                </button>
              </form>

              {/* DELETE FORM */}
              <form action={deleteStudent}>
                <input type="hidden" name="id" value={student.id} />

                <button
                  type="submit"
                  className="bg-red-600 text-white px-3 py-2 rounded"
                >
                  Delete
                </button>
              </form>
            </div>
          );
        })}
      </div>
    </main>
  );
}
