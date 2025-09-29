import React from 'react';
import BottomNav from './bottom-nav';

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-md mx-auto bg-background min-h-screen flex flex-col shadow-lg">
      <main className="flex-1 overflow-y-auto pb-24 animate-fade-in">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
