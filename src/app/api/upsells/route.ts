import { NextResponse } from 'next/server';

const BACKEND_API_URL = process.env.BACKEND_API_URL || 'http://localhost:3001/api/v1';
const SITE_SLUG = process.env.SITE_SLUG || 'locationvoitures-tunisie';
const SITE_API_KEY = process.env.SITE_API_KEY || '';

/**
 * GET /api/upsells
 * Server-side proxy — fetches upsell options from backend so the
 * backend URL is never exposed to the browser.
 */
export async function GET() {
    try {
        const response = await fetch(
            `${BACKEND_API_URL}/public/sites/${SITE_SLUG}/upsells`,
            {
                headers: {
                    'X-Api-Key': SITE_API_KEY,
                },
                cache: 'no-store',
            },
        );

        if (!response.ok) {
            const err = await response.json().catch(() => ({}));
            return NextResponse.json(
                { error: err.error || 'Failed to fetch upsells' },
                { status: response.status },
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('[api/upsells] Proxy error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 },
        );
    }
}
