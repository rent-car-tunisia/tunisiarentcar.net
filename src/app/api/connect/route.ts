import { NextRequest, NextResponse } from 'next/server';
import { connectToBackend, SITE_API_KEY } from '@/lib/connect';
import { siteConfig } from '@/lib/site-config';

/**
 * POST /api/connect
 * Manual trigger (backup). Normally auto-connects on server startup via instrumentation.ts.
 */
export async function POST(request: NextRequest) {
    if (!SITE_API_KEY) {
        return NextResponse.json(
            { error: 'SITE_API_KEY not configured in .env.local' },
            { status: 500 }
        );
    }

    try {
        const result = await connectToBackend();
        return NextResponse.json(result, { status: 200 });
    } catch (error: unknown) {
        console.error('Connect error:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to connect to backend' },
            { status: 500 }
        );
    }
}

/**
 * GET /api/connect
 * Returns connection status info (no secrets exposed)
 */
export async function GET() {
    return NextResponse.json({
        configured: !!SITE_API_KEY,
        slug: siteConfig.brand.slug,
        domain: siteConfig.url.domain,
        hint: 'Connection happens automatically on server startup. This POST endpoint is a manual fallback.',
    });
}
