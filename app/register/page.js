"use server";
import { revalidatePath } from "next/cache";
import { registerUser } from "./actions";

export default async function page() {
  return (
    <div className="flex gap-3 p-4">
      <form action={registerUser} className="space-y-2">
        <input name="name" placeholder="name" className="p-1 border" />
        <input name="email" placeholder="email" className="p-1 border" />
        <input name="password" placeholder="name" className="p-1 border" />
        <button type="submit " className="p-2 bg-red-400 ">
          register
        </button>
      </form>
    </div>
  );
}
