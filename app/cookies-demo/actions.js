"use server";

import { cookies } from "next/headers";

export async function saveTheme(){
    const cookieStore =await cookies();

    cookieStore.set("theme","dark",{
        httpOnly:true,
        secure:process.env.NODE_ENV ==="production",
        sameSite:"lax",
        path:"/",
        maxAge:60*60,
    });
}