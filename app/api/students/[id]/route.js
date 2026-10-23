import pool from "@/lib/db";

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    const studentId = Number(id);

    if (!Number.isInteger(studentId) || studentId <= 0) {
      return Response.json(
        { success: false, message: "Invalid student ID" },
        { status: 400 },
      );
    }

    const result = await pool.query(
      "delete from students where id =$1 returning id",
      [studentId],
    );

    if (result.rowCount === 0) {
      return Response.json(
        { success: false, message: "Student not found" },
        { status: 404 },
      );
    }
    return Response.json(
      {
        success: true,
        message: "Student delted successfully",
        deletedId: studentId,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log("delete student error ", error);
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const { name, course } = await request.json();
    const studentId = Number(id);

    if (!Number.isInteger(studentId) || studentId <= 0) {
      return Response.json(
        { success: false, message: "Invalid student id" },
        { status: 400 },
      );
    }

    if (
      typeof name !== "string" ||
      !name.trim() ||
      typeof course !== "string" ||
      !course.trim()
    ) {
      return Response.json(
        { success: false, message: "Valid name and course required" },
        { status: 400 },
      );
    }

    const result = await pool.query(
      `update students set name =$1, course =$2
         where id =$3 
         returning id,name,course`,
      [name.trim(), course.trim(), studentId],
    );

    if (request.rowCount === 0) {
      return Response.json(
        {
          success: false,
          message: "student not found",
        },
        { status: 404 },
      );
    }

    return Response.json({
      success: true,
      message: "Student updated successfully",
      student: result.rows[0],
    });
  } catch (error) {
    console.error("Update student error:", error);

    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
