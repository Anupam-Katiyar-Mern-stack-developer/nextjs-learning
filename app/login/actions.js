"use server";

import pool from "@/lib/db";
import bcrypt from "bcryptjs";

export async function loginUser(prevstate, formdata) {
  const email = formdata.get("email");
  const password = formdata.get("password");

  if (
    typeof email !== "string" ||
    !email.trim() ||
    typeof password !== "string" ||
    !password
  ) {
    return {
      success: false,
      message: "Email and password are required",
    };
  }

  try {
    const result = await pool.query(
      "select id, name,password from users where email = $1",
      [email.trim().toLowerCase()],
    );
    const user = result.rows[0];

    if (!user) {
      return {
        success: false,
        message: "Invalid email or password",
      };
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return {
        success: false,
        message: "Invalid email or password",
      };
    }
    return {
      success: true,
      message: "credentials verified successfully",
    };
  } catch (error) {
    console.log("login error", error);

    return {
      success: false,
      message: "Something went wrong",
    };
  }
}
