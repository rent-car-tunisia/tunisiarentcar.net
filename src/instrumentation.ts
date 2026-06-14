/**
 * Next.js Instrumentation Hook
 * Runs once when the server starts.
 *
 * Auto-connects this site to the backend if SITE_API_KEY is configured.
 * No manual curl or POST needed — just set the key and start the server.
 */
export async function register() {
    // Only run on the Node.js server, not on Edge runtime
    if (process.env.NEXT_RUNTIME === 'nodejs') {
        const { connectToBackend } = await import('./lib/connect');

        const apiKey = process.env.SITE_API_KEY;
        if (!apiKey) {
            console.log('[Connect] No SITE_API_KEY set — skipping auto-connect');
            return;
        }

        console.log('[Connect] SITE_API_KEY detected — connecting to backend...');

        try {
            const result = await connectToBackend();
            if (result) {
                console.log(`[Connect] ${result.status === 'synced' ? 'Synced' : 'Connected'} successfully (siteId: ${result.siteId})`);
            }
        } catch (error) {
            // Don't crash the server if backend is unreachable
            console.error('[Connect] Failed to connect to backend:', error instanceof Error ? error.message : error);
            console.error('[Connect] The site will still work — connect will retry on next server restart');
        }
    }
}
