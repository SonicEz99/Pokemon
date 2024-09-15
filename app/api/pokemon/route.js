import { query } from "../../lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const rows = await query("SELECT * FROM pokemon");
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
