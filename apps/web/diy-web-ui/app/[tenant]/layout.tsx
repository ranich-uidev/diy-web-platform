import { getTenantDb } from "@repo/db";
import { resolveTenantTheme } from "../lib/tenant-themes";
import { ThemeProvider } from "../../../components/theme-provider";

type TenantLayoutProps = {
  children: React.ReactNode;
  params: Promise<{
    tenant?: string;
  }>;
};

export default async function TenantLayout({
  children,
  params,
}: TenantLayoutProps) {
  // Resolve tenant theme and apply it at layout level
  const resolvedParams = await params;
  const tenantSlug = resolvedParams?.tenant;

  let theme = {
    primary: "#3b82f6",
    background: "#ffffff",
    foreground: "#171717",
    accent: "#93c5fd",
    surface: "#ffffff",
    muted: "#64748b",
  };

  if (tenantSlug) {
    try {
      const db = getTenantDb(`tenant_${tenantSlug}`);
      const siteConfig = await db.siteConfig.findUnique({
        where: { tenantId: tenantSlug },
      });

      if (siteConfig) {
        theme = resolveTenantTheme(siteConfig.theme);
      }
    } catch (error) {
      // If DB query fails, use default theme
      console.error("Failed to load tenant theme:", error);
    }
  }

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
