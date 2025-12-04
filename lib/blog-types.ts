export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  authorImage?: string;
  tags: string[];
  featuredImage?: string;
  readingTime: number;
  isFeatured?: boolean;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export interface BlogTag {
  id: string;
  name: string;
  slug: string;
}