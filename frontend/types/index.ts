export interface Project {
  id: number;
  title: string;
  slug: string;
  category: string;
  description: string;
  cover_image: string;
  gallery_images: string[];
  year: number;
  client: string;
  featured: boolean;
  created_at: string;
}

export interface Testimonial {
  id: number;
  client_name: string;
  role: string;
  company: string;
  avatar?: string;
  testimonial: string;
  rating: number;
  created_at: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  project_type: string;
  budget?: string;
  message: string;
}
