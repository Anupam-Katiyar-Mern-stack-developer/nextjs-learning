import "server-only";
import pool from "./db";
import { cookies } from "next/headers";
import { createHash, randomBytes } from "node:crypto";
export async function createSession(userId) {
  const token = randomBytes(32).toString("hex");

  const tokenHash = createHash("sha256").update(token).digest("hex");

  const maxAge = 60 * 60 * 24 * 7;
  const expiresAt = new Date(Date.now() + maxAge * 1000);
  await pool.query(
    `insert into sessions (user_id,token_hash,expires_at)
        values ($1,$2,$3)`,
    [userId, tokenHash, expiresAt],
  );

  const cookieStore = await cookies();

  cookieStore.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge,
  });
}
