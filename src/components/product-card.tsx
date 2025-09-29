"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Heart, Star, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Product } from '@/lib/types';
import { useAppContext } from '@/contexts/app-provider';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { favorites, toggleFavorite } = useAppContext();
  const isFavorite = favorites.includes(product.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product.id);
  };

  return (
    <Link href={`/products/${product.id}`} className="block group">
      <Card className="overflow-hidden transition-all duration-300 hover-lift bg-gradient-card border-0 shadow-soft hover:shadow-medium">
        <CardContent className="p-0">
          <div className="relative overflow-hidden">
            <Image
              src={product.imageUrl}
              alt={product.title}
              width={600}
              height={600}
              className="object-cover w-full aspect-square transition-all duration-500 group-hover:scale-110"
              data-ai-hint={product.imageHint}
            />
            
            {/* Overlay con gradiente sutil */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Badge de categoría */}
            <Badge 
              variant="secondary" 
              className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm text-foreground border-0 shadow-soft animate-fade-in"
            >
              {product.category}
            </Badge>
            
            {/* Botón de favoritos mejorado */}
            <Button
              size="icon"
              className={cn(
                "absolute top-3 right-3 rounded-full h-9 w-9 transition-all duration-300 hover:scale-110",
                isFavorite 
                  ? 'bg-accent text-accent-foreground shadow-soft hover:shadow-medium animate-bounce-subtle' 
                  : 'bg-background/90 backdrop-blur-sm text-foreground hover:bg-accent hover:text-accent-foreground shadow-soft'
              )}
              variant={isFavorite ? 'default' : 'outline'}
              onClick={handleFavoriteClick}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart className={cn("h-4 w-4 transition-all duration-200", isFavorite && "fill-current")} />
            </Button>
            
            {/* Botón de vista rápida */}
            <Button
              size="icon"
              variant="outline"
              className="absolute bottom-3 right-3 rounded-full h-9 w-9 bg-background/90 backdrop-blur-sm text-foreground border-0 shadow-soft opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // Aquí podrías agregar funcionalidad de vista rápida
              }}
              aria-label="Quick view"
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="p-4 space-y-2">
            <div className="flex items-start justify-between">
              <h3 className="font-headline font-semibold text-base leading-tight group-hover:text-primary transition-colors duration-200 overflow-hidden text-ellipsis">
                {product.title}
              </h3>
              <div className="flex items-center ml-2">
                <Star className="h-4 w-4 text-warning fill-current" />
                <span className="text-xs text-muted-foreground ml-1">4.8</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground capitalize">{product.category}</p>
              <p className="font-bold text-lg text-primary">${product.price.toFixed(2)}</p>
            </div>
            
            {/* Barra de progreso sutil para simular disponibilidad */}
            <div className="w-full bg-muted rounded-full h-1.5">
              <div 
                className="bg-gradient-accent h-1.5 rounded-full transition-all duration-500" 
                style={{ width: `${Math.random() * 40 + 60}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground">Available</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
