"use client";

import type { Product } from '@/lib/types';
import { initialProducts } from '@/lib/mock-data';
import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface AppContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'seller'>) => void;
  favorites: string[];
  toggleFavorite: (productId: string) => void;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
  };
  
  const addProduct = (productData: Omit<Product, 'id' | 'seller'>) => {
    const newProduct: Product = {
      ...productData,
      id: (products.length + 1).toString(),
      seller: {
        id: 'user1',
        name: 'Current User',
        avatarUrl: 'https://picsum.photos/seed/user_avatar/100/100'
      }
    };
    setProducts(prev => [newProduct, ...prev]);
  };

  const login = () => {
    setIsAuthenticated(true);
    router.push('/home');
  };

  const logout = () => {
    setIsAuthenticated(false);
    router.push('/');
  };

  const value = {
    products,
    addProduct,
    favorites,
    toggleFavorite,
    isAuthenticated,
    login,
    logout,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}

export function useRequireAuth() {
  const { isAuthenticated } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    // We need to check if the component is mounted before checking auth state
    // to avoid redirecting on server-side render.
    if (typeof window !== 'undefined' && !isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);
}
