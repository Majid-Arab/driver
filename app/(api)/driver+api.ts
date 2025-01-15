import { Pool } from "pg";

// Initialize a connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET() {
  try {
    if (!process.env.DATABASE_URL) {
      console.error("DATABASE_URL is not set.");
      return new Response(
        JSON.stringify({ error: "Internal server error" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Connect to the database and fetch data
    const client = await pool.connect();
    try {
      const result = await client.query("SELECT * FROM drivers");

      return new Response(JSON.stringify({ data: result.rows }), {
        headers: {
          "Content-Type": "application/json",
          "X-Content-Type-Options": "nosniff",
          "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
        },
      });
    } finally {
      client.release(); // Release the client back to the pool
    }
  } catch (error) {
    console.error("Error fetching drivers:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch drivers" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
