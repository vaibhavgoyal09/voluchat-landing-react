import { BlogServiceServer } from '@/lib/blog-service-server';
import { formatDate } from '@/lib/utils';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';

export async function generateStaticParams() {
  const posts = BlogServiceServer.getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = BlogServiceServer.getPostBySlug(slug);

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

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = BlogServiceServer.getPostBySlug(slug);

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
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          
        <article>
          {/* Back to Blog Link */}
          <div className="mb-12">
            <Link 
              href="/blog" 
              className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors duration-200 font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Blog
            </Link>
          </div>

          {/* Post Header */}
          <header className="mb-16">
            <h1 className="text-4xl md:text-6xl font-normal text-slate-900 mb-8 leading-tight">{post.title}</h1>
            
            <div className="flex items-center gap-4 text-slate-600 mb-8">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                <span className="text-lg font-semibold text-slate-700">
                  {post.author.charAt(0)}
                </span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-slate-900">{post.author}</p>
                <div className="flex items-center gap-2 text-sm">
                  <span>{formatDate(post.date)}</span>
                  <span>•</span>
                  <span>{post.readingTime} min read</span>
                </div>
              </div>
            </div>

            {post.featuredImage && (
              <div className="relative overflow-hidden rounded-lg mb-16">
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  width={1200}
                  height={600}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
            )}
          </header>

          {/* Post Content */}
          <div className="max-w-none mb-16">
            <div className="prose prose-xl prose-slate max-w-none 
              prose-headings:font-normal prose-headings:text-slate-900 
              prose-h1:text-4xl prose-h1:font-light prose-h1:mb-8 prose-h1:leading-tight
              prose-h2:text-3xl prose-h2:font-normal prose-h2:mb-6 prose-h2:mt-12 prose-h2:leading-tight
              prose-h3:text-2xl prose-h3:font-normal prose-h3:mb-4 prose-h3:mt-10 prose-h3:leading-tight
              prose-h4:text-xl prose-h4:font-medium prose-h4:mb-3 prose-h4:mt-8
              prose-p:text-slate-800 prose-p:leading-8 prose-p:mb-6 prose-p:text-lg
              prose-a:text-slate-900 prose-a:underline prose-a:decoration-2 prose-a:underline-offset-2 hover:prose-a:text-primary-600
              prose-strong:text-slate-900 prose-strong:font-semibold
              prose-em:text-slate-700 prose-em:italic
              prose-ul:text-slate-800 prose-ul:leading-7 prose-ul:mb-6 prose-ul:space-y-2
              prose-ol:text-slate-800 prose-ol:leading-7 prose-ol:mb-6 prose-ol:space-y-2
              prose-li:text-slate-800 prose-li:leading-7 prose-li:mb-2
              prose-blockquote:border-l-4 prose-blockquote:border-slate-300 prose-blockquote:pl-6 prose-blockquote:py-2 
              prose-blockquote:not-italic prose-blockquote:text-slate-700 prose-blockquote:bg-slate-50 prose-blockquote:rounded-r-lg
              prose-code:text-slate-900 prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
              prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-pre:p-6 prose-pre:rounded-lg prose-pre:overflow-x-auto
              prose-img:rounded-lg prose-img:shadow-lg
              prose-hr:border-slate-300 prose-hr:my-12">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw, rehypeSanitize]}
                components={{
                  // Enhanced table components
                  table: ({children}) => (
                    <div className="overflow-x-auto my-8">
                      <table className="min-w-full border border-slate-300 rounded-lg overflow-hidden shadow-sm">
                        {children}
                      </table>
                    </div>
                  ),
                  thead: ({children}) => (
                    <thead className="bg-slate-50">
                      {children}
                    </thead>
                  ),
                  th: ({children}) => (
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 border-b border-slate-300">
                      {children}
                    </th>
                  ),
                  td: ({children}) => (
                    <td className="px-6 py-4 text-sm text-slate-800 border-b border-slate-200">
                      {children}
                    </td>
                  ),
                  // Custom components for better styling
                  h1: ({children}) => <h1 className="text-4xl font-light text-slate-900 mb-8 leading-tight">{children}</h1>,
                  h2: ({children}) => <h2 className="text-3xl font-normal text-slate-900 mb-6 mt-12 leading-tight">{children}</h2>,
                  h3: ({children}) => <h3 className="text-2xl font-normal text-slate-900 mb-4 mt-10 leading-tight">{children}</h3>,
                  h4: ({children}) => <h4 className="text-xl font-medium text-slate-900 mb-3 mt-8">{children}</h4>,
                  p: ({children}) => <p className="text-slate-800 leading-8 mb-6 text-lg">{children}</p>,
                  a: ({children, href}) => <a href={href} className="text-slate-900 underline decoration-2 underline-offset-2 hover:text-primary-600 transition-colors">{children}</a>,
                  strong: ({children}) => <strong className="text-slate-900 font-semibold">{children}</strong>,
                  em: ({children}) => <em className="text-slate-700 italic">{children}</em>,
                  ul: ({children}) => <ul className="text-slate-800 leading-7 mb-6 space-y-2">{children}</ul>,
                  ol: ({children}) => <ol className="text-slate-800 leading-7 mb-6 space-y-2">{children}</ol>,
                  li: ({children}) => <li className="text-slate-800 leading-7 mb-2">{children}</li>,
                  blockquote: ({children}) => (
                    <blockquote className="border-l-4 border-slate-300 pl-6 py-2 not-italic text-slate-700 bg-slate-50 rounded-r-lg my-6">
                      {children}
                    </blockquote>
                  ),
                  code: ({children, className}) => {
                    const isInline = !className;
                    return isInline ? (
                      <code className="text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded text-sm">{children}</code>
                    ) : (
                      <code className={className}>{children}</code>
                    );
                  },
                  pre: ({children}) => <pre className="bg-slate-900 text-slate-100 p-6 rounded-lg overflow-x-auto my-6">{children}</pre>,
                  hr: () => <hr className="border-slate-300 my-12" />
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>
          </div>

          {/* Post Footer */}
          <footer className="border-t border-slate-200 pt-16 mt-20">
            {/* Author Bio */}
            <div className="flex items-start gap-6 pb-12 border-b border-slate-200">
              <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                <span className="text-2xl font-semibold text-slate-700">
                  {post.author.charAt(0)}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-medium text-slate-900 mb-2">{post.author}</h3>
                <p className="text-slate-600 text-lg mb-3">AI & Automation Expert</p>
                <p className="text-slate-700 leading-relaxed">
                  Passionate about helping businesses leverage AI technology to scale their operations and improve customer engagement. Specializing in Instagram automation and e-commerce optimization.
                </p>
              </div>
            </div>

            {/* Tags Section */}
            <div className="pt-12">
              <h3 className="text-lg font-medium text-slate-900 mb-6">Topics</h3>
              <div className="flex flex-wrap gap-3">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog/tag/${tag}`}
                    className="inline-flex items-center px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 rounded-full text-sm font-medium transition-colors duration-200"
                  >
                    {tag.replace(/-/g, ' ')}
                  </Link>
                ))}
              </div>
            </div>


          </footer>
          </article>
        </div>
      </div>
    </main>
    </>
  );
}