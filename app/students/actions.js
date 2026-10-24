"use server";

import pool from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function addStudent(prevState, formData) {
  const name = formData.get("name");
  const course = formData.get("course");

  if (
    typeof name !== "string" ||
    !name.trim() ||
    typeof course !== "string" ||
    !course.trim()
  ) {
    return {
      success: false,
      message: "Name and course are required",
    };
  }

  try {
    await pool.query("INSERT INTO students (name, course) VALUES ($1, $2)", [
      name.trim(),
      course.trim(),
    ]);

    revalidatePath("/students");

    return {
      success: true,
      message: "Student added successfully",
    };
  } catch (error) {
    console.error("Add student error:", error);

    return {
      success: false,
      message: "Failed to add student",
    };
  }
}

// delete students
export async function deleteStudent(formData) {
  const id = Number(formData.get("id"));

  if (!Number.isInteger(id) || id <= 0) {
    return {
      success: false,
      message: "Invalid student ID",
    };
  }

  try {
    const result = await pool.query(
      "delete from students where id = $1 returning id",
      [id],
    );

    if (result.rowCount === 0) {
      return {
        success: false,
        message: "Student not found",
      };
    }

    revalidatePath("/students");

    return {
      success: true,
      message: "Student delted successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Failed to delete student",
    };
  }
}

// updaet 
export async function updateStudent(id, formData) {
  const studentId = Number(id);
  const name = formData.get("name");
  const course = formData.get("course");

  if (!Number.isInteger(studentId) || studentId <= 0) {
    return { success: false, message: "Invalid student ID" };
  }

  if (
    typeof name !== "string" ||
    !name.trim() ||
    typeof course !== "string" ||
    !course.trim()
  ) {
    return { success: false, message: "All fields required" };
  }

  try {
    const result = await pool.query(
      `UPDATE students
       SET name = $1, course = $2
       WHERE id = $3
       RETURNING id`,
      [name.trim(), course.trim(), studentId],
    );

    if (result.rowCount === 0) {
      return { success: false, message: "Student not found" };
    }

    revalidatePath("/students");

    return { success: true, message: "Student updated" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Update failed" };
  }
}
