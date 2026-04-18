'use client';

import Link from 'next/link';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-background border-t border-primary/10 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h2 className="text-2xl font-headline font-bold text-primary mb-2">Bernard Fiagbenu</h2>
            <p className="font-body text-muted-foreground">Innovating for Ghana and Africa through Technology.</p>
          </div>
          
          <div className="flex gap-6">
            <Link href="https://github.com/bernardfiagbenu" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
              <Github className="w-6 h-6" />
            </Link>
            <Link href="https://linkedin.com/in/bernardfiagbenu" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin className="w-6 h-6" />
            </Link>
            <Link href="https://x.com/FiagbenuBe14283" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
              <Twitter className="w-6 h-6" />
            </Link>
            <Link href="mailto:bernard@example.com" className="text-muted-foreground hover:text-primary transition-colors">
              <Mail className="w-6 h-6" />
            </Link>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-primary/5 text-center text-sm text-muted-foreground font-body">
          <p>&copy; {new Date().getFullYear()} Bernard Fiagbenu. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
