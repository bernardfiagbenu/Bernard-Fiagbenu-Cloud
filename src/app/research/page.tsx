'use client';

import SectionContainer from '@/components/ui/SectionContainer';
import Link from 'next/link';
import { ShieldAlert, Cpu, ChevronRight } from 'lucide-react';
import dynamic from 'next/dynamic';
import { homePageSketch } from '@/components/p5/HomePageSketch';

const P5Sketch = dynamic(() => import('@/components/ui/P5Sketch'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 w-full h-full bg-background z-0" />,
});

const researchItems = [
  {
    title: 'Ethical Hacking and Cyber Security In Ghana',
    subtitle: 'Masters Proposal',
    description: 'A study on enhancing cybersecurity resilience in Ghana digital infrastructure through ethical hacking frameworks.',
    icon: <ShieldAlert className="w-10 h-10 text-destructive" />,
    link: '/research/ethical-hacking-ghana',
    tags: ['Cybersecurity', 'Ethical Hacking', 'Ghana', 'Network Security']
  },
  {
    title: 'Brain-Computer Interfaces (BCI)',
    subtitle: 'Masters Proposal',
    description: 'Self-Supervised Learning for a Zero-Calibration Motor Imagery BCI.',
    icon: <Cpu className="w-10 h-10 text-primary" />,
    link: '/research/brain-computer-interfaces',
    tags: ['BCI', 'Machine Learning', 'Signal Processing', 'Healthcare']
  }
];

export default function ResearchPage() {
  return (
    <div className="overflow-hidden min-h-screen">
      <P5Sketch sketch={homePageSketch} className="fixed inset-0 w-full h-full z-0" />
      <div className="fixed inset-0 z-10 bg-background/80 dark:bg-background/90 backdrop-blur-sm"></div>

      <div className="relative z-20 container mx-auto px-4 py-16">
        <SectionContainer title="Research Projects" subtitle="Proposals and academic studies driving innovation in Africa.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {researchItems.map((item, index) => (
              <Link 
                key={index} 
                href={item.link}
                className="group block p-8 bg-background/60 backdrop-blur-md rounded-2xl border border-primary/10 hover:border-primary/30 transition-all hover:shadow-2xl hover:-translate-y-1"
              >
                <div className="flex flex-col h-full">
                  <div className="mb-6 flex justify-between items-start">
                    <div className="p-3 bg-primary/5 rounded-xl group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <ChevronRight className="w-6 h-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                  <h3 className="text-2xl font-headline font-bold mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-sm font-medium text-accent mb-4 uppercase tracking-wider">{item.subtitle}</p>
                  <p className="font-body text-foreground/80 mb-6 flex-grow">{item.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </SectionContainer>
      </div>
    </div>
  );
}
