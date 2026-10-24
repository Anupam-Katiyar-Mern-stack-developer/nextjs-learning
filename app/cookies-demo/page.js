import { cookies } from "next/headers";
import { saveTheme } from "./actions";

export default async function CookiesDemoPage() {
  const cookieStore = await cookies();

  const theme = cookieStore.get("theme")?.value;

  return (
    <main className="p-6">
      <h1>Cookies Practice</h1>

      <p>Current Theme: {theme || "Not Set"}</p>

      <form action={saveTheme}>
        <button type="submit">Save Cookie</button>
      </form>
    </main>
  );
}
