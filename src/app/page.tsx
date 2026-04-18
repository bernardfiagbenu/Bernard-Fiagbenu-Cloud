'use client';

import Link from 'next/link';
import { ChevronRight, Code, Brain, Shield, Rocket } from 'lucide-react';
import dynamic from 'next/dynamic';
import { homePageSketch } from '@/components/p5/HomePageSketch';

const P5Sketch = dynamic(() => import('@/components/ui/P5Sketch'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 w-full h-full bg-background z-0" />,
});

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <P5Sketch sketch={homePageSketch} className="fixed inset-0 w-full h-full z-0" />
      <div className="fixed inset-0 z-10 bg-background/60 backdrop-blur-[2px]"></div>

      <main className="relative z-20 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4">
        <div className="text-center max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-block px-4 py-1.5 mb-6 text-sm font-medium tracking-wider text-primary uppercase bg-primary/10 rounded-full">
            Computer Scientist & Innovator
          </div>
          <h1 className="text-5xl md:text-7xl font-headline font-bold mb-6 tracking-tight">
            Innovating for <span className="text-primary italic">Ghana</span> and Africa
          </h1>
          <p className="text-xl md:text-2xl font-body text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto">
            Combining theoretical depth with practical solutions in BCI, Cybersecurity, and AI to drive sustainable development.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/projects" 
              className="px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all hover:shadow-xl hover:-translate-y-1"
            >
              View Projects <ChevronRight className="w-5 h-5" />
            </Link>
            <Link 
              href="/research" 
              className="px-8 py-4 bg-background/80 backdrop-blur-md border border-primary/20 text-foreground rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-accent transition-all"
            >
              Read Research
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 w-full max-w-6xl px-4 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
          <div className="p-6 bg-background/40 backdrop-blur-md rounded-2xl border border-primary/10">
            <Brain className="w-10 h-10 text-accent mb-4" />
            <h3 className="text-xl font-headline font-bold mb-2">BCI Research</h3>
            <p className="text-muted-foreground font-body">Pioneering zero-calibration motor imagery systems for assistive tech.</p>
          </div>
          <div className="p-6 bg-background/40 backdrop-blur-md rounded-2xl border border-primary/10">
            <Shield className="w-10 h-10 text-primary mb-4" />
            <h3 className="text-xl font-headline font-bold mb-2">Cybersecurity</h3>
            <p className="text-muted-foreground font-body">Building ethical hacking frameworks for resilient digital infrastructure.</p>
          </div>
          <div className="p-6 bg-background/40 backdrop-blur-md rounded-2xl border border-primary/10">
            <Rocket className="w-10 h-10 text-accent mb-4" />
            <h3 className="text-xl font-headline font-bold mb-2">AI Innovation</h3>
            <p className="text-muted-foreground font-body">Applying machine learning to real-world African challenges.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
