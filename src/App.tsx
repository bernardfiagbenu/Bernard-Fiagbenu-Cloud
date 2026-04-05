/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  Sun,
  Moon
} from 'lucide-react';
import Chatbot from './components/Chatbot';
import LegalModal from './components/LegalModal';

export default function App() {
  const [legalType, setLegalType] = useState<'terms' | 'privacy' | null>(null);
  const [isDark, setIsDark] = useState(false);
  const dashboardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dashboardRef.current) return;
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;

      // Extreme but reasonable 3D tilt
      const rotateX = y * -20 + 10; // Base tilt 10deg, varies by +/- 20deg
      const rotateY = x * 25 - 5;   // Base tilt -5deg, varies by +/- 25deg

      dashboardRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(1deg)`;
    };

    const handleMouseLeave = () => {
      if (!dashboardRef.current) return;
      dashboardRef.current.style.transform = `rotateX(12deg) rotateY(-8deg) rotateZ(1deg)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    
    // Set initial tilt
    if (dashboardRef.current) {
      dashboardRef.current.style.transform = `rotateX(12deg) rotateY(-8deg) rotateZ(1deg)`;
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 font-sans selection:bg-indigo-100 dark:selection:bg-indigo-900 selection:text-indigo-900 dark:selection:text-indigo-100 relative overflow-hidden transition-colors duration-500">
      {/* Background Grid */}
      <div className="fixed inset-0 bg-grid opacity-30 dark:opacity-20 pointer-events-none z-0 transition-opacity duration-500"></div>

      {/* Theme Toggle */}
      <button 
        onClick={() => setIsDark(!isDark)} 
        className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl hover:scale-110 transition-all border border-gray-200 dark:border-gray-700"
      >
        {isDark ? <Sun className="text-yellow-400" size={24} /> : <Moon className="text-indigo-600" size={24} />}
      </button>

      <div className="max-w-7xl mx-auto relative z-10 p-6 md:p-12 lg:p-16">
        <header className="mb-6 md:mb-10 pt-8 md:pt-12">
          <h1 className="flex flex-col gap-2 md:gap-4">
            <span className="text-7xl md:text-8xl lg:text-[10rem] font-black text-gray-900 dark:text-white tracking-tighter leading-none transition-colors duration-500">
              Welcome.
            </span>
            <span className="text-2xl md:text-4xl lg:text-5xl font-medium text-gray-500 dark:text-gray-400 tracking-tight max-w-3xl mt-2 md:mt-4 transition-colors duration-500">
              <span className="text-gray-900 dark:text-white font-bold">Bernard Fiagbenu's</span> Cloud
            </span>
          </h1>
          
          {/* Quick Navigation for Smooth Scrolling */}
          <div className="mt-6 md:mt-10 flex items-center gap-4 overflow-x-auto pb-4 scrollbar-hide">
            <a href="#portfolio" className="whitespace-nowrap px-6 py-3 rounded-full bg-[#E6E2FF] dark:bg-indigo-900/40 border border-indigo-100 dark:border-indigo-800/50 hover:border-indigo-200 dark:hover:border-indigo-700 text-indigo-900 dark:text-indigo-100 text-sm font-bold transition-all hover:shadow-md hover:-translate-y-0.5">Portfolio</a>
            <a href="#lab" className="whitespace-nowrap px-6 py-3 rounded-full bg-[#D6FFEB] dark:bg-emerald-900/40 border border-emerald-100 dark:border-emerald-800/50 hover:border-emerald-200 dark:hover:border-emerald-700 text-emerald-900 dark:text-emerald-100 text-sm font-bold transition-all hover:shadow-md hover:-translate-y-0.5">Innovation Lab</a>
            <a href="#apps" className="whitespace-nowrap px-6 py-3 rounded-full bg-[#FFF8D6] dark:bg-yellow-900/40 border border-yellow-100 dark:border-yellow-800/50 hover:border-yellow-200 dark:hover:border-yellow-700 text-yellow-900 dark:text-yellow-100 text-sm font-bold transition-all hover:shadow-md hover:-translate-y-0.5">Software Tools</a>
            <a href="#community" className="whitespace-nowrap px-6 py-3 rounded-full bg-[#D6EFFF] dark:bg-blue-900/40 border border-blue-100 dark:border-blue-800/50 hover:border-blue-200 dark:hover:border-blue-700 text-blue-900 dark:text-blue-100 text-sm font-bold transition-all hover:shadow-md hover:-translate-y-0.5">Community</a>
          </div>
        </header>

        <div className="perspective-container relative w-full mt-2 md:mt-4">
          <div ref={dashboardRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr dashboard-3d bg-white/40 dark:bg-gray-900/40 p-6 md:p-10 rounded-[3rem] border border-white/60 dark:border-gray-700/50 backdrop-blur-xl transition-colors duration-500">
            {/* 1. Portfolio */}
            <div id="portfolio" className="col-span-1 md:col-span-2 lg:col-span-2 lg:row-span-2 bg-[#E6E2FF] dark:bg-indigo-900/20 dark:border dark:border-indigo-800/30 p-8 rounded-3xl flex flex-col justify-between transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.03] hover:shadow-2xl hover:shadow-indigo-500/20 cursor-pointer min-h-[240px]">
              <div className="w-28 h-28 md:w-32 md:h-32 rounded-3xl overflow-hidden bg-white/60 dark:bg-white/90 shadow-sm flex items-center justify-center p-2 floating" style={{ animationDelay: '-0.5s' }}>
                <img src="/images/portfolio.jpg" alt="Portfolio" className="w-full h-full object-contain mix-blend-multiply" onError={(e) => e.currentTarget.style.display = 'none'} />
              </div>
            <div className="mt-12">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 transition-colors">My Works</h3>
              <p className="text-lg text-gray-700 dark:text-gray-300 font-medium transition-colors">Portfolio</p>
            </div>
          </div>

            {/* 2. Business */}
            <div id="business" className="col-span-1 bg-[#FFE2EC] dark:bg-pink-900/20 dark:border dark:border-pink-800/30 p-6 rounded-3xl flex flex-col justify-between transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.03] hover:shadow-2xl hover:shadow-pink-500/20 cursor-pointer min-h-[200px]">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden bg-white/60 dark:bg-white/90 shadow-sm flex items-center justify-center p-2 floating" style={{ animationDelay: '-1.2s' }}>
                <img src="/images/business.jpg" alt="Business" className="w-full h-full object-contain mix-blend-multiply" onError={(e) => e.currentTarget.style.display = 'none'} />
              </div>
            <div className="mt-8">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-1 transition-colors">Corporate Activities</h3>
              <p className="text-gray-700 dark:text-gray-300 font-medium transition-colors">Business</p>
            </div>
          </div>

            {/* 3. Training */}
            <div id="training" className="col-span-1 bg-[#FFF8D6] dark:bg-yellow-900/20 dark:border dark:border-yellow-800/30 p-6 rounded-3xl flex flex-col justify-between transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.03] hover:shadow-2xl hover:shadow-yellow-500/20 cursor-pointer min-h-[200px]">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden bg-white/60 dark:bg-white/90 shadow-sm flex items-center justify-center p-2 floating" style={{ animationDelay: '-3.5s' }}>
                <img src="/images/develop skills training.jpg" alt="Training" className="w-full h-full object-contain mix-blend-multiply" onError={(e) => e.currentTarget.style.display = 'none'} />
              </div>
            <div className="mt-8">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-1 transition-colors">Develop Your Skills</h3>
              <p className="text-gray-700 dark:text-gray-300 font-medium transition-colors">Training</p>
            </div>
          </div>

            {/* 4. Lab */}
            <div id="lab" className="col-span-1 lg:row-span-2 bg-[#D6FFEB] dark:bg-emerald-900/20 dark:border dark:border-emerald-800/30 p-6 rounded-3xl flex flex-col justify-between transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.03] hover:shadow-2xl hover:shadow-emerald-500/20 cursor-pointer min-h-[240px]">
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-3xl overflow-hidden bg-white/60 dark:bg-white/90 shadow-sm flex items-center justify-center p-2 floating" style={{ animationDelay: '-2.1s' }}>
                <img src="/images/lab.jpg" alt="Lab" className="w-full h-full object-contain mix-blend-multiply" onError={(e) => e.currentTarget.style.display = 'none'} />
              </div>
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 transition-colors">Track Innovation</h3>
              <p className="text-gray-700 dark:text-gray-300 font-medium transition-colors">Lab</p>
            </div>
          </div>

            {/* 5. Academy */}
            <div id="academy" className="col-span-1 bg-[#FFE8D6] dark:bg-orange-900/20 dark:border dark:border-orange-800/30 p-6 rounded-3xl flex flex-col justify-between transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.03] hover:shadow-2xl hover:shadow-orange-500/20 cursor-pointer min-h-[200px]">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden bg-white/60 dark:bg-white/90 shadow-sm flex items-center justify-center p-2 floating" style={{ animationDelay: '-4.8s' }}>
                <img src="/images/academy.jpg" alt="Academy" className="w-full h-full object-contain mix-blend-multiply" onError={(e) => e.currentTarget.style.display = 'none'} />
              </div>
            <div className="mt-8">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-1 transition-colors">Structured Learning</h3>
              <p className="text-gray-700 dark:text-gray-300 font-medium transition-colors">Academy</p>
            </div>
          </div>

            {/* 6. Research */}
            <div id="research" className="col-span-1 bg-[#D6EFFF] dark:bg-blue-900/20 dark:border dark:border-blue-800/30 p-6 rounded-3xl flex flex-col justify-between transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.03] hover:shadow-2xl hover:shadow-blue-500/20 cursor-pointer min-h-[200px]">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden bg-white/60 dark:bg-white/90 shadow-sm flex items-center justify-center p-2 floating" style={{ animationDelay: '-0.8s' }}>
                <img src="/images/research.jpg" alt="Research" className="w-full h-full object-contain mix-blend-multiply" onError={(e) => e.currentTarget.style.display = 'none'} />
              </div>
            <div className="mt-8">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-1 transition-colors">Research & Findings</h3>
              <p className="text-gray-700 dark:text-gray-300 font-medium transition-colors">Research</p>
            </div>
          </div>

            {/* 7. Services */}
            <div id="services" className="col-span-1 bg-[#FFE2EC] dark:bg-pink-900/20 dark:border dark:border-pink-800/30 p-6 rounded-3xl flex flex-col justify-between transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.03] hover:shadow-2xl hover:shadow-pink-500/20 cursor-pointer min-h-[200px]">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden bg-white/60 dark:bg-white/90 shadow-sm flex items-center justify-center p-2 floating" style={{ animationDelay: '-5.5s' }}>
                <img src="/images/consulting.jpg" alt="Consulting" className="w-full h-full object-contain mix-blend-multiply" onError={(e) => e.currentTarget.style.display = 'none'} />
              </div>
            <div className="mt-8">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-1 transition-colors">Consulting & Offers</h3>
              <p className="text-gray-700 dark:text-gray-300 font-medium transition-colors">Services</p>
            </div>
          </div>

            {/* 8. Projects */}
            <div id="projects" className="col-span-1 lg:row-span-2 bg-[#E6E2FF] dark:bg-indigo-900/20 dark:border dark:border-indigo-800/30 p-6 rounded-3xl flex flex-col justify-between transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.03] hover:shadow-2xl hover:shadow-indigo-500/20 cursor-pointer min-h-[240px]">
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-3xl overflow-hidden bg-white/60 dark:bg-white/90 shadow-sm flex items-center justify-center p-2 floating" style={{ animationDelay: '-1.9s' }}>
                <img src="/images/project.jpg" alt="Projects" className="w-full h-full object-contain mix-blend-multiply" onError={(e) => e.currentTarget.style.display = 'none'} />
              </div>
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 transition-colors">Active Initiatives</h3>
              <p className="text-gray-700 dark:text-gray-300 font-medium transition-colors">Projects</p>
            </div>
          </div>

            {/* 9. Apps */}
            <div id="apps" className="col-span-1 md:col-span-2 lg:col-span-2 bg-[#FFF8D6] dark:bg-yellow-900/20 dark:border dark:border-yellow-800/30 p-6 md:p-8 rounded-3xl flex flex-col justify-between transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.03] hover:shadow-2xl hover:shadow-yellow-500/20 cursor-pointer min-h-[200px]">
              <div className="w-28 h-28 md:w-32 md:h-32 rounded-3xl overflow-hidden bg-white/60 dark:bg-white/90 shadow-sm flex items-center justify-center p-2 floating" style={{ animationDelay: '-3.1s' }}>
                <img src="/images/software tools.jpg" alt="Software Tools" className="w-full h-full object-contain mix-blend-multiply" onError={(e) => e.currentTarget.style.display = 'none'} />
              </div>
            <div className="mt-8">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2 transition-colors">Software Tools</h3>
              <p className="text-gray-700 dark:text-gray-300 font-medium transition-colors">Apps</p>
            </div>
          </div>

            {/* 10. Community */}
            <div id="community" className="col-span-1 bg-[#D6EFFF] dark:bg-blue-900/20 dark:border dark:border-blue-800/30 p-6 rounded-3xl flex flex-col justify-between transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.03] hover:shadow-2xl hover:shadow-blue-500/20 cursor-pointer min-h-[200px]">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden bg-white/60 dark:bg-white/90 shadow-sm flex items-center justify-center p-2 floating" style={{ animationDelay: '-6.2s' }}>
                <img src="/images/community.jpg" alt="Community" className="w-full h-full object-contain mix-blend-multiply" onError={(e) => e.currentTarget.style.display = 'none'} />
              </div>
              <div className="mt-8">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-1 transition-colors">Connect & Network</h3>
                <p className="text-gray-700 dark:text-gray-300 font-medium transition-colors">Community</p>
              </div>
            </div>

          </div>
        </div>
        
        {/* Footer with Legal Links */}
        <footer className="mt-20 border-t border-gray-200 dark:border-gray-800 pt-8 pb-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500 dark:text-gray-400 transition-colors duration-500">
          <p>&copy; {new Date().getFullYear()} Bernard Fiagbenu. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setLegalType('terms')}
              className="hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Terms & Conditions
            </button>
            <button 
              onClick={() => setLegalType('privacy')}
              className="hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Privacy Policy
            </button>
          </div>
        </footer>
        
        <Chatbot />
        <LegalModal 
          isOpen={legalType !== null} 
          type={legalType} 
          onClose={() => setLegalType(null)} 
        />
      </div>
    </div>
  );
}
