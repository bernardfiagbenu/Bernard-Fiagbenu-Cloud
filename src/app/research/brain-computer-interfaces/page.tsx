'use client';

import SectionContainer from '@/components/ui/SectionContainer';
import { Cpu, Zap, Activity, Brain } from 'lucide-react';
import dynamic from 'next/dynamic';
import { homePageSketch } from '@/components/p5/HomePageSketch';

const P5Sketch = dynamic(() => import('@/components/ui/P5Sketch'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 w-full h-full bg-background z-0" />,
});

export default function BCIPage() {
  return (
    <div className="overflow-hidden min-h-screen">
      <P5Sketch sketch={homePageSketch} className="fixed inset-0 w-full h-full z-0" />
      <div className="fixed inset-0 z-10 bg-background/80 dark:bg-background/90 backdrop-blur-sm"></div>

      <div className="relative z-20 container mx-auto px-4 py-16">
        <SectionContainer title="Brain-Computer Interfaces (BCI)" subtitle="Masters Research Proposal">
          <div className="max-w-4xl mx-auto space-y-12">
            
            <section className="bg-background/60 backdrop-blur-md p-8 rounded-2xl border border-primary/10 shadow-lg">
              <h3 className="text-2xl font-headline font-semibold text-primary mb-4 flex items-center gap-3">
                <Brain className="w-8 h-8" /> Research Title
              </h3>
              <p className="font-headline text-xl leading-relaxed text-foreground/90 font-medium">
                Self-Supervised Learning for a Zero-Calibration Motor Imagery BCI
              </p>
              <p className="mt-4 font-body text-foreground/80 leading-relaxed">
                Traditional BCIs require lengthy, exhausting calibration sessions for users to train the system to their specific brain signals. This research proposes using Self-Supervised Learning (SSL) to leverage large datasets of unlabeled EEG data, allowing for "Zero-Calibration" systems that work out of the box.
              </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-background/60 backdrop-blur-md p-6 rounded-2xl border border-primary/10">
                <h4 className="text-xl font-headline font-semibold mb-3 flex items-center gap-2 text-accent">
                  <Activity className="w-6 h-6" /> Motivation
                </h4>
                <p className="font-body text-muted-foreground">
                  Making BCIs accessible for clinical use and everyday assistive technology by removing the complex setup phase and improving signal decoding accuracy.
                </p>
              </div>
              <div className="bg-background/60 backdrop-blur-md p-6 rounded-2xl border border-primary/10">
                <h4 className="text-xl font-headline font-semibold mb-3 flex items-center gap-2 text-accent">
                  <Zap className="w-6 h-6" /> Core Technology
                </h4>
                <p className="font-body text-muted-foreground">
                  Deep Learning models (Transformers/CNNs) trained on massive EEG repositories using contrastive loss to learn universal brain signal representations.
                </p>
              </div>
            </div>

            <section className="bg-background/60 backdrop-blur-md p-8 rounded-2xl border border-primary/10 shadow-lg">
              <h3 className="text-2xl font-headline font-semibold text-primary mb-6 flex items-center gap-3">
                <Cpu className="w-8 h-8" /> Implementation Strategy
              </h3>
              <ul className="space-y-4 font-body text-foreground/90">
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center font-bold text-primary">1</span>
                  <p>Pre-training on Multi-User EEG open-source datasets.</p>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center font-bold text-primary">2</span>
                  <p>Fine-tuning with contrastive predictive coding for motor imagery tasks.</p>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center font-bold text-primary">3</span>
                  <p>Real-time testing for robotic limb control and text entry.</p>
                </li>
              </ul>
            </section>

          </div>
        </SectionContainer>
      </div>
    </div>
  );
}
