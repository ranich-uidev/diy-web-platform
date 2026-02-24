import { getTenantDb } from "packages/database";

export default async function DatabaseConnection() {
      let status = "Connecting...";
      console.log("DB URL Check:", process.env.DATABASE_URL ? "Exists" : "MISSING");

  try {
    // 1. Initialize client (using 'public' schema for test)
    const prisma = getTenantDb("public");

    // 2. Perform a raw SQL handshake
    // This verifies the network path and credentials without needing models
    await prisma.$queryRaw`SELECT 1`;
    
    status = "✅ Database Connected Successfully!";
  } catch (error) {
    console.error("Database Test Failed:", error);
    status = "❌ Connection Failed. Check your DATABASE_URL and Password.";
  }
  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Database Health Check</h1>
      <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>{status}</p>
    </div>
  );

}