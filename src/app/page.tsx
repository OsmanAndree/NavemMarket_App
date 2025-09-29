"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useAppContext } from '@/contexts/app-provider';
import { ShoppingBag } from 'lucide-react';

export default function LoginPage() {
  const { login, isAuthenticated } = useAppContext();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && isAuthenticated) {
      router.push('/home');
    }
  }, [isAuthenticated, router, isClient]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login();
  };
  
  if (!isClient || isAuthenticated) {
      return (
        <div className="flex justify-center items-center min-h-screen">
            <ShoppingBag className="h-8 w-8 animate-spin text-primary" />
        </div>
      );
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-surface">
      <Card className="w-full max-w-sm bg-gradient-card border-0 shadow-strong animate-scale-in">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <ShoppingBag className="h-10 w-10 text-primary animate-bounce-subtle" />
          </div>
          <CardTitle className="text-2xl font-headline bg-gradient-primary bg-clip-text text-transparent">
            Welcome to MarketShuffle
          </CardTitle>
          <CardDescription>Log in to start buying and selling</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="you@example.com" 
                defaultValue="test@example.com" 
                required 
                className="bg-gradient-surface border-0 shadow-soft focus:shadow-medium transition-all duration-200"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                required 
                defaultValue="password"
                className="bg-gradient-surface border-0 shadow-soft focus:shadow-medium transition-all duration-200"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-gradient-primary hover:opacity-90 text-primary-foreground hover-lift"
            >
              Log In
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center text-sm">
          <p className="w-full">
            Don't have an account?{' '}
            <Link href="/signup" className="font-semibold text-primary hover:underline transition-colors duration-200">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
