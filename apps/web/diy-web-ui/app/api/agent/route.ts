// apps/web/diy-web-ui/app/api/agent/route.ts
import { createTenantAgent } from "@repo/agents";

export async function POST(req: Request) {
  const { tenantId, input } = await req.json();
  const agent = createTenantAgent();

  const result = await agent.invoke({
    messages: [input],
    tenantId: tenantId
  });

  return Response.json(result);
}
