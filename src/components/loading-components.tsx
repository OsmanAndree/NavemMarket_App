"use client";

import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
}

export function LoadingSpinner({ size = 'md', text, className }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  };

  return (
    <div className={cn("flex flex-col items-center justify-center space-y-2", className)}>
      <Loader2 className={cn("animate-spin text-primary", sizeClasses[size])} />
      {text && (
        <p className="text-sm text-muted-foreground animate-fade-in">{text}</p>
      )}
    </div>
  );
}

interface LoadingCardProps {
  className?: string;
}

export function LoadingCard({ className }: LoadingCardProps) {
  return (
    <div className={cn("space-y-4 animate-pulse", className)}>
      <div className="bg-gradient-surface rounded-lg h-48 w-full" />
      <div className="space-y-2">
        <div className="bg-gradient-surface rounded h-4 w-3/4" />
        <div className="bg-gradient-surface rounded h-3 w-1/2" />
        <div className="bg-gradient-surface rounded h-4 w-1/4" />
      </div>
    </div>
  );
}
