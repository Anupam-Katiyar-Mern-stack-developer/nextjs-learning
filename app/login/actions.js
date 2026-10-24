"use server";

import pool from "@/lib/db";
import bcrypt from "bcryptjs";
import { redirect } from "next/dist/server/api-utils";
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

    const token = randomBytes(32).toString("hex");

    const tokenHash = createHash("sha256").update(token).digest("hex");

    const maxAge = 60 * 60 * 24 * 7;
    const expiresAt = new Date(Date.now() + maxAge * 1000);

    await pool.query(
      `INSERT INTO sessions (user_id, token_hash, expires_at)
       VALUES ($1, $2, $3)`,
      [user.id, tokenHash, expiresAt],
    );

    const cookieStore = await cookies();

    cookieStore.set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge,
    });
    

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
