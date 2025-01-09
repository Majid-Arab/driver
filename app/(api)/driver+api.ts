import { neon } from "@neondatabase/serverless";

export async function GET() {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const response = await sql`SELECT * FROM drivers`;

    return new Response(JSON.stringify({ data: response }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching drivers:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch drivers" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
