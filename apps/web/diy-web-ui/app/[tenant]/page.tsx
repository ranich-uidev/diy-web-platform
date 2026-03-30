// apps/web/app/[tenant]/page.tsx
import { getTenantDb } from "@repo/db";
import { SiteRenderer } from "../../../components/sections/site-renderer";

type TenantPageProps = {
  // 1. Wrap params in a Promise for Next.js 15
  params: Promise<{
    tenant?: string;
  }>;
};

export default async function TenantPage({ params }: TenantPageProps) {
  // 2. Await the params before accessing properties
  const resolvedParams = await params;
  const tenantSlug = resolvedParams?.tenant;

  console.log("TenantSlug", tenantSlug);

  if (!tenantSlug) {
    return <div>Tenant not specified. Visit /[tenant] with a valid slug.</div>;
  }

  const db = getTenantDb(`tenant_${tenantSlug}`);

  const siteConfig = await db.siteConfig.findUnique({
    where: { tenantId: tenantSlug },
  });

  if (!siteConfig) return <div>Site not found. Run the agent test!</div>;

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <SiteRenderer layout={siteConfig.layout} />
    </main>
  );
}