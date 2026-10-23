"use client";

import { useState } from "react";

export default function AddStudent({ onStudentAdded }) {
    const [name, setName] = useState("");
    const [course, setCourse] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await fetch("/api/students", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, course }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to add student");
            }

            setName("");
            setCourse("");
            onStudentAdded(data.student);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-3">
            <input
                type="text"
                placeholder="Student name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border p-2"
                required
            />

            <input
                type="text"
                placeholder="Course"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className="border p-2"
                required
            />

            <button disabled={loading} className="border px-4 py-2">
                {loading ? "Saving..." : "Add Student"}
            </button>

            {error && <p className="text-red-500">{error}</p>}
        </form>
    );
}