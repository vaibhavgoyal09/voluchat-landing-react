import { BlogServiceServer } from '@/lib/blog-service-server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';
import { Metadata } from 'next';

export async function generateStaticParams() {
  const categories = BlogServiceServer.getAllCategories();
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const category = BlogServiceServer.getCategoryBySlug(params.slug);

  if (!category) {
    return {
      title: 'Category Not Found',
      description: 'The requested blog category could not be found'
    };
  }

  return {
    title: `${category.name} | VoluChat Blog`,
    description: category.description,
    keywords: [...category.name.split(' '), 'blog', 'articles', 'Instagram automation'],
    openGraph: {
      title: `${category.name} | VoluChat Blog`,
      description: category.description,
      type: 'website',
      url: `https://voluchat.com/blog/category/${category.slug}`
    }
  };
}

export default function BlogCategoryPage({ params }: { params: { slug: string } }) {
  const category = BlogServiceServer.getCategoryBySlug(params.slug);

  if (!category) {
    notFound();
  }

  const posts = BlogServiceServer.getPostsByCategory(params.slug);

  // JSON-LD structured data for better SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${category.name} - VoluChat Blog`,
    "description": category.description,
    "url": `https://voluchat.com/blog/category/${category.slug}`,
    "hasPart": posts.map(post => ({
      "@type": "BlogPosting",
      "name": post.title,
      "url": `https://voluchat.com/blog/${post.slug}`,
      "datePublished": post.date,
      "author": {
        "@type": "Person",
        "name": post.author
      }
    }))
  };

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          {/* Back to Blog Link */}
          <div className="mb-8">
            <Button variant="outline" size="sm" className="border-slate-200 text-slate-600" asChild>
              <Link href="/blog">← Back to Blog</Link>
            </Button>
          </div>

          {/* Category Header */}
          <header className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              {category.name}
            </h1>
            <p className="text-xl text-slate-600">{category.description}</p>
          </header>

          {/* Posts List */}
          {posts.length > 0 ? (
            <div className="space-y-12">
              {posts.map((post) => (
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
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-600">No posts found in this category.</p>
              <Button variant="outline" className="mt-4" asChild>
                <Link href="/blog">Browse All Posts</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}