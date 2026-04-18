'use client';

import SectionContainer from '@/components/ui/SectionContainer';
import { ExternalLink, Github, Code, Layout, Smartphone } from 'lucide-react';
import dynamic from 'next/dynamic';
import { homePageSketch } from '@/components/p5/HomePageSketch';

const P5Sketch = dynamic(() => import('@/components/ui/P5Sketch'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 w-full h-full bg-background z-0" />,
});

const projects = [
  {
    title: 'Google Play Console Image Formatter',
    description: 'A professional utility tool for Android developers to correctly format and resize images for the Google Play Store requirements.',
    icon: <Smartphone className="w-8 h-8 text-primary" />,
    tags: ['Next.js', 'Tailwind', 'Image Processing'],
    link: '#',
    github: '#'
  },
  {
    title: 'TechHub Africa',
    description: 'A community-driven platform for connecting African developers with global opportunities and mentorship.',
    icon: <Globe className="w-8 h-8 text-accent" />,
    tags: ['React', 'Firebase', 'Real-time'],
    link: '#',
    github: '#'
  }
];

// Simple Globe fallback since I don't know if it's imported
import { Globe } from 'lucide-react';

export default function ProjectsPage() {
  return (
    <div className="overflow-hidden min-h-screen">
      <P5Sketch sketch={homePageSketch} className="fixed inset-0 w-full h-full z-0" />
      <div className="fixed inset-0 z-10 bg-background/80 dark:bg-background/90 backdrop-blur-sm"></div>

      <div className="relative z-20 container mx-auto px-4 py-16">
        <SectionContainer title="My Projects" subtitle="Building tools and platforms that solve real-world problems.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {projects.map((project, index) => (
              <div 
                key={index}
                className="group p-8 bg-background/60 backdrop-blur-md rounded-2xl border border-primary/10 hover:border-primary/30 transition-all"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-primary/5 rounded-xl">
                    {project.icon}
                  </div>
                  <div className="flex gap-4">
                    <Link href={project.github} className="text-muted-foreground hover:text-primary transition-colors">
                      <Github className="w-6 h-6" />
                    </Link>
                    <Link href={project.link} className="text-muted-foreground hover:text-primary transition-colors">
                      <ExternalLink className="w-6 h-6" />
                    </Link>
                  </div>
                </div>
                <h3 className="text-2xl font-headline font-bold mb-3">{project.title}</h3>
                <p className="font-body text-foreground/80 mb-6">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </SectionContainer>
      </div>
    </div>
  );
}

import Link from 'next/link';
