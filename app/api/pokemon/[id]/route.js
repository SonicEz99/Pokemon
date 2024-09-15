import { query } from "../../lib/db";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  try {
    const id = Number(params.id);

    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const result = await query(
      "UPDATE pokemon SET fav_id = $1 WHERE id = $2 RETURNING *",
      [2, id]
    );

    if (result.rowCount === 0) {
      return NextResponse.json(
        { message: "No record found to update" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Update Successful!",
      updatedRecord: result.rows[0],
    });
  } catch (err) {
    return NextResponse.json({ err: err.message });
  }
}
