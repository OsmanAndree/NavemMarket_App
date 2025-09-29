"use client";

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import Logo from '@/components/logo';

interface PageHeaderProps {
  title: string;
  showBack?: boolean;
  showThemeToggle?: boolean;
}

export default function PageHeader({ title, showBack = false, showThemeToggle = true }: PageHeaderProps) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between h-14 px-4 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="flex items-center">
        {showBack && (
          <Button variant="ghost" size="icon" className="mr-2 hover-lift" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Atrás</span>
          </Button>
        )}
        {title === 'Navem Market' ? (
          <Logo size="medium" />
        ) : (
          <h1 className="text-lg font-bold font-headline truncate">{title}</h1>
        )}
      </div>
      
      {showThemeToggle && (
        <div className="flex items-center">
          <ThemeToggle />
        </div>
      )}
    </header>
  );
}
