import StudentList from "@/components/StudentList";

export default function StudentsPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Students List
      </h1>

      <StudentList />
    </main>
  );
}