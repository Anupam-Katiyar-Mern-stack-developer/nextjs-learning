"use server";

import pool from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function addStudent(formData) {
  const name = formData.get("name");
  const course = formData.get("course");

  if (
    typeof name !== "string" ||
    !name.trim() ||
    typeof course !== "string" ||
    !course.trim()
  ) {
    return { success: false, message: "All fields required" };
  }

  try {
    await pool.query("insert into students (name,course) values ($1,$2)", [
      name.trim(),
      course.trim(),
    ]);

    revalidatePath("/students");

    return { success: true, message: "student added " };
  } catch (error) {
    return { success: false, message: "Something went wrong" };
  }
}
