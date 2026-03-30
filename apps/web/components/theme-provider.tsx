"use client";

import { useEffect } from "react";

interface ThemeProviderProps {
  theme: {
    primary: string;
    background: string;
    foreground: string;
    accent: string;
    surface: string;
    muted: string;
  };
  children: React.ReactNode;
}

export function ThemeProvider({ theme, children }: ThemeProviderProps) {
  // Apply theme variables immediately via style tag
  const styleContent = `
    :root {
      --primary: ${theme.primary} !important;
      --background: ${theme.background} !important;
      --foreground: ${theme.foreground} !important;
      --accent: ${theme.accent} !important;
      --surface: ${theme.surface} !important;
      --muted: ${theme.muted} !important;
    }
    html, body {
      background-color: ${theme.background} !important;
      color: ${theme.foreground} !important;
    }
  `;

  useEffect(() => {
    // Also set via JavaScript for safety
    const root = document.documentElement;
    root.style.setProperty("--primary", theme.primary, "important");
    root.style.setProperty("--background", theme.background, "important");
    root.style.setProperty("--foreground", theme.foreground, "important");
    root.style.setProperty("--accent", theme.accent, "important");
    root.style.setProperty("--surface", theme.surface, "important");
    root.style.setProperty("--muted", theme.muted, "important");

    document.body.style.setProperty("background-color", theme.background, "important");
    document.body.style.setProperty("color", theme.foreground, "important");
  }, [theme]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styleContent }} />
      {children}
    </>
  );
}

