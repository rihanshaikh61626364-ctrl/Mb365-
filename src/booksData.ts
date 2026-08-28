export interface Book {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  author: string;
  description: string;
  category_id: string;
  price: number;
  originalPrice?: number;
  currency: string;
  cover_url: string;
  pages: number;
  language: string;
  format: string;
  what_you_learn: string[];
  chapters: string[];
  who_this_is_for: string;
  key_features: string[];
  superprofile_url: string;
  is_featured: boolean;
  status: 'draft' | 'published' | 'archived';
  created_at?: string;
  updated_at?: string;
  tag?: string;

  // Backward compatibility alias keys for safety
  image?: string; 
  category?: string;
  whatYouWillLearn?: string[];
  insideTheBook?: string[];
  whoIsThisBookFor?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  status: 'active' | 'inactive';
  icon?: string;
}

export const CATEGORIES: Category[] = [
  { id: 'b3fa72bb-7622-4467-9c98-15c4d32049d5', name: 'Business', slug: 'business', description: 'Understand how businesses actually work.', status: 'active', icon: 'Briefcase' },
  { id: 'e8b0a880-993d-4c3d-86cf-15dcd9302bf5', name: 'Entrepreneurship', slug: 'entrepreneurship', description: 'Learn how ideas become real businesses.', status: 'active', icon: 'Lightbulb' },
  { id: 'd5a0ab2a-a92c-49f3-8b3d-1cf7d2105cf4', name: 'Marketing', slug: 'marketing', description: 'Understand how brands attract and retain customers.', status: 'active', icon: 'TrendingUp' },
  { id: 'f9d0c22d-bc4d-4cb3-9d4d-2df9db30cf55', name: 'Finance', slug: 'finance', description: 'Build a practical understanding of money and business finance.', status: 'active', icon: 'DollarSign' },
  { id: 'a5c0df3a-3c2d-45db-ad6b-3cf9e3100df5', name: 'Productivity & AI', slug: 'productivity', description: 'Work smarter with better systems and modern tools.', status: 'active', icon: 'Cpu' },
  { id: 'c6d0fb4d-8c1d-44a3-ad6c-4df9db504df5', name: 'Growth & Strategy', slug: 'growth', description: 'Learn how businesses grow, compete and scale.', status: 'active', icon: 'Award' },
];

export const BOOKS: Book[] = [];

export interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  bgGradient: string;
  image: string;
  accentText: string;
}

export const HERO_SLIDES: Slide[] = [
  {
    id: 1,
    title: "Knowledge That Helps You Build.",
    subtitle: "PRACTICAL • EASY TO UNDERSTAND • ACTION-ORIENTED",
    description: "Practical eBooks for business, entrepreneurship, marketing, finance, productivity and more — created to help you learn concepts clearly and put them into action.",
    bgGradient: "from-[#F8FAFC] to-[#E2E8F0]",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80",
    accentText: "#2563EB"
  },
  {
    id: 2,
    title: "Start With a Book. Build With Knowledge.",
    subtitle: "SIMPLE • STRUCTURED • HIGH IMPACT",
    description: "Whether you're starting from zero or looking to sharpen your skills, find a topic that fits your journey with our digital publishing library.",
    bgGradient: "from-[#F8FAFC] to-[#BFDBFE]",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&auto=format&fit=crop&q=80",
    accentText: "#D4A72C"
  },
  {
    id: 3,
    title: "Read. Learn. Grow.",
    subtitle: "PRACTICAL EBOOKS FOR PEOPLE WHO WANT TO LEARN AND BUILD",
    description: "Our mission is simple: Make useful knowledge easier to understand and easier to apply in business, startups, productivity, and beyond.",
    bgGradient: "from-[#F8FAFC] to-[#FDE68A]",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=80",
    accentText: "#0B1F3A"
  }
];
