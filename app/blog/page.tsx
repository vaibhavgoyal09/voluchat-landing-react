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
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12 md:py-20">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
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
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Featured Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post) => (
                <article key={post.id} className="group">
                  <div className="relative overflow-hidden rounded-lg mb-4">
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
                  <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-primary-600">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="text-slate-600 mb-3">{post.excerpt}</p>
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
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Latest Articles</h2>
          <div className="space-y-12">
            {allPosts.map((post) => (
              <article key={post.id} className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0 w-full md:w-48">
                  <Image
                    src={post.featuredImage || '/blog/placeholder.jpg'}
                    alt={post.title}
                    width={200}
                    height={150}
                    className="w-full h-32 object-cover rounded-lg"
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
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    <Link href={`/blog/${post.slug}`} className="hover:text-primary-600">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-slate-600 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Image
                        src={post.authorImage || '/authors/placeholder.jpg'}
                        alt={post.author}
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full"
                      />
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