export async function GET() {
  const products = [
    { id: 1, name: "Laptop", price: 50000 },
    { id: 2, name: "Mobile", price: 20000 },
  ];

  return Response.json({
    success: true,
    products,
  });
}

export async function POST(request) {
  const { name, price } = await request.json();

  if (
    typeof name !== "string" ||
    !name.trim() ||
    typeof price !== "number" ||
    !Number.isFinite(price) ||
    price <= 0
  ) {
    return Response.json(
      {
        success: false,
        message: "Invalid name or price",
      },
      {
        status: 400,
      },
    );
  }

  return Response.json({
    success: true,
    message: "product recieved successfully",
    product: {
      name: name,
      price: price,
    },
  });
}
