'use client';
import Link from 'next/link';
import { CodeXml, LogIn, Menu } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Button } from '@/components/ui/button';
import { useUser } from '@/context/UserContext';
import { UserNav } from '@/components/layout/UserNav';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useState } from 'react';

const navLinks = [
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/research', label: 'Research' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const { user } = useUser();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <header className="bg-background/80 text-foreground shadow-md sticky top-0 z-50 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-2xl font-headline hover:text-primary transition-colors">
          <CodeXml className="w-8 h-8 text-primary" />
          <div>
            <span className="font-bold text-foreground">Bernard Fiagbenu</span>
            <p className="text-xs text-muted-foreground font-body">Computer Science</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2 sm:space-x-4 font-body">
          <div className="flex gap-4 mr-4">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-primary transition-colors font-medium">
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-2">
            {user ? (
               <UserNav />
            ) : (
                <Button variant="outline" size="sm">
                  Login
                </Button>
            )}
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center gap-2">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Navigation</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col space-y-4 mt-8">
                {navLinks.map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-lg font-medium"
                    onClick={() => setIsSheetOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
