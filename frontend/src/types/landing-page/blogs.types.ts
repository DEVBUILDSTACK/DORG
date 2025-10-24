import type { ApiResponse, PaginationData } from "../apiResponse";
import type { EditorBlock, ImageMetaDataType } from "./comments.types";

export enum BlogStatus {
    DRAFT = "DRAFT",
    PUBLISHED = "PUBLISHED",
}

export type BlogContent = {
    time: number;
    blocks: EditorBlock[];
    version: string;
};

export type Category = {
    id: string;
    name: string;
    description: string | null;
    isDefault: boolean;
};

export type Blog = {
    id: string;
    slug: string;
    authorName: string | null;
    title: string;
    subTitle: string | null;
    tags: string[];
    content: BlogContent | null;
    priority: number;
    status: BlogStatus;
    authorImage: ImageMetaDataType | null;
    coverImage: ImageMetaDataType | null;
    createdAt: string;
    readTime: number | null;
    metaTitle: string | null;
    metaDescription: string | null;
    isPublic: boolean;
    category: Category;
};

export type BlogsRequest = {
    limit?: number;
    page: number;
    search: string;
    status?: string;
    categoryId: string;
};

export type BlogsResponseData = {
    data: Blog[];
    metadata: PaginationData;
};

export type BlogsResponse = ApiResponse<BlogsResponseData>;

export type CategoriesResponse = {
    id: string;
    created_at: string;
    name: string;
    parent_id: number | null;
};
