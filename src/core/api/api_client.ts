import { apiPaths, setHeaders } from "./apiConstants";

type RequestCache = "default" | "force-cache" | "no-cache" | "no-store" | "only-if-cached" | "reload";


type FetchOptions = {
    method?: "GET" | "POST" | "PUT" | "DELETE";
    body?: any;
    searchParams?: Record<string, string | number | boolean | undefined>;
    cacheOptions?: { cache?: RequestCache; revalidate?: number };
};

type FetchResponse<T> = {
    data: T | null;
    error: string | null;
    status: number;
};

export async function fetchData<T>(
    url: string,
    options?: FetchOptions
): Promise<FetchResponse<T>> {
    try {
        const fullUrl = new URL(apiPaths.baseUrl + url);
        if (options?.searchParams) {
            Object.entries(options.searchParams).forEach(([key, value]) => {
                if (value !== undefined) {
                    fullUrl.searchParams.append(key, String(value));
                }
            });
        }

        let headers = new Headers({
            // "Content-Type": "application/json",
        });

        headers = await setHeaders(headers);

        const fetchOptions = {
            method: options?.method || "GET",
            headers,
            body: options?.body ? JSON.stringify(options.body) : undefined,
            cache: options?.cacheOptions?.cache || "default", // Default caching behavior
            next: options?.cacheOptions?.revalidate
                ? { revalidate: options.cacheOptions.revalidate }
                : undefined,
        };

        const response = await fetch(fullUrl.toString(), fetchOptions);
        const contentType = response.headers.get("Content-Type");

        let data: T | null = null;
        if (contentType?.includes("application/json")) {
            data = (await response.json()) as T;
        } else if (contentType?.includes("text/plain")) {
            data = (await response.text()) as T;
        } else if (contentType?.includes("application/octet-stream")) {
            data = (await response.blob()) as T;
        }

        if (!response.ok) {
            return {
                data: null,
                error: `Error: ${response.status} ${response.statusText}`,
                status: response.status,
            };
        }

        return { data, error: null, status: response.status };
    } catch (error) {
        return {
            data: null,
            error: (error as Error).message || "Unknown error",
            status: 500,
        };
    }
}
