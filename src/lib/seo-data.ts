// ═══════════════════════════════════════════════════════════════════
// SEO Data — Backward-compatible re-exports from API layer
//
// All content now lives in the database and is fetched via
// lib/get-site-data.ts. This file re-exports the types and
// async functions for use in server components.
//
// DEPRECATED: The old synchronous CITIES, SERVICES, AIRPORTS,
// FAQ_DATA arrays are gone. Use the async functions instead.
// ═══════════════════════════════════════════════════════════════════

// Re-export all types and fetch functions from the API data layer
export type { CityData, ServiceData, AirportData, FAQItem } from './get-site-data';
export {
    getCities,
    getCityBySlug,
    getServices,
    getServiceBySlug,
    getAirports,
    getAirportBySlug,
    getFaqs,
    getReviews,
    getIncludedFeatures,
    toNumber,
} from './get-site-data';
