// packages/ui/src/registry.ts
import { Hero01 } from "./blocks/Hero";
import { TriageForm } from "./blocks/TriageForm";

export const ComponentRegistry = {
  "HERO_01": Hero01,
  "TRIAGE_FORM": TriageForm,
  // Add more blocks here
};

export type ComponentKey = keyof typeof ComponentRegistry;