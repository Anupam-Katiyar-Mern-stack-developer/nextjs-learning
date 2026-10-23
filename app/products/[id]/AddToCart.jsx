"use client";

import { useEffect, useState } from "react";

export default function AddToCart({ title, price }) {
    const [quantity, setQuantity] = useState(0);

    const totalPrice = price * quantity;



    return (
        <div className="flex items-center gap-4 flex-col">
            <div className="p-3 flex items-center flex-col">
                <p >
                    {title}
                </p>
            </div>

            <div className="flex gap-3">
                <button onClick={() => setQuantity(quantity + 1)}
                    className="bg-blue-600 text-white px-4 py-2 rounded">Add to cart</button>

                <p>Quantity:{quantity}</p>

                <button onClick={() => setQuantity(quantity - 1)}
                    disabled={quantity === 0} className="p-3 bg-red-500">-</button>
            </div>


            <button className="p-3 bg-yellow-500" onClick={() => setQuantity(0)} disabled={quantity === 0}>remove</button>

            <div className="flex gap-2">
                <p>{totalPrice}</p>
            </div>
        </div>
    )
}