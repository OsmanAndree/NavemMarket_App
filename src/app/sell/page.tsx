"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAppContext, useRequireAuth } from "@/contexts/app-provider";
import { productCategories } from "@/lib/mock-data";
import { enrichDescriptionAction } from "./actions";
import { Sparkles, Loader2, Upload } from "lucide-react";
import { useState } from "react";

const productSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  category: z.string().min(1, "Please select a category"),
  price: z.coerce.number().min(0.01, "Price must be positive"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

type ProductFormData = z.infer<typeof productSchema>;

export default function SellPage() {
  useRequireAuth();
  const { addProduct } = useAppContext();
  const router = useRouter();
  const { toast } = useToast();
  const [isEnriching, setIsEnriching] = useState(false);

  const { control, handleSubmit, watch, setValue, formState: { errors } } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      category: "",
      price: 0,
      description: ""
    },
  });

  const descriptionValue = watch("description");
  const categoryValue = watch("category");

  const handleEnrichDescription = async () => {
    if (!descriptionValue || !categoryValue) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please provide a category and a basic description first.",
      });
      return;
    }
    setIsEnriching(true);
    try {
      const result = await enrichDescriptionAction({
        productDescription: descriptionValue,
        productCategory: categoryValue,
      });
      if (result.success && result.data) {
        setValue("description", result.data.enrichedDescription, { shouldValidate: true });
        toast({
          title: "Description Enriched!",
          description: "Your product description has been enhanced by AI.",
        });
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "AI Enrichment Failed",
        description: "Could not enrich the description. Please try again.",
      });
    } finally {
      setIsEnriching(false);
    }
  };

  const onSubmit = (data: ProductFormData) => {
    addProduct({
        ...data,
        imageUrl: `https://picsum.photos/seed/${data.title.replace(/\s+/g, '')}/600/600`, // Create a placeholder image
        imageHint: data.category.toLowerCase(),
    });
    toast({
      title: "Product Listed!",
      description: `${data.title} is now available on the marketplace.`,
    });
    router.push('/home');
  };

  return (
    <AppShell>
      <PageHeader title="List a New Product" />
      <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-6">
        <div className="space-y-2">
            <Label>Upload Image</Label>
            <div className="flex items-center justify-center w-full">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-secondary transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-3 text-muted-foreground" />
                        <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-muted-foreground">(Mock upload)</p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" disabled />
                </label>
            </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Controller name="title" control={control} render={({ field }) => <Input id="title" placeholder="e.g., Vintage Leather Jacket" {...field} />} />
          {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Controller
                name="category"
                control={control}
                render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger id="category">
                        <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                        {productCategories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                    </SelectContent>
                </Select>
                )}
            />
             {errors.category && <p className="text-sm text-destructive">{errors.category.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Price ($)</Label>
            <Controller name="price" control={control} render={({ field }) => <Input id="price" type="number" step="0.01" placeholder="e.g., 25.00" {...field} />} />
            {errors.price && <p className="text-sm text-destructive">{errors.price.message}</p>}
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="description">Description</Label>
            <Button type="button" variant="ghost" size="sm" onClick={handleEnrichDescription} disabled={isEnriching}>
              {isEnriching ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4 text-primary" />
              )}
              Enrich with AI
            </Button>
          </div>
          <Controller name="description" control={control} render={({ field }) => <Textarea id="description" placeholder="Describe your item in detail..." rows={6} {...field} />} />
          {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
        </div>

        <Button type="submit" size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">List Product</Button>
      </form>
    </AppShell>
  );
}
