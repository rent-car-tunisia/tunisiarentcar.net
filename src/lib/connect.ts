import { siteConfig } from './site-config';

const BACKEND_API_URL = process.env.BACKEND_API_URL || 'http://localhost:3001/api/v1';
const SITE_API_KEY = process.env.SITE_API_KEY || '';

/**
 * Build the full connect payload from site-config.ts
 */
function buildConnectPayload() {
    return {
        apiKey: SITE_API_KEY,
        config: {
            site: {
                // Core
                name: siteConfig.brand.name,
                nameShort: siteConfig.brand.nameShort,
                nameUpper: siteConfig.brand.nameUpper,
                slug: siteConfig.brand.slug,
                domain: siteConfig.url.domain,
                language: siteConfig.seo.language,
                vertical: 'car_rental',
                description: siteConfig.brand.description,
                foundingYear: siteConfig.brand.foundingYear,
                // Contact
                phone: siteConfig.contact.phone.link,
                phoneDisplay: siteConfig.contact.phone.display,
                whatsapp: siteConfig.contact.phone.whatsapp,
                email: siteConfig.contact.email,
                addressStreet: siteConfig.contact.address.street,
                addressCity: siteConfig.contact.address.city,
                addressRegion: siteConfig.contact.address.region,
                addressPostalCode: siteConfig.contact.address.postalCode,
                addressCountry: siteConfig.contact.address.country,
                addressDisplay: siteConfig.contact.address.displayShort,
                geoLatitude: siteConfig.contact.geo.latitude,
                geoLongitude: siteConfig.contact.geo.longitude,
                // URLs
                baseUrl: siteConfig.url.baseUrl,
                googleReviewUrl: siteConfig.url.googleReview,
                facebookUrl: siteConfig.social.facebook,
                instagramUrl: siteConfig.social.instagram,
                // Logos
                logoMain: siteConfig.logo.main,
                logoWhite: siteConfig.logo.white,
                ogImage: siteConfig.logo.ogImage,
                // Ratings
                ratingValue: siteConfig.rating.value,
                reviewCount: siteConfig.rating.reviewCount,
                // Pricing
                currency: siteConfig.pricing.currency,
                currencyDisplay: siteConfig.pricing.currencyDisplay,
                eurRate: siteConfig.pricing.eurRate,
                minPrice3Days: siteConfig.pricing.minPrice3Days,
                maxPrice3Days: siteConfig.pricing.maxPrice3Days,
                // SEO
                seoTitleDefault: siteConfig.seo.titleDefault,
                seoTitleTemplate: siteConfig.seo.titleTemplate,
                seoDescription: siteConfig.seo.description,
                seoKeywords: siteConfig.seo.keywords,
                seoLocale: siteConfig.seo.locale,
                googleVerification: siteConfig.seo.googleVerification,
                // Telegram
                telegramBotToken: siteConfig.telegram.botToken,
                telegramChatId: siteConfig.telegram.chatId,
                // Theme
                themeColors: siteConfig.theme,
            },
        },
    };
}

/**
 * Connect or sync this site with the backend.
 * - If key is pending → connects and links to site
 * - If key is already connected → syncs config
 * - If no key → skips silently
 *
 * Returns the result object or null if skipped.
 */
export async function connectToBackend(): Promise<Record<string, unknown> | null> {
    if (!SITE_API_KEY) {
        return null;
    }

    const payload = buildConnectPayload();

    // Try connect first
    const response = await fetch(`${BACKEND_API_URL}/connect`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });

    const data = await response.json();

    // If already connected, auto-sync config
    if (data.status === 'already_connected') {
        const syncResponse = await fetch(`${BACKEND_API_URL}/connect/sync`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        const syncData = await syncResponse.json();
        return { ...syncData, message: 'Config synced with backend' };
    }

    if (!response.ok) {
        throw new Error(data.error || 'Connection failed');
    }

    return data;
}

export { SITE_API_KEY, BACKEND_API_URL, buildConnectPayload };
