import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function POST(request: Request) {
  try {
    if (!process.env.DATABASE_URL) {
      console.error("DATABASE_URL is not set.");
      return new Response(
        JSON.stringify({ error: "Internal server error" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return new Response(
        JSON.stringify({ error: "Invalid JSON payload" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const { name, email, clerkId } = body;

    if (
      typeof name !== "string" || name.trim() === "" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      typeof clerkId !== "string" || clerkId.trim() === ""
    ) {
      return new Response(
        JSON.stringify({ error: "Invalid or missing fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Insert data into the database
    const client = await pool.connect();
    try {
      const result = await client.query(
        `INSERT INTO users (name, email, clerk_id) VALUES ($1, $2, $3) RETURNING id`,
        [name, email, clerkId]
      );

      return new Response(JSON.stringify({ id: result.rows[0]?.id }), {
        status: 201,
        headers: {
          "Content-Type": "application/json",
          "X-Content-Type-Options": "nosniff",
          "X-Frame-Options": "DENY",
          "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
        },
      });
    } finally {
      client.release(); // Release the client back to the pool
    }
  } catch (error) {
    console.error("Database error:", error);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
