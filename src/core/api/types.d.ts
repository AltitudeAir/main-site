type BufferSource = ArrayBufferView | ArrayBuffer;

type XMLHttpRequestBodyInit = Blob | BufferSource | FormData | URLSearchParams | string;

type RequestCache = "default" | "force-cache" | "no-cache" | "no-store" | "only-if-cached" | "reload";
type BodyInit = ReadableStream | XMLHttpRequestBodyInit;


export type FetchOptions = {
    method?: "GET" | "POST" | "PUT" | "DELETE";
    body?: any;
    searchParams?: Record<string, string | number | boolean | undefined>;
    cacheOptions?: { cache?: RequestCache; revalidate?: number };
};

export type FetchResponse<T> = {
    data: T | undefined;
    error: string | undefined;
    status: number;
};

export type RequestInit = {
    method: "GET" | "POST" | "PUT" | "DELETE" | undefined,
    headers: Headers,
    body: BodyInit,
    cache: RequestCache, // Default caching behavior
    next:
    { revalidate: number }
    | undefined,
}