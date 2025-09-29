"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, PlusSquare, Heart, User, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { useAppContext } from '@/contexts/app-provider';

const navItems = [
  { href: '/home', icon: Home, label: 'Home' },
  { href: '/sell', icon: PlusSquare, label: 'Sell' },
  { href: '/favorites', icon: Heart, label: 'Favorites' },
  { href: '/profile', icon: User, label: 'Profile' },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { favorites } = useAppContext();

  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 bg-card/95 backdrop-blur-md border-t border-border w-full max-w-md mx-auto z-10 shadow-strong">
      <nav className="flex justify-around items-center h-full px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const showBadge = item.href === '/favorites' && favorites.length > 0;
          
          return (
            <Link key={item.href} href={item.href} className={cn(
              "flex flex-col items-center justify-center text-muted-foreground w-1/4 transition-all duration-300 relative group",
              isActive ? 'text-primary' : 'hover:text-primary hover:scale-105'
            )}>
              <div className="relative">
                <item.icon className={cn(
                  "h-6 w-6 transition-all duration-300",
                  isActive && "animate-bounce-subtle"
                )} />
                
                {/* Indicador de notificación */}
                {showBadge && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs animate-pulse"
                  >
                    {favorites.length}
                  </Badge>
                )}
                
                {/* Indicador de página activa */}
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full animate-scale-in" />
                )}
              </div>
              
              <span className={cn(
                "text-xs mt-1 transition-all duration-300 font-medium",
                isActive && "text-primary font-semibold"
              )}>
                {item.label}
              </span>
              
              {/* Efecto de fondo para elemento activo */}
              {isActive && (
                <div className="absolute inset-0 bg-primary/10 rounded-lg -z-10 animate-fade-in" />
              )}
            </Link>
          );
        })}
      </nav>
      
      {/* Indicador de notificaciones globales */}
      <div className="absolute top-2 right-4">
        <div className="relative">
          <Bell className="h-4 w-4 text-muted-foreground animate-pulse" />
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full animate-ping" />
        </div>
      </div>
    </div>
  );
}
