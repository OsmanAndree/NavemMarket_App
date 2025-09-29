"use client";

import { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface SearchAndFilterProps {
  onSearch?: (query: string) => void;
  onFilter?: (filters: string[]) => void;
  placeholder?: string;
  categories?: string[];
}

export function SearchAndFilter({ 
  onSearch, 
  onFilter, 
  placeholder = "Search products...",
  categories = []
}: SearchAndFilterProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearch?.(value);
  };

  const toggleFilter = (category: string) => {
    const newFilters = selectedFilters.includes(category)
      ? selectedFilters.filter(f => f !== category)
      : [...selectedFilters, category];
    
    setSelectedFilters(newFilters);
    onFilter?.(newFilters);
  };

  const clearFilters = () => {
    setSelectedFilters([]);
    onFilter?.([]);
  };

  return (
    <div className="space-y-3">
      {/* Barra de búsqueda */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10 pr-10 bg-gradient-surface border-0 shadow-soft focus:shadow-medium transition-all duration-200"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 hover:bg-destructive/10"
            onClick={() => handleSearch('')}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Botón de filtros */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="hover-lift bg-gradient-surface border-0 shadow-soft"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
          {selectedFilters.length > 0 && (
            <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
              {selectedFilters.length}
            </Badge>
          )}
        </Button>

        {selectedFilters.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-muted-foreground hover:text-destructive"
          >
            Clear all
          </Button>
        )}
      </div>

      {/* Panel de filtros expandible */}
      {isExpanded && (
        <Card className="animate-slide-up bg-gradient-card border-0 shadow-medium">
          <CardContent className="p-4">
            <div className="space-y-3">
              <h3 className="font-semibold text-sm">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant={selectedFilters.includes(category) ? "default" : "outline"}
                    className={cn(
                      "cursor-pointer transition-all duration-200 hover:scale-105",
                      selectedFilters.includes(category) 
                        ? "bg-gradient-primary text-primary-foreground" 
                        : "hover:bg-accent hover:text-accent-foreground"
                    )}
                    onClick={() => toggleFilter(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
