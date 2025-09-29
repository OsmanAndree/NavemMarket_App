"use server";

import { enrichProductDescription, EnrichProductDescriptionInput } from '@/ai/flows/enrich-product-description';

export async function enrichDescriptionAction(input: EnrichProductDescriptionInput) {
  try {
    const result = await enrichProductDescription(input);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error enriching description:", error);
    return { success: false, error: "Failed to enrich description." };
  }
}
