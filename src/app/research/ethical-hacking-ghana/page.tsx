'use client';

import SectionContainer from '@/components/ui/SectionContainer';
import { ShieldCheck, Lock, Users, Globe } from 'lucide-react';
import dynamic from 'next/dynamic';
import { homePageSketch } from '@/components/p5/HomePageSketch';

const P5Sketch = dynamic(() => import('@/components/ui/P5Sketch'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 w-full h-full bg-background z-0" />,
});

export default function EthicalHackingPage() {
  return (
    <div className="overflow-hidden min-h-screen">
      <P5Sketch sketch={homePageSketch} className="fixed inset-0 w-full h-full z-0" />
      <div className="fixed inset-0 z-10 bg-background/80 dark:bg-background/90 backdrop-blur-sm"></div>

      <div className="relative z-20 container mx-auto px-4 py-16">
        <SectionContainer title="Ethical Hacking and Cyber Security In Ghana" subtitle="Masters Research Proposal">
          <div className="max-w-4xl mx-auto space-y-12">
            
            <section className="bg-background/60 backdrop-blur-md p-8 rounded-2xl border border-primary/10 shadow-lg">
              <h3 className="text-2xl font-headline font-semibold text-primary mb-4 flex items-center gap-3">
                <ShieldCheck className="w-8 h-8" /> Executive Summary
              </h3>
              <p className="font-body text-lg leading-relaxed text-foreground/90">
                This research proposal focuses on the critical need for robust cybersecurity measures in Ghana's rapidly evolving digital landscape. As the country digitizes its government services, financial systems, and private sector, the vulnerability to cyber-attacks increases exponentially. This project proposes a framework for integrating ethical hacking practices into national security policies to proactively identify and mitigate threats.
              </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-background/60 backdrop-blur-md p-6 rounded-2xl border border-primary/10">
                <h4 className="text-xl font-headline font-semibold mb-3 flex items-center gap-2 text-accent">
                  <Lock className="w-6 h-6" /> Problem Statement
                </h4>
                <p className="font-body text-muted-foreground">
                  Ghana has seen a surge in digital fraud, data breaches, and ransomware attacks. Current reactive measures are insufficient against sophisticated global threats targeting emerging digital economies.
                </p>
              </div>
              <div className="bg-background/60 backdrop-blur-md p-6 rounded-2xl border border-primary/10">
                <h4 className="text-xl font-headline font-semibold mb-3 flex items-center gap-2 text-accent">
                  <Users className="w-6 h-6" /> Research Objectives
                </h4>
                <ul className="list-disc list-inside space-y-2 font-body text-muted-foreground">
                  <li>Assess current cybersecurity state in Ghana.</li>
                  <li>Develop an ethical hacking integration model.</li>
                  <li>Evaluate legal and ethical implications.</li>
                  <li>Propose a framework for critical infrastructure.</li>
                </ul>
              </div>
            </div>

            <section className="bg-background/60 backdrop-blur-md p-8 rounded-2xl border border-primary/10 shadow-lg">
              <h3 className="text-2xl font-headline font-semibold text-primary mb-6 flex items-center gap-3">
                <Globe className="w-8 h-8" /> Key Pillars of Research
              </h3>
              <div className="space-y-6">
                <div className="border-l-4 border-primary pl-6 py-2">
                  <h5 className="font-headline font-bold text-lg mb-1">National Proactive Defense</h5>
                  <p className="font-body text-muted-foreground">Developing a "Red Team" approach for governmental agencies to simulate attacks before they happen.</p>
                </div>
                <div className="border-l-4 border-accent pl-6 py-2">
                  <h5 className="font-headline font-bold text-lg mb-1">Human-Centric Security</h5>
                  <p className="font-body text-muted-foreground">Analyzing social engineering vulnerabilities specific to the Ghanaian cultural and digital context.</p>
                </div>
                <div className="border-l-4 border-destructive pl-6 py-2">
                  <h5 className="font-headline font-bold text-lg mb-1">Regulatory Frameworks</h5>
                  <p className="font-body text-muted-foreground">Bridging the gap between the Cyber Security Act 2020 and practical penetration testing protocols.</p>
                </div>
              </div>
            </section>

          </div>
        </SectionContainer>
      </div>
    </div>
  );
}
