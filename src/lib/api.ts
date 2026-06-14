import 'server-only';

const BACKEND_API_URL = process.env.BACKEND_API_URL || 'http://localhost:3001/api/v1';
const SITE_SLUG = process.env.SITE_SLUG || 'location-voiture-tunisie-24-7';
const SITE_API_KEY = process.env.SITE_API_KEY || '';

/**
 * Server-side fetch utility for the backend API.
 * Only usable in Server Components, Route Handlers, and Server Actions.
 * Sends the X-Api-Key header for authentication.
 */
export async function backendFetch<T = unknown>(
    path: string,
    options: RequestInit = {},
): Promise<T> {
    const url = `${BACKEND_API_URL}${path}`;

    const response = await fetch(url, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            'X-Api-Key': SITE_API_KEY,
            ...options.headers,
        },
        // No caching — always fetch fresh data from backend
        cache: 'no-store',
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(error.error || error.message || `API error ${response.status}`);
    }

    return response.json() as Promise<T>;
}

/**
 * Get the site slug from env.
 */
export function getSiteSlug(): string {
    return SITE_SLUG;
}

/**
 * Convenience: fetch from the public site API.
 */
export async function publicFetch<T = unknown>(
    path: string,
    options: RequestInit = {},
): Promise<T> {
    return backendFetch<T>(`/public/sites/${SITE_SLUG}${path}`, options);
}
