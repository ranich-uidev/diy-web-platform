import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { getTenantDb } from "../../database/index";

export const saveSiteLayoutTool = tool(
  async ({ tenantId, theme, layout }) => {
    const db = getTenantDb(`tenant_${tenantId}`);
    
    const config = await db.siteConfig.upsert({
      where: { tenantId },
      update: { theme, layout },
      create: { tenantId, theme, layout },
    });

    return `Success: Website layout for ${tenantId} has been saved.`;
  },
  {
    name: "save_site_layout",
    description: "Saves the generated website theme and component layout to the tenant database.",
    schema: z.object({
      tenantId: z.string(),
      theme: z.object({
        themeId: z.enum(["luxury", "modern", "forest", "sunset"]).optional(),
        primaryColor: z.string(),
        fontFamily: z.string().optional(),
        backgroundColor: z.string().optional(),
        foregroundColor: z.string().optional(),
        accentColor: z.string().optional(),
        surfaceColor: z.string().optional(),
        mutedColor: z.string().optional(),
      }),
      layout: z.array(z.object({
        component: z.string().describe("e.g., 'Hero', 'Navbar', 'FeatureList'"),
        props: z.any().describe("The data passed to the React component"),
      })),
    }),
  }
);