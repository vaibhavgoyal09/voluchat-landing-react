"use client";

import { useState, useEffect } from 'react';
import { BlogService } from '@/lib/blog-service';
import { BlogPost, BlogCategory, BlogTag } from '@/lib/blog-types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';

export default function BlogAdminPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [tags, setTags] = useState<BlogTag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form state for new post
  const [newPost, setNewPost] = useState<Partial<BlogPost>>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    author: '',
    readingTime: 5,
    isFeatured: false,
    tags: []
  });

  // Edit state
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    try {
      setPosts(BlogService.getAllPosts());
      setCategories(BlogService.getAllCategories());
      setTags(BlogService.getAllTags());
      setLoading(false);
    } catch (err) {
      setError('Failed to load blog data');
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setNewPost(prev => ({ ...prev, [name]: checked }));
    } else if (name === 'readingTime') {
      setNewPost(prev => ({ ...prev, [name]: Number(value) }));
    } else {
      setNewPost(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleTagChange = (tagSlug: string) => {
    setNewPost(prev => {
      const currentTags = prev.tags || [];
      if (currentTags.includes(tagSlug)) {
        return { ...prev, tags: currentTags.filter(t => t !== tagSlug) };
      } else {
        return { ...prev, tags: [...currentTags, tagSlug] };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingPost) {
        BlogService.updatePost(editingPost.id, newPost as Partial<BlogPost>);
      } else {
        BlogService.createPost(newPost as Omit<BlogPost, 'id'>);
      }
      resetForm();
      loadData();
    } catch (err) {
      setError('Failed to save post');
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setNewPost({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      readingTime: post.readingTime,
      isFeatured: post.isFeatured,
      tags: post.tags
    });
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      BlogService.deletePost(id);
      loadData();
    }
  };

  const resetForm = () => {
    setNewPost({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      author: '',
      readingTime: 5,
      isFeatured: false,
      tags: []
    });
    setEditingPost(null);
    setError(null);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Loading blog data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border-red-200 border p-4 rounded-lg">
          <p className="text-red-600">{error}</p>
          <Button onClick={loadData} className="mt-2">Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Blog Management</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Blog Post Form */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6">
              {editingPost ? 'Edit Post' : 'Create New Post'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-1">
                  Title
                </label>
                <input
                  id="title"
                  name="title"
                  value={newPost.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label htmlFor="slug" className="block text-sm font-medium mb-1">
                  Slug
                </label>
                <input
                  id="slug"
                  name="slug"
                  value={newPost.slug}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label htmlFor="excerpt" className="block text-sm font-medium mb-1">
                  Excerpt
                </label>
                <textarea
                  id="excerpt"
                  name="excerpt"
                  value={newPost.excerpt}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label htmlFor="author" className="block text-sm font-medium mb-1">
                  Author
                </label>
                <input
                  id="author"
                  name="author"
                  value={newPost.author}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label htmlFor="readingTime" className="block text-sm font-medium mb-1">
                  Reading Time (minutes)
                </label>
                <input
                  id="readingTime"
                  name="readingTime"
                  type="number"
                  value={newPost.readingTime}
                  onChange={handleInputChange}
                  min={1}
                  required
                  className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isFeatured"
                  name="isFeatured"
                  checked={newPost.isFeatured || false}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-primary-600 border-slate-300 rounded"
                />
                <label htmlFor="isFeatured" className="text-sm font-medium">
                  Featured Post
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tags</label>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge
                      key={tag.id}
                      variant={(newPost.tags || []).includes(tag.slug) ? 'default' : 'outline'}
                      className="cursor-pointer"
                      onClick={() => handleTagChange(tag.slug)}
                    >
                      {tag.name}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="content" className="block text-sm font-medium mb-1">
                  Content (HTML)
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={newPost.content}
                  onChange={handleInputChange}
                  required
                  rows={8}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 font-mono"
                />
              </div>

              <div className="flex justify-between mt-6">
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingPost ? 'Update Post' : 'Create Post'}
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Blog Posts List */}
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Blog Posts ({posts.length})</h2>
            <Button asChild>
              <Link href="/blog">View Blog</Link>
            </Button>
          </div>

          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="bg-white border border-slate-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{post.title}</h3>
                    <p className="text-sm text-slate-500 mb-2">
                      {formatDate(post.date)} • {post.readingTime} min read • {post.author}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag.replace(/-/g, ' ')}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-sm text-slate-600">{post.excerpt}</p>
                  </div>
                  <div className="flex gap-2 ml-4 flex-shrink-0">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(post)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(post.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}