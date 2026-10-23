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

// post api 
export async function POST(request) {
  try {
    const { name, course } = await request.json();
    if (
      typeof name !== "string" ||
      !name.trim() ||
      typeof course !== "string" ||
      !course.trim()
    ) {
      return Response.json(
        {
          succes: false,
          message: "name and course are required",
        },
        {
          status: 400,
        },
      );
    }

    const result = await pool.query(
      `insert into students (name,course)
            values($1,$2)
            returning id ,name,course`,
      [name.trim(), course.trim()],
    );

    return Response.json(
      {
        succes: true,
        message: "student added successfully",
        student: result.rows[0],
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.log("Added student error :", error);
    return Response.json(
      {
        succes: false,
        message: "Failed to add student",
      },
      {
        status: 500,
      },
    );
  }
}
