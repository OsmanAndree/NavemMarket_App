"use client";

import { useState } from 'react';
import { AppShell } from "@/components/app-shell";
import PageHeader from "@/components/page-header";
import ProductCard from "@/components/product-card";
import { SearchAndFilter } from "@/components/search-and-filter";
import { EmptyState } from "@/components/empty-state";
import { useAppContext, useRequireAuth } from "@/contexts/app-provider";
import { Package } from 'lucide-react';
import { productCategories } from '@/lib/mock-data';

export default function HomePage() {
  useRequireAuth();
  const { products } = useAppContext();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    let filtered = products;
    
    if (query) {
      filtered = products.filter(product =>
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    setFilteredProducts(filtered);
  };

  const handleFilter = (filters: string[]) => {
    let filtered = products;
    
    if (searchQuery) {
      filtered = products.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (filters.length > 0) {
      filtered = filtered.filter(product =>
        filters.includes(product.category)
      );
    }
    
    setFilteredProducts(filtered);
  };

  return (
    <AppShell>
      <PageHeader title="Navem Market" />
      
      <div className="p-4 space-y-6">
        {/* Componente de búsqueda y filtros */}
        <SearchAndFilter
          onSearch={handleSearch}
          onFilter={handleFilter}
          categories={productCategories}
        />
        
        {/* Lista de productos */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {filteredProducts.map((product, index) => (
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
            icon={Package}
            title="No se encontraron productos"
            description={searchQuery 
              ? "Intenta ajustar tu búsqueda o filtros para encontrar lo que buscas."
              : "No hay productos disponibles en este momento. Intenta más tarde!"
            }
            actionLabel={searchQuery ? "Limpiar búsqueda" : undefined}
            onAction={searchQuery ? () => handleSearch('') : undefined}
          />
        )}
      </div>
    </AppShell>
  );
}
