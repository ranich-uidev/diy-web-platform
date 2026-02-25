// packages/database/src/provisioning.ts
import { platformDb } from "./index";

export async function provisionNewTenant(tenantId: string) {
  const schemaName = `tenant_${tenantId.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
  
  // 1. Create the Schema
  await platformDb.$executeRawUnsafe(`CREATE SCHEMA IF NOT EXISTS "${schemaName}";`);

  // 2. Create the Table (This is a simplified version of what Prisma Migrate does)
  // For production, you'd use a more robust "prisma db push" strategy
  await platformDb.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "${schemaName}"."Lead" (
      "id" TEXT PRIMARY KEY,
      "name" TEXT NOT NULL,
      "email" TEXT NOT NULL,
      "intent" TEXT NOT NULL,
      "status" TEXT DEFAULT 'NEW',
      "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
  
  console.log(`✅ Schema ${schemaName} is ready.`);
}