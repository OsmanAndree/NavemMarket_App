'use server';

/**
 * @fileOverview This file implements a Genkit flow that enriches product descriptions using AI.
 *
 * It takes a basic product description as input and suggests improvements to make it more appealing and informative.
 * - enrichProductDescription - A function that enriches product description.
 * - EnrichProductDescriptionInput - The input type for the enrichProductDescription function.
 * - EnrichProductDescriptionOutput - The return type for the enrichProductDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EnrichProductDescriptionInputSchema = z.object({
  productDescription: z
    .string()
    .describe('The original product description to be enriched.'),
  productCategory: z.string().describe('The category of the product.'),
});
export type EnrichProductDescriptionInput = z.infer<typeof EnrichProductDescriptionInputSchema>;

const EnrichProductDescriptionOutputSchema = z.object({
  enrichedDescription: z
    .string()
    .describe('The enriched product description suggested by the AI.'),
});
export type EnrichProductDescriptionOutput = z.infer<typeof EnrichProductDescriptionOutputSchema>;

export async function enrichProductDescription(
  input: EnrichProductDescriptionInput
): Promise<EnrichProductDescriptionOutput> {
  return enrichProductDescriptionFlow(input);
}

const enrichProductDescriptionPrompt = ai.definePrompt({
  name: 'enrichProductDescriptionPrompt',
  input: {
    schema: EnrichProductDescriptionInputSchema,
  },
  output: {
    schema: EnrichProductDescriptionOutputSchema,
  },
  prompt: `You are an expert marketing copywriter specializing in writing compelling product descriptions.
  Given a basic product description and its category, your task is to enrich the description to make it more appealing and informative to potential buyers.

  Product Category: {{{productCategory}}}
  Original Description: {{{productDescription}}}

  Enriched Description:`,
});

const enrichProductDescriptionFlow = ai.defineFlow(
  {
    name: 'enrichProductDescriptionFlow',
    inputSchema: EnrichProductDescriptionInputSchema,
    outputSchema: EnrichProductDescriptionOutputSchema,
  },
  async input => {
    const {output} = await enrichProductDescriptionPrompt(input);
    return output!;
  }
);
