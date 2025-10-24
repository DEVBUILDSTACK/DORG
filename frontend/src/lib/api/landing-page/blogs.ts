import axios from "axios";

import type { BlogsRequest } from "@/types/landing-page/blogs.types";

import { PAGE_LIMIT } from "@/lib/landing-page/constants";

const BASE_URL = process.env.NEXT_PUBLIC_JSONPRESS_API_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_JSONPRESS_API_KEY;

export const getCategories = async () => {
    try {
        const response = await axios.post(`${BASE_URL}/category/public/get-all`, {
            default: true,
        }, {
            headers: {
                "x-api-key": API_KEY,
                "Content-Type": "application/json",
            },
        });

        if (!response.data) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.data;
        return data;
    } catch (error) {
        console.error("Fetch error:", error);
    }
};

export const getAllBlogs = async ({ page, search, categoryId }: BlogsRequest) => {
    try {
        const response = await axios.post(`${BASE_URL}/public/blog/get-all`, {
            limit: PAGE_LIMIT,
            page,
            search,
            status: "PUBLISHED",
            categoryId,
        }, {
            headers: {
                "x-api-key": API_KEY,
                "Content-Type": "application/json",
            },
        });

        if (!response.data) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.data;
        return data;
    } catch (error) {
        console.error("Fetch error:", error);
    }
};

export const getSingleBlog = async (slug: string) => {
    try {
        const response = await axios.get(`${BASE_URL}/public/blog/${slug}`, {
            headers: {
                "x-api-key": API_KEY,
                "Content-Type": "application/json",
            },
        });

        if (!response.data) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.data;
    } catch (error) {
        console.error("Fetch error:", error);
    }
};
