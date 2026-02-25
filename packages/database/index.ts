import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

// 1. Setup the Platform DB (Public Schema)
// We define this globally so it's only created once
const platformPool = new Pool({ connectionString: process.env.DATABASE_URL });
const platformAdapter = new PrismaPg(platformPool);
export const platformDb = new PrismaClient({ adapter: platformAdapter });

// 2. The Tenant DB Factory
export function getTenantDb(schemaName: string): any {
  const baseUrl = process.env.DIRECT_URL ?? process.env.DATABASE_URL;

  if (!baseUrl) {
    throw new Error("❌ DIRECT_URL / DATABASE_URL is not defined in environment variables");
  }

  // Inject the schema into the connection string
  const urlWithSchema = baseUrl.includes("?")
    ? `${baseUrl}&schema=${schemaName}`
    : `${baseUrl}?schema=${schemaName}`;

  // For tenant-specific clients, we still use an adapter
  const tenantPool = new Pool({ connectionString: urlWithSchema });
  const tenantAdapter = new PrismaPg(tenantPool);

  return new PrismaClient({ adapter: tenantAdapter });
}

export * from "../generated/prisma/client";