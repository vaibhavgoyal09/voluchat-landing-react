import { BlogServiceServer } from '@/lib/blog-service-server';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';
import { Metadata } from 'next';

export default function BlogPage() {
  const allPosts = BlogServiceServer.getAllPosts();
  const featuredPosts = BlogServiceServer.getFeaturedPosts();
  const blogCategories = BlogServiceServer.getAllCategories();

  return (
    <main className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 gradient-mesh pointer-events-none -z-20 opacity-30" />
      <div className="container-wide py-12 md:py-20 relative z-10 animate-fade-in">
        {/* Hero Section */}
        <section className="text-center mb-16 max-w-4xl mx-auto">
          <h1 className="section-heading text-5xl md:text-6xl lg:text-7xl mb-6">
            VoluChat Blog
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Insights, strategies, and best practices for Instagram sales automation,
            AI-powered customer engagement, and e-commerce growth.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {blogCategories.map((category) => (
              <Button
                key={category.id}
                variant="outline"
                size="sm"
                className="border-slate-200 text-slate-600 hover:bg-slate-50"
                asChild
              >
                <Link href={`/blog/category/${category.slug}`}>
                  {category.name}
                </Link>
              </Button>
            ))}
          </div>
        </section>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="mb-16">
            <h2 className="section-heading text-4xl mb-8">Featured Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post) => (
                <article key={post.id} className="group glass-card p-5 hover:shadow-premium hover:-translate-y-1 transition-all duration-300">
                  <div className="relative overflow-hidden rounded-[1.5rem] mb-5">
                    <Image
                      src={post.featuredImage || '/blog/placeholder.jpg'}
                      alt={post.title}
                      width={400}
                      height={250}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs bg-slate-100 text-slate-600 rounded-full"
                      >
                        {tag.replace(/-/g, ' ')}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-heading font-bold text-slate-900 mb-3 group-hover:text-primary-600 transition-colors">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="text-slate-600 mb-4 font-light leading-relaxed">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-slate-500">
                    <span>{formatDate(post.date)}</span>
                    <span>•</span>
                    <span>{post.readingTime} min read</span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* All Posts */}
        <section className="max-w-5xl mx-auto">
          <h2 className="section-heading text-4xl mb-8">Latest Articles</h2>
          <div className="space-y-8">
            {allPosts.map((post) => (
              <article key={post.id} className="flex flex-col md:flex-row gap-8 glass-card p-6 md:p-8 hover:shadow-premium hover:-translate-y-1 transition-all duration-300">
                <div className="flex-shrink-0 w-full md:w-64">
                  <Image
                    src={post.featuredImage || '/blog/placeholder.jpg'}
                    alt={post.title}
                    width={200}
                    height={150}
                    className="w-full h-40 md:h-full object-cover rounded-[1.5rem] shadow-sm hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs bg-slate-100 text-slate-600 rounded-full"
                      >
                        {tag.replace(/-/g, ' ')}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-slate-900 mb-3">
                    <Link href={`/blog/${post.slug}`} className="hover:text-primary-600 transition-colors">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-slate-600 mb-6 font-light leading-relaxed">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
                        <span className="text-xs font-semibold text-slate-700">
                          {post.author.charAt(0)}
                        </span>
                      </div>
                      <span className="text-sm text-slate-600">{post.author}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-500">
                      <span>{formatDate(post.date)}</span>
                      <span>•</span>
                      <span>{post.readingTime} min read</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}