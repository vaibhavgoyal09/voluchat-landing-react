import { BlogPost, BlogCategory, BlogTag } from './blog-types';
import { blogPosts, blogCategories, blogTags } from './blog-data';

// Server-side compatible blog service
// This uses the same data but is designed to work with SSR/SSG

export const BlogServiceServer = {
  // Post Management
  getAllPosts: (): BlogPost[] => {
    return [...blogPosts].sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  },

  getPostBySlug: (slug: string): BlogPost | undefined => {
    return blogPosts.find(post => post.slug === slug);
  },

  getPostById: (id: string): BlogPost | undefined => {
    return blogPosts.find(post => post.id === id);
  },

  getFeaturedPosts: (): BlogPost[] => {
    return blogPosts.filter(post => post.isFeatured).sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  },

  // Category Management
  getAllCategories: (): BlogCategory[] => {
    return [...blogCategories];
  },

  getCategoryBySlug: (slug: string): BlogCategory | undefined => {
    return blogCategories.find(category => category.slug === slug);
  },

  // Tag Management
  getAllTags: (): BlogTag[] => {
    return [...blogTags];
  },

  getTagBySlug: (slug: string): BlogTag | undefined => {
    return blogTags.find(tag => tag.slug === slug);
  },

  // Utility Methods
  getPostsByCategory: (categorySlug: string): BlogPost[] => {
    return blogPosts.filter(post =>
      post.tags.some(tagSlug =>
        blogTags.some(tag =>
          tag.slug === tagSlug &&
          blogCategories.some(category =>
            category.slug === categorySlug &&
            tag.name.includes(category.name.split(' ')[0])
          )
        )
      )
    );
  },

  getPostsByTag: (tagSlug: string): BlogPost[] => {
    return blogPosts.filter(post => post.tags.includes(tagSlug));
  },

  searchPosts: (query: string): BlogPost[] => {
    const lowerQuery = query.toLowerCase();
    return blogPosts.filter(post =>
      post.title.toLowerCase().includes(lowerQuery) ||
      post.excerpt.toLowerCase().includes(lowerQuery) ||
      post.content.toLowerCase().includes(lowerQuery) ||
      post.author.toLowerCase().includes(lowerQuery) ||
      post.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  }
};