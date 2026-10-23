export async function GET(request, { params }) {
  const { id } = await params;
  return Response.json({
    success: true,
    productId: id,
  });
}

export async function DELETE(request, { params }) {
  const { id } = await params;

  return Response.json(
    {
      success: true,
      deletedProductId: id,
    },
    {
      status: 200,
    },
  );
}
