import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';

export default function PrivacyPolicy() {
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
            <Shield className="text-indigo-600 dark:text-indigo-400" size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">Privacy Policy</h1>
        </div>

        <div className="prose prose-indigo dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Welcome to Bernard Fiagbenu's Cloud. We value your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">2. Data Collection</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              We do not collect any personal information unless you voluntarily provide it to us through our contact forms or chatbot interactions. The data we may collect includes your name, email address, and any messages you send us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">3. Use of Information</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Any information we collect is used solely to respond to your inquiries, improve our services, and provide a better user experience. We do not sell or share your data with third parties for marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">4. Cookies</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Our website may use cookies to enhance your browsing experience. You can choose to disable cookies through your browser settings, although this may affect some functionality of the site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">5. Security</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              We implement industry-standard security measures to protect your data from unauthorized access, disclosure, or alteration. However, no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">6. Contact Us</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us through our Contact page.
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
