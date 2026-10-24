"use server";
import pool from "@/lib/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createHash } from "node:crypto";

export async function logoutUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  if (token) {
    const tokenHash = createHash("sha256").update(token).digest("hex");

    await pool.query("delete from sessions where token_hash = $1", [tokenHash]);
  }

  cookieStore.delete("session");
  redirect("/login");
}
