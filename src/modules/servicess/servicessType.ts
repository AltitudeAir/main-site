export interface ServiceType {
  id: number;
  title: string;
  blog: BlogType;
}

export type BlogType = {
  id: number;
  title: string;
  description: string;
  content: string;
  date: string;
  coverImage: string;
  publisher: string;
  blogCategory: number;
};
