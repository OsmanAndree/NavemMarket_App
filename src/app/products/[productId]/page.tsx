"use client";

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Heart, MessageSquare } from 'lucide-react';
import { AppShell } from '@/components/app-shell';
import PageHeader from '@/components/page-header';
import { useAppContext, useRequireAuth } from '@/contexts/app-provider';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProductDetailPage() {
  useRequireAuth();
  const params = useParams();
  const router = useRouter();
  const { products, favorites, toggleFavorite } = useAppContext();
  const productId = params.productId as string;
  
  const product = products.find(p => p.id === productId);
  const isFavorite = favorites.includes(productId);

  if (!product) {
    return (
      <AppShell>
        <PageHeader title="Loading..." showBack />
         <div className="p-4 space-y-4">
            <Skeleton className="w-full h-80 rounded-lg" />
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <Skeleton className="h-6 w-1/2" />
            </div>
            <Skeleton className="h-20 w-full" />
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <PageHeader title={product.title} showBack />
      <div>
        <div className="relative w-full aspect-square">
            <Image
                src={product.imageUrl}
                alt={product.title}
                fill
                className="object-cover"
                data-ai-hint={product.imageHint}
            />
        </div>
        
        <div className="p-4 space-y-4">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                    <h1 className="text-2xl font-bold font-headline">{product.title}</h1>
                    <p className="text-3xl font-bold text-primary mt-1">${product.price.toFixed(2)}</p>
                </div>
                <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-12 w-12"
                    onClick={() => toggleFavorite(product.id)}
                    aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                    <Heart className={cn("h-7 w-7", isFavorite ? "text-accent fill-current" : "text-muted-foreground")} />
                </Button>
            </div>
            
            <Separator />
            
            <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                    <AvatarImage src={product.seller.avatarUrl} alt={product.seller.name} />
                    <AvatarFallback>{product.seller.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-semibold">{product.seller.name}</p>
                    <p className="text-sm text-muted-foreground">Seller</p>
                </div>
            </div>

            <Separator />

            <div>
                <h2 className="font-semibold text-lg mb-2">Description</h2>
                <p className="text-muted-foreground whitespace-pre-wrap">{product.description}</p>
            </div>

            <Button size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" onClick={() => router.push('/chat')}>
                <MessageSquare className="mr-2 h-5 w-5" />
                Contact Seller
            </Button>
        </div>
      </div>
    </AppShell>
  );
}
