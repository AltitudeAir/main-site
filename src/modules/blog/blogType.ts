export interface BlogType {
    id: number;
    title: string;
    description: string;
    content: string;
    date: string;
    publisher: string;
    coverImage: string;
    blogCategory: number;
}
export interface BlogCategoryType {
    id: number;
    name: string;
    cover_image: string;
    slug: string;
}
