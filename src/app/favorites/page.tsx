"use client";

import { AppShell } from "@/components/app-shell";
import PageHeader from "@/components/page-header";
import ProductCard from "@/components/product-card";
import { EmptyState } from "@/components/empty-state";
import { useAppContext, useRequireAuth } from "@/contexts/app-provider";
import { Heart, ShoppingBag } from "lucide-react";
import { useRouter } from 'next/navigation';

export default function FavoritesPage() {
  useRequireAuth();
  const router = useRouter();
  const { products, favorites } = useAppContext();
  const favoriteProducts = products.filter(p => favorites.includes(p.id));

  return (
    <AppShell>
      <PageHeader title="Favoritos" />
      <div className="p-4">
        {favoriteProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {favoriteProducts.map((product, index) => (
              <div 
                key={product.id} 
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={Heart}
            title="No hay favoritos aún"
            description="Haz clic en el icono de corazón en los productos que te gusten para guardarlos aquí para un acceso fácil."
            actionLabel="Navegar productos"
            onAction={() => router.push('/home')}
          />
        )}
      </div>
    </AppShell>
  );
}
