"use client";

import { useEffect, useState } from "react";
import AddStudent from "./AddStudent";

export default function StudentList() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editName, setEditName] = useState("");
    const [editCourse, setEditCourse] = useState("");


    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch("/api/students");

                if (!response.ok) {
                    throw new Error("Failed to fetch students");
                }

                const data = await response.json();
                setStudents(data.students);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    const handleStudentAdded = (newStudent) => {
        setStudents((prev) => [...prev, newStudent]);
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`/api/students/${id}`, {
                method: "DELETE"
            });

            if (!response.ok) {
                throw new Error("Failed to delete student");
            }

            setStudents((prev) => prev.filter((student) => student.id !== id))

        } catch (error) {
            console.log(error)
        }
    }
    const handleEdit = (student) => {
        setEditingId(student.id);
        setEditName(student.name);
        setEditCourse(student.course);
    };

    const handleUpdate = async () => {
        try {
            const response = await fetch(`/api/students/${editingId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: editName,
                    course: editCourse,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Update failed");
            }

            setStudents((prev) =>
                prev.map((student) =>
                    student.id === editingId ? data.student : student
                )
            );

            setEditingId(null);
        } catch (error) {
            console.error(error);
        }
    };
    if (loading) return <p>Loading students...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <AddStudent onStudentAdded={handleStudentAdded} />
            {students.map((student) => (
                <div key={student.id} className="border p-3 mb-3">
                    {editingId === student.id ? (
                        <div className="space-y-2">
                            <input
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                className="border p-2"
                            />

                            <input
                                value={editCourse}
                                onChange={(e) => setEditCourse(e.target.value)}
                                className="border p-2"
                            />

                            <button onClick={handleUpdate}>Save</button>
                            <button onClick={() => setEditingId(null)}>Cancel</button>
                        </div>
                    ) : (
                        <div>
                            <h2>{student.name}</h2>
                            <p>{student.course}</p>

                            <button onClick={() => handleEdit(student)}>
                                Edit
                            </button>

                            <button onClick={() => handleDelete(student.id)}>
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}