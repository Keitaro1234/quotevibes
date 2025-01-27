import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogPosts } from '../data/blogData';
import { ArrowLeft, TrendingUp, Clock, BookOpen } from 'lucide-react';

function BlogDetail() {
  const { id } = useParams();
  const currentPost = blogPosts.find((item) => item.id === parseInt(id, 10));
  const otherPosts = blogPosts.filter((item) => item.id !== parseInt(id, 10));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!currentPost) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Post not found</h2>
          <Link to="/" className="text-blue-600 hover:text-blue-800 flex items-center justify-center gap-2">
            <ArrowLeft size={20} />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 gap-2">
          <ArrowLeft size={20} />
          Back to Home
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar */}
          <aside className="lg:col-span-3 space-y-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4 text-gray-800 font-semibold">
                <Clock size={20} />
                <h3>Recent Articles</h3>
              </div>
              <div className="space-y-4">
                {otherPosts.map(post => (
                  <Link 
                    key={post.id}
                    to={`/blog/${post.id}`}
                    className="block group"
                  >
                    <div className="relative h-32 mb-2 overflow-hidden rounded">
                      <img 
                        src={post.imageUrl} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h4 className="text-sm font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h4>
                    <p className="text-xs text-gray-500">{post.date}</p>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4 text-gray-800 font-semibold">
                <BookOpen size={20} />
                <h3>Recommended Reading</h3>
              </div>
              <div className="space-y-4">
                {otherPosts.map(post => (
                  <Link 
                    key={`rec-${post.id}`}
                    to={`/blog/${post.id}`}
                    className="flex items-start gap-3 group"
                  >
                    <img 
                      src={post.imageUrl} 
                      alt={post.title}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div>
                      <h4 className="text-sm font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
                        {post.title}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">{post.date}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-6">
            <article className="bg-white rounded-lg shadow-sm overflow-hidden">
              <img 
                src={currentPost.imageUrl} 
                alt={currentPost.title}
                className="w-full h-[400px] object-cover"
              />
              <div className="p-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{currentPost.title}</h1>
                <p className="text-gray-600 mb-8">{currentPost.date}</p>
                <div className="prose prose-lg max-w-none">
                  <div className="text-gray-800 leading-relaxed whitespace-pre-line">
                    {currentPost.content}
                  </div>
                </div>
              </div>
            </article>
          </main>

          {/* Right Sidebar */}
          <aside className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-2 mb-6 text-gray-800 font-semibold">
                <TrendingUp size={20} />
                <h3>Top Quotes</h3>
              </div>
              <div className="space-y-6">
                <div className="text-center p-8 border-2 border-dashed border-gray-200 rounded-lg">
                  <p className="text-gray-500 text-sm">
                    Quote ranking feature coming soon!
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    Stay tuned for inspiring quotes from our community
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default BlogDetail;