import pool from "@/lib/db";

export async function GET() {
  try {
    const result = await pool.query(
      "SELECT id, name, price FROM products ORDER BY id",
    );

    return Response.json({
      success: true,
      products: result.rows,
    });
  } catch (error) {
    console.error("Database error:", error);

    return Response.json(
      { success: false, message: "Database query failed" },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, price } = body;

    if (!name || price === null || Number(price) <= 0) {
      return Response.json(
        {
          success: false,
          message: "valid name and price are required",
        },
        {
          status: 400,
        },
      );
    }

    const result = await pool.query(
      `
            insert into products (name,price)
            values ($1,$2)
            returning *
            `,
      [name, price],
    );

    return Response.json(
      {
        success: true,
        message: "products created successfully",
        product: result.rows[0],
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.log(error);
  }
}
