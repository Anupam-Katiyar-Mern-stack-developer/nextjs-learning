import { notFound } from "next/navigation";
import AddToCart from "./AddToCart";
import Image from "next/image";

export default async function page({ params }) {
  const { id } = await params;

  const response = await fetch(`https://dummyjson.com/products/${id}`);
  if (response.status === 404) {
  notFound();
}

  if (!response.ok) {
    throw new Error("failed to fetch");
  }

  const data = await response.json();
  console.log(data);
  return (
    <div>
      <h1>product details </h1>
      <p>{id}</p>
      <div>
        <Image
          src={data.thumbnail}
          alt={data.title}
          width={200}
          height={200}
        />
      </div>

      <div>
        <p>{data.title}</p>
        <p>{data.category}</p>
        <p>{data.price}</p>
        <p>{data.rating}</p>
        <AddToCart title={data.title} price={data.price} />
      </div>
    </div>
  );
}
