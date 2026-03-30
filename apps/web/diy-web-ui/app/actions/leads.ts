"use server";

import { getTenantDb } from "@repo/database";
import { revalidatePath } from "next/cache";

export async function createLeadAction(tenantId: string, formData: FormData) {
  // 1. Extract data from the form
  const name = formData.get("Name") as string;
  const email = formData.get("Email") as string;
  const phone = formData.get("Phone") as string;
  const message = formData.get("Message") as string;
console.log("tenantId", tenantId);
  // 2. Connect to the specific tenant DB
  // Ensure we sanitize the ID to match your schema naming convention
  const db = getTenantDb(`tenant_${tenantId.replace(/-/g, '')}`);

  try {
    await db.lead.create({
      data: {
        name: name || "Anonymous",
        email: email,
        intent: `Message: ${message} | Phone: ${phone}`,
        status: "NEW",
      },
    });

    revalidatePath(`/[tenant]`, "page");
    return { success: true };
  } catch (error) {
    console.error("Failed to save lead:", error);
    return { success: false, error: "Could not save your request." };
  }
}