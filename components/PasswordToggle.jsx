"use client";

import { useState } from "react";

export default function PasswordToggle() {
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div>
            <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="enter password"
            className="p-2 border" />
            <button onClick={() => setShowPassword(prev => !prev)}>{showPassword ? "Hide" : "Show"}</button>
        </div>
    )
}