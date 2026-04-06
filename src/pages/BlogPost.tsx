import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User, ChevronLeft, ChevronRight, Share2 } from 'lucide-react';
import { BLOG_POSTS } from '../constants';

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const postIndex = BLOG_POSTS.findIndex(p => p.id === id);
  const post = BLOG_POSTS[postIndex];
  
  const prevPost = postIndex > 0 ? BLOG_POSTS[postIndex - 1] : null;
  const nextPost = postIndex < BLOG_POSTS.length - 1 ? BLOG_POSTS[postIndex + 1] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const updateProgress = () => {
      const progressBar = document.getElementById('scroll-progress');
      if (progressBar) {
        const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = (window.scrollY / scrollTotal) * 100;
        progressBar.style.width = `${scrollProgress}%`;
      }
    };

    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, [id]);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">The article you're looking for doesn't exist or has been moved.</p>
        <Link to="/blog" className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors">
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-500">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-50 bg-gray-100 dark:bg-gray-800">
        <div className="h-full bg-indigo-600 transition-all duration-300" style={{ width: '0%' }} id="scroll-progress" />
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
        <Link to="/blog" className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:underline mb-12 font-medium">
          <ArrowLeft size={20} />
          Back to Blog
        </Link>

        <header className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 text-xs font-bold rounded-full">
              {post.category}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-8 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-800 pb-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                BF
              </div>
              <span className="font-medium text-gray-900 dark:text-white">{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              {post.date}
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              {post.readTime}
            </div>
            <button className="ml-auto p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors" aria-label="Share">
              <Share2 size={18} />
            </button>
          </div>
        </header>

        <div className="relative aspect-video rounded-[2.5rem] overflow-hidden mb-12 shadow-2xl shadow-indigo-500/10">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.src = `https://picsum.photos/seed/${post.id}/1200/675`;
            }}
          />
        </div>

        <article 
          className="prose prose-lg dark:prose-invert max-w-none mb-20 prose-headings:font-black prose-headings:tracking-tight prose-a:text-indigo-600 dark:prose-a:text-indigo-400 prose-blockquote:border-indigo-600 dark:prose-blockquote:border-indigo-400 prose-blockquote:bg-indigo-50 dark:prose-blockquote:bg-indigo-900/20 prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:rounded-r-2xl"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Post Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-12 border-t border-gray-100 dark:border-gray-800">
          {prevPost ? (
            <Link 
              to={`/blog/${prevPost.id}`}
              className="group p-6 rounded-3xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-indigo-200 dark:hover:border-indigo-800 transition-all flex flex-col items-start gap-4"
            >
              <span className="flex items-center gap-2 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                <ChevronLeft size={16} />
                Previous Article
              </span>
              <span className="text-lg font-bold group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                {prevPost.title}
              </span>
            </Link>
          ) : <div />}

          {nextPost ? (
            <Link 
              to={`/blog/${nextPost.id}`}
              className="group p-6 rounded-3xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-indigo-200 dark:hover:border-indigo-800 transition-all flex flex-col items-end text-right gap-4"
            >
              <span className="flex items-center gap-2 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                Next Article
                <ChevronRight size={16} />
              </span>
              <span className="text-lg font-bold group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                {nextPost.title}
              </span>
            </Link>
          ) : <div />}
        </div>
      </div>
    </div>
  );
}
