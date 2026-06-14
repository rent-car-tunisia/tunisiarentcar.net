// Car Image Mapping Utility
// Maps car slugs to local image paths with external fallback

import { siteConfig } from './site-config';

const LOCAL_CAR_IMAGES: Record<string, string> = {
    'kia-stonic': '/images/cars/kia-stonic.webp',
    'seat-ibiza': '/images/cars/seat-ibiza.webp',
    'hyundai-i20': '/images/cars/hyundai-i20.webp',
    'hyundai-i10': '/images/cars/hyundai-i10.webp',
    'suzuki-swift': '/images/cars/suzuki-swift.webp',
    'seat-arona': '/images/cars/seat-arona.webp',
    'polo-virtus': '/images/cars/polo-virtus.webp',
};

/**
 * Get the image path for a car
 * Returns local path if available, otherwise falls back to external URL
 */
export function getCarImage(slug: string, externalUrl?: string): string {
    // Check if we have a local image
    if (LOCAL_CAR_IMAGES[slug]) {
        return LOCAL_CAR_IMAGES[slug];
    }

    // Fall back to external URL if provided
    if (externalUrl) {
        return externalUrl;
    }

    // Default placeholder
    return '/images/cars/placeholder.webp';
}

/**
 * Check if a car has a local image
 */
export function hasLocalImage(slug: string): boolean {
    return slug in LOCAL_CAR_IMAGES;
}

// Logo paths
export const LOGO_PATH = siteConfig.logo.main;
