"use client";

import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  className
}: EmptyStateProps) {
  return (
    <Card className={className || "bg-gradient-card border-0 shadow-soft"}>
      <CardContent className="flex flex-col items-center justify-center py-12 px-6 text-center">
        <div className="mb-6 p-4 rounded-full bg-muted/50 animate-fade-in">
          <Icon className="h-12 w-12 text-muted-foreground" />
        </div>
        
        <h3 className="text-lg font-semibold mb-2 text-foreground">
          {title}
        </h3>
        
        <p className="text-muted-foreground mb-6 max-w-sm leading-relaxed">
          {description}
        </p>
        
        {actionLabel && onAction && (
          <Button 
            onClick={onAction}
            className="bg-gradient-primary hover:opacity-90 text-primary-foreground hover-lift"
          >
            {actionLabel}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
