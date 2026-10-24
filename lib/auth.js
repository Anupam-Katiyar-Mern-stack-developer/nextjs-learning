import "server-only";
import pool from "@/lib/db";
import { cookies } from "next/headers";
import { createHash } from "node:crypto";

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  if (!token) {
    return null;
  }

  const tokenHash = createHash("sha256").update(token).digest("hex");

  const result = await pool.query(
    `SELECT u.id, u.name, u.email
     FROM sessions s
     INNER JOIN users u ON u.id = s.user_id
     WHERE s.token_hash = $1
       AND s.expires_at > NOW()
     LIMIT 1`,
    [tokenHash],
  );

  return result.rows[0] || null;
}
