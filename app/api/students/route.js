import pool from "@/lib/db";

export async function GET() {
  try {
    const result = await pool.query(
      "select id,name,course from students order by id",
    );
    return Response.json({
      succes: true,
      students: result.rows,
    });
  } catch (error) {
    console.log("students API erorr:", error);

    return Response.json(
      {
        succes: false,
        message: "failed to fetch students",
      },
      {
        status: 500,
      },
    );
  }
}
