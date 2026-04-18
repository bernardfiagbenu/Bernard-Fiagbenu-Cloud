'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

export function UserNav() {
  return (
    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
      <Avatar className="h-8 w-8">
        <AvatarImage src="/profile.jpg" alt="Bernard" />
        <AvatarFallback>BF</AvatarFallback>
      </Avatar>
    </Button>
  );
}
