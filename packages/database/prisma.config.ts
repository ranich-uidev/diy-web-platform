// packages/database/prisma.config.ts
import { defineConfig } from "prisma/config";
import path from "path";
import dotenv from "dotenv";

// Manually load the env from the root
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export default defineConfig({
  schema: "schema.prisma",
  datasource: {
    url: process.env.DIRECT_URL,
  },
});