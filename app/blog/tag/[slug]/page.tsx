import { BlogServiceServer } from '@/lib/blog-service-server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';
import { Metadata } from 'next';

export async function generateStaticParams() {
  const tags = BlogServiceServer.getAllTags();
  return tags.map((tag) => ({
    slug: tag.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const tag = BlogServiceServer.getTagBySlug(params.slug);

  if (!tag) {
    return {
      title: 'Tag Not Found',
      description: 'The requested blog tag could not be found'
    };
  }

  return {
    title: `#${tag.name} | VoluChat Blog`,
    description: `Articles tagged with ${tag.name} on the VoluChat blog`,
    keywords: [tag.name, 'blog', 'articles', 'Instagram automation'],
    openGraph: {
      title: `#${tag.name} | VoluChat Blog`,
      description: `Articles tagged with ${tag.name} on the VoluChat blog`,
      type: 'website',
      url: `https://voluchat.com/blog/tag/${tag.slug}`
    }
  };
}

export default function BlogTagPage({ params }: { params: { slug: string } }) {
  const tag = BlogServiceServer.getTagBySlug(params.slug);

  if (!tag) {
    notFound();
  }

  const posts = BlogServiceServer.getPostsByTag(params.slug);

  // JSON-LD structured data for better SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `#${tag.name} - VoluChat Blog`,
    "description": `Articles tagged with ${tag.name} on the VoluChat blog`,
    "url": `https://voluchat.com/blog/tag/${tag.slug}`,
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

          {/* Tag Header */}
          <header className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              #{tag.name}
            </h1>
            <p className="text-xl text-slate-600">
              Articles tagged with <span className="font-medium">{tag.name}</span>
            </p>
          </header>

          {/* Posts List */}
          {posts.length > 0 ? (
            <div className="space-y-12">
              {posts.map((post) => (
                <article key={post.id} className="flex flex-col md:flex-row gap-6">
                  <div className="shrink-0 w-full md:w-48">
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
                      {post.tags.map((postTag) => (
                        <span
                          key={postTag}
                          className={`px-2 py-1 text-xs rounded-full ${
                            postTag === tag.slug
                              ? 'bg-primary-100 text-primary-600'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {postTag.replace(/-/g, ' ')}
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
              <p className="text-slate-600">No posts found with this tag.</p>
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