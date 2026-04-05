import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';

export default function TermsAndConditions() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-500">
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
        <Link to="/" className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:underline mb-8 font-medium">
          <ArrowLeft size={20} />
          Back to Home
        </Link>

        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-indigo-100 dark:bg-indigo-900/40 rounded-2xl">
            <FileText className="text-indigo-600 dark:text-indigo-400" size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">Terms & Conditions</h1>
        </div>

        <div className="prose prose-indigo dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              By accessing and using Bernard Fiagbenu's Cloud, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">2. Intellectual Property</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              All content on this website, including text, graphics, logos, and software, is the property of Bernard Fiagbenu and is protected by international copyright laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">3. User Conduct</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              You agree to use the website only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">4. Disclaimer of Warranties</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              This website is provided "as is" without any representations or warranties, express or implied. We do not warrant that the website will be constantly available or that the information on this website is complete, true, accurate, or non-misleading.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">5. Limitation of Liability</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Bernard Fiagbenu will not be liable to you in relation to the contents of, or use of, or otherwise in connection with, this website for any indirect, special, or consequential loss.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">6. Changes to Terms</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              We reserve the right to modify these terms at any time. Your continued use of the website following any changes signifies your acceptance of the new terms.
            </p>
          </section>
        </div>

        <footer className="mt-20 pt-8 border-t border-gray-200 dark:border-gray-800 text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString()}
        </footer>
      </div>
    </div>
  );
}
