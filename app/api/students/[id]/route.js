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
