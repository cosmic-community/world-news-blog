export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, unknown>;
  type: string;
  created_at: string;
  modified_at: string;
}

export interface ImageField {
  url: string;
  imgix_url: string;
}

export interface Author extends CosmicObject {
  type: 'authors';
  metadata: {
    name: string;
    avatar?: ImageField;
    bio?: string;
  };
}

export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    name: string;
    description?: string;
  };
}

export interface Post extends CosmicObject {
  type: 'posts';
  metadata: {
    content: string;
    featured_image?: ImageField;
    author?: Author;
    category?: Category;
  };
}

export type CategorySlug = 'politics' | 'technology' | 'climate';

export const CATEGORY_COLORS: Record<string, string> = {
  politics: 'bg-category-politics',
  technology: 'bg-category-technology',
  climate: 'bg-category-climate',
}

export const CATEGORY_TEXT_COLORS: Record<string, string> = {
  politics: 'text-category-politics',
  technology: 'text-category-technology',
  climate: 'text-category-climate',
}

export const CATEGORY_BORDER_COLORS: Record<string, string> = {
  politics: 'border-category-politics',
  technology: 'border-category-technology',
  climate: 'border-category-climate',
}