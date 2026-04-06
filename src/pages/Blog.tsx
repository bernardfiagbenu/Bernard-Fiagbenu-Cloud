import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Calendar, Clock, ChevronRight, Search } from 'lucide-react';
import { BLOG_POSTS } from '../constants';

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      // In a real app, you'd send this to a backend
    }
  };

  const filteredPosts = BLOG_POSTS.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-500">
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-20">
        <Link to="/" className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:underline mb-8 font-medium">
          <ArrowLeft size={20} />
          Back to Home
        </Link>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-100 dark:bg-indigo-900/40 rounded-2xl">
              <BookOpen className="text-indigo-600 dark:text-indigo-400" size={32} />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight">Insights & Updates</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Thoughts on technology, engineering, and innovation.</p>
            </div>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <Link 
              key={post.id}
              to={`/blog/${post.id}`}
              className="group bg-white dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 flex flex-col"
            >
              <article className="flex flex-col h-full">
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = `https://picsum.photos/seed/${post.id}/800/450`;
                    }}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-indigo-600 dark:text-indigo-400 text-xs font-bold rounded-full shadow-sm">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                    {post.excerpt}
                  </p>

                  <div className="inline-flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white group-hover:gap-3 transition-all">
                    Read Article
                    <ChevronRight size={16} className="text-indigo-600 dark:text-indigo-400" />
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 dark:text-gray-400 text-lg">No articles found matching your search.</p>
          </div>
        )}

        <div className="mt-20 p-8 md:p-12 bg-indigo-600 rounded-[2.5rem] text-white relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            {isSubscribed ? (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">You're on the list! 🎉</h2>
                <p className="text-indigo-100 mb-0">Thanks for subscribing. We'll be in touch with the latest updates soon.</p>
              </div>
            ) : (
              <>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Subscribe to the Newsletter</h2>
                <p className="text-indigo-100 mb-8">Get the latest insights on cloud computing and AI delivered straight to your inbox.</p>
                
                <form className="flex flex-col sm:flex-row gap-3" onSubmit={handleSubscribe}>
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-6 py-3.5 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-indigo-200 outline-none focus:bg-white/20 transition-all"
                  />
                  <button type="submit" className="px-8 py-3.5 bg-white text-indigo-600 font-bold rounded-2xl hover:bg-indigo-50 transition-colors">
                    Subscribe
                  </button>
                </form>
              </>
            )}
          </div>
          
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-400/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />
        </div>
      </div>
    </div>
  );
}
