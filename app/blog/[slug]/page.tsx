import { BlogServiceServer } from '@/lib/blog-service-server';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Metadata } from 'next';

export async function generateStaticParams() {
  const posts = BlogServiceServer.getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = BlogServiceServer.getPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found'
    };
  }

  return {
    title: `${post.title} | VoluChat Blog`,
    description: post.excerpt,
    keywords: [...post.tags, 'Instagram automation', 'AI chatbots', 'e-commerce'],
    openGraph: {
      title: `${post.title} | VoluChat Blog`,
      description: post.excerpt,
      type: 'article',
      url: `https://voluchat.com/blog/${post.slug}`,
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} | VoluChat Blog`,
      description: post.excerpt
    }
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = BlogServiceServer.getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  // JSON-LD structured data for better SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "datePublished": post.date,
    "dateModified": post.date,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "VoluChat",
      "logo": {
        "@type": "ImageObject",
        "url": "https://voluchat.com/android-chrome-512x512.png",
        "width": 512,
        "height": 512
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://voluchat.com/blog/${post.slug}`
    },
    "image": post.featuredImage ? `https://voluchat.com${post.featuredImage}` : "https://voluchat.com/og-image.png",
    "articleBody": post.content.replace(/<[^>]*>/g, '').substring(0, 200) + '...',
    "keywords": post.tags.join(', ')
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <article className="max-w-4xl mx-auto">
          {/* Back to Blog Link */}
          <div className="mb-8">
            <Button variant="outline" size="sm" className="border-slate-200 text-slate-600" asChild>
              <Link href="/blog">← Back to Blog</Link>
            </Button>
          </div>

          {/* Post Header */}
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-6">
              <div className="flex items-center gap-2">
                <Image
                  src={post.authorImage || '/authors/placeholder.jpg'}
                  alt={post.author}
                  width={24}
                  height={24}
                  className="w-6 h-6 rounded-full"
                />
                <span>{post.author}</span>
              </div>
              <span>•</span>
              <span>{formatDate(post.date)}</span>
              <span>•</span>
              <span>{post.readingTime} min read</span>
            </div>
            {post.featuredImage && (
              <div className="relative overflow-hidden rounded-lg mb-8">
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  width={800}
                  height={450}
                  className="w-full h-auto object-cover"
                />
              </div>
            )}
          </header>

          {/* Post Content */}
          <div
            className="prose prose-slate max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Post Footer */}
          <footer className="border-t border-slate-200 pt-8">
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <Button
                  key={tag}
                  variant="outline"
                  size="sm"
                  className="border-slate-200 text-slate-600 hover:bg-slate-50"
                  asChild
                >
                  <Link href={`/blog/tag/${tag}`}>
                    #{tag.replace(/-/g, ' ')}
                  </Link>
                </Button>
              ))}
            </div>

            {/* Author Bio */}
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
              <Image
                src={post.authorImage || '/authors/placeholder.jpg'}
                alt={post.author}
                width={64}
                height={64}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h3 className="font-semibold text-slate-900">{post.author}</h3>
                <p className="text-sm text-slate-600">AI & Automation Expert</p>
              </div>
            </div>
          </footer>
        </article>
      </div>
    </main>
    </>
  );
}