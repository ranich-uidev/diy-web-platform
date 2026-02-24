// packages/database/src/index.ts
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

// Global cache to prevent connection leaks during Next.js HMR
// packages/database/src/index.ts
export function getTenantDb(schemaName: string) {
  // Use process.env directly to ensure we get the string
  const dbUrl = process.env.DATABASE_URL;

  if (!dbUrl) {
    console.error("❌ DATABASE_URL is missing from process.env");
    throw new Error("DATABASE_URL is not defined");
  }

  // Logic to handle the schema parameter correctly
  const urlWithSchema = dbUrl.includes('?') 
    ? `${dbUrl}&schema=${schemaName}` 
    : `${dbUrl}?schema=${schemaName}`;

  const pool = new Pool({ connectionString: urlWithSchema });
  const adapter = new PrismaPg(pool);

  return new PrismaClient({ adapter });
}


export * from "../generated/prisma/client";
