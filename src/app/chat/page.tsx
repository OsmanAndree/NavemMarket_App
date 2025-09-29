"use client";

import { AppShell } from "@/components/app-shell";
import PageHeader from "@/components/page-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppContext, useRequireAuth } from "@/contexts/app-provider";
import { mockChatMessages } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Send } from "lucide-react";
import { useEffect, useRef } from "react";

export default function ChatPage() {
  useRequireAuth();
  const { products } = useAppContext();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  const seller = products[0].seller;

  useEffect(() => {
    if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, []);

  return (
    <AppShell>
      <div className="flex flex-col h-full">
        <PageHeader title={seller.name} showBack />
        <div ref={scrollAreaRef} className="flex-1 overflow-y-auto p-4 space-y-4">
          {mockChatMessages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex items-end gap-2 max-w-[80%]",
                message.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
              )}
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={message.sender === 'user' ? 'https://picsum.photos/seed/user_avatar/100/100' : seller.avatarUrl} />
                <AvatarFallback>{message.sender === 'user' ? 'U' : seller.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div
                className={cn(
                  "rounded-lg px-3 py-2",
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground rounded-br-none'
                    : 'bg-secondary text-secondary-foreground rounded-bl-none'
                )}
              >
                <p className="text-sm">{message.text}</p>
                <p className={cn("text-xs opacity-70 mt-1", message.sender === 'user' ? 'text-right' : 'text-left')}>
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 bg-background border-t">
          <div className="relative">
            <Input placeholder="Type a message..." className="pr-12 h-11" />
            <Button size="icon" className="absolute right-1.5 top-1/2 -translate-y-1/2 h-8 w-8 bg-accent hover:bg-accent/90">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
