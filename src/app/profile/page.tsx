"use client";

import { AppShell } from "@/components/app-shell";
import PageHeader from "@/components/page-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAppContext, useRequireAuth } from "@/contexts/app-provider";
import { LogOut, ChevronRight } from "lucide-react";

export default function ProfilePage() {
  useRequireAuth();
  const { logout } = useAppContext();

  const menuItems = [
    "Edit Profile",
    "My Listings",
    "Purchase History",
    "Settings",
    "Help & Support"
  ];

  return (
    <AppShell>
      <PageHeader title="Profile" />
      <div className="p-4 flex flex-col items-center">
        <Avatar className="h-24 w-24 mt-4 mb-2 border-4 border-primary/50">
          <AvatarImage src="https://picsum.photos/seed/user_avatar/100/100" alt="User Name" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <h1 className="text-2xl font-bold font-headline">Current User</h1>
        <p className="text-muted-foreground">test@example.com</p>
      </div>
      
      <div className="px-4 mt-6">
        <Card>
            <CardContent className="p-0">
                <ul className="divide-y">
                    {menuItems.map((item, index) => (
                        <li key={index} className="p-4 flex justify-between items-center cursor-pointer hover:bg-secondary transition-colors">
                            <span>{item}</span>
                            <ChevronRight className="h-4 w-4 text-muted-foreground"/>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
      </div>

      <div className="mt-auto p-4">
        <Button variant="destructive" className="w-full" onClick={logout}>
          <LogOut className="mr-2 h-4 w-4" />
          Log Out
        </Button>
      </div>
    </AppShell>
  );
}
