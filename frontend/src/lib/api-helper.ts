import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";

import { getAccessToken } from "@privy-io/react-auth";
import axios from "axios";

// Define API base URL
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

// Check if code is running in browser environment
const isBrowser = typeof window !== "undefined";

// Create Axios instance
export const apiClient: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: false, // Enables sending cookies with requests
    headers: {
        "Content-Type": "application/json", // Default content type
        ...(isBrowser && { "x-client-timezone": Intl.DateTimeFormat().resolvedOptions().timeZone }), // Set client timezone
    },
});

// Function to dynamically set token for auth-enabled requests
async function setAuthHeader(config: AxiosRequestConfig, useAuth: boolean): Promise<AxiosRequestConfig> {
    if (useAuth && isBrowser) {
        // Only try to access localStorage in browser environment
        const accessToken = await getAccessToken();
        if (accessToken) {
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${accessToken}`,
            };
        }
    }
    return config;
}

// Interceptors for requests
apiClient.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        return config as InternalAxiosRequestConfig<any>;
    },
    error => Promise.reject(error),
);

// Interceptors for responses
apiClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => {
        if (error?.config?.method === "get")
            return;
        if (error.response?.status === 401) {
            window.location.href = "/"; // Redirect for unauthorized users
        }
        return Promise.reject(error);
    },
);

// Utility function for GET requests
export async function ApiGet<T>(url: string, config?: AxiosRequestConfig, useAuth = true): Promise<T> {
    const finalConfig = await setAuthHeader(config || {}, useAuth);
    const response = await apiClient.get<T>(url, finalConfig);
    return response.data;
}

// Utility function for POST requests with JSON data
export async function ApiPost<T>(url: string, data: any, config?: AxiosRequestConfig, useAuth = true): Promise<T> {
    const finalConfig = await setAuthHeader(config || {}, useAuth);
    const response = await apiClient.post<T>(url, data, finalConfig);
    return response.data;
}

// Utility function for PATCH requests with JSON data
export async function ApiPatch<T>(url: string, data: any, config?: AxiosRequestConfig, useAuth = true): Promise<T> {
    const finalConfig = await setAuthHeader(config || {}, useAuth);
    const response = await apiClient.patch<T>(url, data, finalConfig);
    return response.data;
}

// Utility function for POST requests with FormData
export async function ApiPostFormData<T>(url: string, formData: FormData, config?: AxiosRequestConfig, useAuth = true): Promise<T> {
    const finalConfig = await setAuthHeader(
        {
            ...config,
            headers: {
                ...config?.headers,
                "Content-Type": "multipart/form-data", // Explicitly set for FormData
            },
        },
        useAuth,
    );

    const response = await apiClient.post<T>(url, formData, finalConfig);
    return response.data;
}

// Utility function for PUT requests with JSON data
export async function ApiPut<T>(url: string, data: any, config?: AxiosRequestConfig, useAuth = true): Promise<T> {
    const finalConfig = await setAuthHeader(config || {}, useAuth);
    const response = await apiClient.put<T>(url, data, finalConfig);
    return response.data;
}

// Utility function for DELETE requests
export async function ApiDelete<T>(url: string, config?: AxiosRequestConfig, useAuth = true): Promise<T> {
    const finalConfig = await setAuthHeader(config || {}, useAuth);
    const response = await apiClient.delete<T>(url, finalConfig);
    return response.data;
}

// Utility function for GET requests from next api route
export async function NextApiGet<T>(url: string): Promise<T> {
    const response = await fetch(url);
    return response.json() as T;
}

export default apiClient;
