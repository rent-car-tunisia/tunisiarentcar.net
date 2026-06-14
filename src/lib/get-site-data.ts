import 'server-only';
import { publicFetch } from './api';

// ═══════════════════════════════════════════════════════════════════
// Server-side data fetching — replaces hardcoded seo-data.ts
// All functions fetch from the backend public API with fallbacks.
// ═══════════════════════════════════════════════════════════════════

// ── Types (matching backend DB schema response shapes) ───────────

export interface CityData {
    id: string;
    siteId: string;
    slug: string;
    name: string;
    nameWithArticle: string;
    airport?: string | null;
    airportCode?: string | null;
    description: string;
    zones: string[];
    hotels: string[];
    attractions: string[];
    fromPrice: string | number;  // decimal comes as string from DB
    heroImage?: string | null;
    metaTitle: string;
    metaDescription: string;
    displayOrder: number;
    isActive: boolean;
}

export interface ServiceData {
    id: string;
    siteId: string;
    slug: string;
    name: string;
    shortName: string;
    description: string;
    longDescription: string;
    benefits: string[];
    features: string[];
    fromPrice: string | number;
    priceNote?: string | null;
    heroImage?: string | null;
    metaTitle: string;
    metaDescription: string;
    faqs: { question: string; answer: string }[];
    displayOrder: number;
    isActive: boolean;
}

export interface AirportData {
    id: string;
    siteId: string;
    slug: string;
    name: string;
    code: string;
    city: string;
    description: string;
    nearbyDestinations: { name: string; distance: string; time: string }[];
    airportServices: string[];   // DB column name is airport_services
    flightInfo: { airline: string; destinations: string[] }[];
    fromPrice: string | number;
    metaTitle: string;
    metaDescription: string;
    displayOrder: number;
    isActive: boolean;
}

export interface FAQItem {
    id: string;
    siteId: string;
    question: string;
    answer: string;
    category: string;
    displayOrder: number;
    isActive: boolean;
}

export interface ReviewData {
    id: string;
    siteId: string;
    author: string;
    city?: string | null;
    rating: number;
    text: string;
    displayOrder: number;
    isActive: boolean;
}

export interface IncludedFeature {
    id: string;
    siteId: string;
    label: string;
    icon?: string | null;
    displayOrder: number;
    isActive: boolean;
}

export interface UpsellOption {
    id: string;
    name: string;
    description?: string | null;
    pricePerDay: string | number;
    isActive: boolean;
}

// ── Helper: safe number from decimal string ──────────────────────

export function toNumber(val: string | number | null | undefined): number {
    if (val == null) return 0;
    if (typeof val === 'number') return val;
    return parseFloat(val) || 0;
}

// ── Cities ───────────────────────────────────────────────────────

export async function getCities(): Promise<CityData[]> {
    try {
        return await publicFetch<CityData[]>('/cities');
    } catch (error) {
        console.warn('[get-site-data] Failed to fetch cities:', error);
        return [];
    }
}

export async function getCityBySlug(slug: string): Promise<CityData | null> {
    try {
        return await publicFetch<CityData>(`/cities/${slug}`);
    } catch (error) {
        console.warn(`[get-site-data] Failed to fetch city "${slug}":`, error);
        return null;
    }
}

// ── Services ─────────────────────────────────────────────────────

export async function getServices(): Promise<ServiceData[]> {
    try {
        return await publicFetch<ServiceData[]>('/services');
    } catch (error) {
        console.warn('[get-site-data] Failed to fetch services:', error);
        return [];
    }
}

export async function getServiceBySlug(slug: string): Promise<ServiceData | null> {
    try {
        return await publicFetch<ServiceData>(`/services/${slug}`);
    } catch (error) {
        console.warn(`[get-site-data] Failed to fetch service "${slug}":`, error);
        return null;
    }
}

// ── Airports ─────────────────────────────────────────────────────

export async function getAirports(): Promise<AirportData[]> {
    try {
        return await publicFetch<AirportData[]>('/airports');
    } catch (error) {
        console.warn('[get-site-data] Failed to fetch airports:', error);
        return [];
    }
}

export async function getAirportBySlug(slug: string): Promise<AirportData | null> {
    try {
        return await publicFetch<AirportData>(`/airports/${slug}`);
    } catch (error) {
        console.warn(`[get-site-data] Failed to fetch airport "${slug}":`, error);
        return null;
    }
}

// ── FAQs ─────────────────────────────────────────────────────────

export async function getFaqs(category?: string): Promise<FAQItem[]> {
    try {
        const path = category ? `/faqs?category=${encodeURIComponent(category)}` : '/faqs';
        return await publicFetch<FAQItem[]>(path);
    } catch (error) {
        console.warn('[get-site-data] Failed to fetch FAQs:', error);
        return [];
    }
}

// ── Reviews ──────────────────────────────────────────────────────

export async function getReviews(): Promise<ReviewData[]> {
    try {
        return await publicFetch<ReviewData[]>('/reviews');
    } catch (error) {
        console.warn('[get-site-data] Failed to fetch reviews:', error);
        return [];
    }
}

// ── Included Features ────────────────────────────────────────────

export async function getIncludedFeatures(): Promise<IncludedFeature[]> {
    try {
        return await publicFetch<IncludedFeature[]>('/included-features');
    } catch (error) {
        console.warn('[get-site-data] Failed to fetch included features:', error);
        return [];
    }
}

// ── Upsell Options ───────────────────────────────────────────────

export async function getUpsellOptions(): Promise<UpsellOption[]> {
    try {
        return await publicFetch<UpsellOption[]>('/upsells');
    } catch (error) {
        console.warn('[get-site-data] Failed to fetch upsell options:', error);
        return [];
    }
}

// ── Site Config ──────────────────────────────────────────────────

export interface SiteConfigAPI {
    id: string;
    slug: string;
    name: string;
    domain: string;
    isActive: boolean;
    // Extended fields (from Phase 2)
    brandName?: string | null;
    brandNameShort?: string | null;
    brandNameUpper?: string | null;
    foundingYear?: number | null;
    brandDescription?: string | null;
    contactPhone?: string | null;
    contactPhoneLink?: string | null;
    contactWhatsapp?: string | null;
    contactEmail?: string | null;
    addressStreet?: string | null;
    addressCity?: string | null;
    addressRegion?: string | null;
    addressPostalCode?: string | null;
    addressCountry?: string | null;
    addressDisplayShort?: string | null;
    geoLatitude?: string | null;
    geoLongitude?: string | null;
    baseUrl?: string | null;
    googleReviewUrl?: string | null;
    socialFacebook?: string | null;
    socialInstagram?: string | null;
    logoMain?: string | null;
    logoWhite?: string | null;
    logoExternal?: string | null;
    ogImage?: string | null;
    ratingValue?: string | null;
    reviewCount?: number | null;
    pricingCurrency?: string | null;
    pricingCurrencyDisplay?: string | null;
    pricingEurRate?: string | null;
    pricingMinPrice3Days?: string | null;
    pricingMinPrice3DaysEur?: string | null;
    pricingMaxPrice3Days?: string | null;
    pricingLabel?: string | null;
    seoTitleDefault?: string | null;
    seoTitleTemplate?: string | null;
    seoDescription?: string | null;
    seoKeywords?: string[] | null;
    seoLocale?: string | null;
    seoLanguage?: string | null;
    seoGoogleVerification?: string | null;
    telegramBotToken?: string | null;
    telegramChatId?: string | null;
    emailTo?: string | null;
    themeColors?: Record<string, string> | null;
    [key: string]: unknown;
}

export async function getSiteConfig(): Promise<SiteConfigAPI | null> {
    try {
        // The public route is GET /public/sites/:slug (returns full site record)
        return await publicFetch<SiteConfigAPI>('');
    } catch (error) {
        console.warn('[get-site-data] Failed to fetch site config:', error);
        return null;
    }
}
