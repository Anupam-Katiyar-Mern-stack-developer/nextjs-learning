"use server";

import pool from "@/lib/db";
import bcrypt from "bcryptjs";
import { createSession } from "@/lib/session";
import { cookies } from "next/headers";
import { randomBytes, createHash } from "node:crypto";

export async function loginUser(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (
    typeof email !== "string" ||
    !email.trim() ||
    typeof password !== "string" ||
    !password
  ) {
    return {
      success: false,
      message: "Email and password required",
    };
  }

  try {
    const result = await pool.query(
      "SELECT id, password FROM users WHERE email = $1",
      [email.trim().toLowerCase()],
    );

    const user = result.rows[0];

    if (!user) {
      return {
        success: false,
        message: "Invalid credentials",
      };
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return {
        success: false,
        message: "Invalid credentials",
      };
    }

    await createSession(user.id);

    return {
      success: true,
      message: "Login successful",
    };
  } catch (error) {
    console.error("Login error:", error);

    return {
      success: false,
      message: "Login failed",
    };
  }
}
