import { tool } from "@langchain/core/tools";
import { z } from "zod";
// Use the workspace alias instead of relative paths
import { getTenantDb } from "../../database/index";

export const createLeadTool = tool(
  async ({ name, email, intent, tenantId }) => {
    const safeTenantId = tenantId.toLowerCase().replace(/[^a-z0-9_]/g, '');

    const db = getTenantDb(`tenant_${safeTenantId}`);

    console.log(`DEBUG: Attempting to save lead to schema: tenant_${safeTenantId}`);
    console.log("DEBUG: Does db.lead exist?", !!db?.lead);

    if (!db?.lead) {
      throw new Error(`The 'lead' model is missing or Prisma is not initialized properly.`);
    }

    try {
      const lead = await db.lead.create({
        data: {
          name,
          email,
          intent,
          status: "NEW",
        },
      });

      return `Success: Lead created for ${name}. ID: ${lead.id}`;
    } catch (error: any) {
      console.error("Database Error:", error);
      return `Error: Failed to save lead to the database. ${error.message}`;
    }
  },
  {
    name: "create_lead",
    description: "Saves a new potential client or patient into the business database.",
    schema: z.object({
      name: z.string().describe("The user's full name"),
      email: z.string().email().describe("The user's email address"),
      intent: z.string().describe("What the user is looking for (e.g., MRI Scan, Portfolio Review)"),
      tenantId: z.string().describe("The unique slug/subdomain of the business"),
    }),
  }
  
);
