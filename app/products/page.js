export const metadata ={
  title:"products | my store",
  desciption:"explore our latest products"
} 

export default async function ProductsPage({ searchParams }) {
  const { category } = await searchParams;

  const apiUrl =category ? `https://dummyjson.com/products/category/${encodeURIComponent(category)}`
  : "https://dummyjson.com/products?limit=6";

  const response =await fetch(apiUrl,{
    next:{
      revalidate:60,
    },
  });

  if(!response.ok){
    throw new Error("fetch failed");
  }

  const data = await response.json();

  

  return (
    <main>
      <h1>Products Page</h1>
      <p>Selected Category: {category || "All"}</p>
        <div>
            {
                data.products.map((products)=>(
                    <p>{products.title} </p>
                ))
            }
        </div>

    </main>
  );
}
