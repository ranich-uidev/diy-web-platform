type ThemePreset = {
  id: string;
  name: string;
  background: string;
  foreground: string;
  primary: string;
  accent: string;
  surface: string;
  muted: string;
};

const PRESETS: Record<string, ThemePreset> = {
  luxury: {
    id: "luxury",
    name: "Luxury Gold",
    background: "#0b0b0d",
    foreground: "#f5f3ef",
    primary: "#c9a86a",
    accent: "#e6d2a8",
    surface: "#131317",
    muted: "#a1a1aa",
  },
  modern: {
    id: "modern",
    name: "Modern Blue",
    background: "#f8fafc",
    foreground: "#0f172a",
    primary: "#2563eb",
    accent: "#60a5fa",
    surface: "#ffffff",
    muted: "#64748b",
  },
  forest: {
    id: "forest",
    name: "Forest Premium",
    background: "#f5f7f4",
    foreground: "#102217",
    primary: "#166534",
    accent: "#4ade80",
    surface: "#ffffff",
    muted: "#4b6354",
  },
  sunset: {
    id: "sunset",
    name: "Sunset Coral",
    background: "#fff7f5",
    foreground: "#3f1f1b",
    primary: "#ea580c",
    accent: "#fb923c",
    surface: "#ffffff",
    muted: "#7c3f36",
  },
};

export type ResolvedTheme = ThemePreset;

export function resolveTenantTheme(rawTheme: any): ResolvedTheme {
  const presetId = rawTheme?.themeId as string | undefined;
  const base = (presetId && PRESETS[presetId]) || PRESETS.modern;

  return {
    ...base,
    primary: rawTheme?.primaryColor || base.primary,
    background: rawTheme?.backgroundColor || base.background,
    foreground: rawTheme?.foregroundColor || base.foreground,
    accent: rawTheme?.accentColor || base.accent,
    surface: rawTheme?.surfaceColor || base.surface,
    muted: rawTheme?.mutedColor || base.muted,
  };
}

export const TENANT_THEME_PRESETS = Object.values(PRESETS).map((p) => ({
  id: p.id,
  name: p.name,
}));
