"use server";
import pool from "@/lib/db";

import bcrypt from "bcryptjs";

export async function registerUser(formdata) {
  const name = formdata.get("name");
  const email = formdata.get("email");
  const password = formdata.get("password");

  if (
    typeof name !== "string" ||
    !name.trim() ||
    typeof email !== "string" ||
    !email.trim() ||
    typeof password !== "string" ||
    password.length < 8
  ) {
    return {
      success: false,
      message: "Valid details and 8-charecter password required",
    };
  }

  const normalizedEmail = email.trim().toLowerCase();

  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    await pool.query(
      `insert into users (name,email,password) 
         values ($1,$2,$3)`,
      [name.trim(), normalizedEmail, hashedPassword],
    );

    return {
      success: true,
      message: "Registration successful",
    };
  } catch (error) {
    if (error.code === "23505") {
      return {
        success: false,
        message: "Email already registered",
      };
    }

    console.error("Registration error:", error);

    return {
      success: false,
      message: "Registration failed",
    };
  }
}
