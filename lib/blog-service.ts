import { BlogPost, BlogCategory, BlogTag } from './blog-types';
import { blogPosts, blogCategories, blogTags } from './blog-data';

// In-memory database simulation
let postsDatabase: BlogPost[] = [...blogPosts];
let categoriesDatabase: BlogCategory[] = [...blogCategories];
let tagsDatabase: BlogTag[] = [...blogTags];

export const BlogService = {
  // Post Management
  getAllPosts: (): BlogPost[] => {
    return [...postsDatabase].sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  },

  getPostBySlug: (slug: string): BlogPost | undefined => {
    return postsDatabase.find(post => post.slug === slug);
  },

  getPostById: (id: string): BlogPost | undefined => {
    return postsDatabase.find(post => post.id === id);
  },

  createPost: (postData: Omit<BlogPost, 'id'>): BlogPost => {
    const newPost: BlogPost = {
      ...postData,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0]
    };
    postsDatabase.push(newPost);
    return newPost;
  },

  updatePost: (id: string, updatedData: Partial<BlogPost>): BlogPost | null => {
    const postIndex = postsDatabase.findIndex(post => post.id === id);
    if (postIndex === -1) return null;

    const updatedPost = {
      ...postsDatabase[postIndex],
      ...updatedData
    };

    postsDatabase[postIndex] = updatedPost;
    return updatedPost;
  },

  deletePost: (id: string): boolean => {
    const initialLength = postsDatabase.length;
    postsDatabase = postsDatabase.filter(post => post.id !== id);
    return postsDatabase.length !== initialLength;
  },

  // Category Management
  getAllCategories: (): BlogCategory[] => {
    return [...categoriesDatabase];
  },

  getCategoryBySlug: (slug: string): BlogCategory | undefined => {
    return categoriesDatabase.find(category => category.slug === slug);
  },

  getCategoryById: (id: string): BlogCategory | undefined => {
    return categoriesDatabase.find(category => category.id === id);
  },

  createCategory: (categoryData: Omit<BlogCategory, 'id'>): BlogCategory => {
    const newCategory: BlogCategory = {
      ...categoryData,
      id: Date.now().toString()
    };
    categoriesDatabase.push(newCategory);
    return newCategory;
  },

  updateCategory: (id: string, updatedData: Partial<BlogCategory>): BlogCategory | null => {
    const categoryIndex = categoriesDatabase.findIndex(category => category.id === id);
    if (categoryIndex === -1) return null;

    const updatedCategory = {
      ...categoriesDatabase[categoryIndex],
      ...updatedData
    };

    categoriesDatabase[categoryIndex] = updatedCategory;
    return updatedCategory;
  },

  deleteCategory: (id: string): boolean => {
    const initialLength = categoriesDatabase.length;
    categoriesDatabase = categoriesDatabase.filter(category => category.id !== id);
    return categoriesDatabase.length !== initialLength;
  },

  // Tag Management
  getAllTags: (): BlogTag[] => {
    return [...tagsDatabase];
  },

  getTagBySlug: (slug: string): BlogTag | undefined => {
    return tagsDatabase.find(tag => tag.slug === slug);
  },

  getTagById: (id: string): BlogTag | undefined => {
    return tagsDatabase.find(tag => tag.id === id);
  },

  createTag: (tagData: Omit<BlogTag, 'id'>): BlogTag => {
    const newTag: BlogTag = {
      ...tagData,
      id: Date.now().toString()
    };
    tagsDatabase.push(newTag);
    return newTag;
  },

  updateTag: (id: string, updatedData: Partial<BlogTag>): BlogTag | null => {
    const tagIndex = tagsDatabase.findIndex(tag => tag.id === id);
    if (tagIndex === -1) return null;

    const updatedTag = {
      ...tagsDatabase[tagIndex],
      ...updatedData
    };

    tagsDatabase[tagIndex] = updatedTag;
    return updatedTag;
  },

  deleteTag: (id: string): boolean => {
    const initialLength = tagsDatabase.length;
    tagsDatabase = tagsDatabase.filter(tag => tag.id !== id);
    return tagsDatabase.length !== initialLength;
  },

  // Utility Methods
  getPostsByCategory: (categorySlug: string): BlogPost[] => {
    return postsDatabase.filter(post =>
      post.tags.some(tagSlug =>
        tagsDatabase.some(tag =>
          tag.slug === tagSlug &&
          categoriesDatabase.some(category =>
            category.slug === categorySlug &&
            tag.name.includes(category.name.split(' ')[0])
          )
        )
      )
    );
  },

  getPostsByTag: (tagSlug: string): BlogPost[] => {
    return postsDatabase.filter(post => post.tags.includes(tagSlug));
  },

  getFeaturedPosts: (): BlogPost[] => {
    return postsDatabase.filter(post => post.isFeatured);
  },

  searchPosts: (query: string): BlogPost[] => {
    const lowerQuery = query.toLowerCase();
    return postsDatabase.filter(post =>
      post.title.toLowerCase().includes(lowerQuery) ||
      post.excerpt.toLowerCase().includes(lowerQuery) ||
      post.content.toLowerCase().includes(lowerQuery) ||
      post.author.toLowerCase().includes(lowerQuery) ||
      post.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  },

  // Reset to default data (useful for testing)
  resetToDefaultData: () => {
    postsDatabase = [...blogPosts];
    categoriesDatabase = [...blogCategories];
    tagsDatabase = [...blogTags];
  }
};