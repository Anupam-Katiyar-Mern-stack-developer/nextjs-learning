"use client";

import { useEffect, useState } from "react";
import AddStudent from "./AddStudent";

export default function StudentList() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

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

    if (loading) return <p>Loading students...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <AddStudent onStudentAdded={handleStudentAdded} />
            {students.map((student) => (
                <div key={student.id} className="border p-3">
                    <h2>{student.name}</h2>
                    <p>{student.course}</p>
                </div>
            ))}
        </div>
    );
}