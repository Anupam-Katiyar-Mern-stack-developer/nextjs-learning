"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ProductsNav() {
    const pathname = usePathname();

    const isActive = pathname === "/products";

    return (
        <Link
            href="/products"
            className={
                isActive
                    ? "bg-white text-blue-600 p-2 rounded"
                    : "text-white p-2"
            }
        >
            All Products
        </Link>
    );
}