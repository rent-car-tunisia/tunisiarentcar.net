// JSON-LD Structured Data Components for SEO
// These schemas help Google understand your business and show rich results

import { siteConfig, logoFullUrl } from "@/lib/site-config";

export interface LocalBusinessSchemaProps {
    name?: string;
    description?: string;
    telephone?: string;
    priceRange?: string;
    address?: {
        streetAddress: string;
        addressLocality: string;
        addressRegion: string;
        postalCode: string;
        addressCountry: string;
    };
    geo?: {
        latitude: number;
        longitude: number;
    };
    openingHours?: string[];
    rating?: {
        ratingValue: number;
        reviewCount: number;
    };
}

export function LocalBusinessSchema({
    name = siteConfig.brand.name,
    description = siteConfig.brand.description,
    telephone = siteConfig.contact.phone.display,
    priceRange = siteConfig.pricing.priceRange3Days,
    address = {
        streetAddress: siteConfig.contact.address.street,
        addressLocality: siteConfig.contact.address.city,
        addressRegion: siteConfig.contact.address.region,
        postalCode: siteConfig.contact.address.postalCode,
        addressCountry: siteConfig.contact.address.country,
    },
    geo = {
        latitude: siteConfig.contact.geo.latitude,
        longitude: siteConfig.contact.geo.longitude,
    },
    openingHours = ["Mo-Su 00:00-23:59"],
    rating = {
        ratingValue: siteConfig.rating.value,
        reviewCount: siteConfig.rating.reviewCount,
    }
}: LocalBusinessSchemaProps = {}) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "AutoRental",
        "name": name,
        "description": description,
        "url": siteConfig.url.baseUrl,
        "logo": logoFullUrl,
        "image": `${siteConfig.url.baseUrl}/images/hero-cars.jpg`,
        "telephone": telephone,
        "priceRange": priceRange,
        "foundingDate": "2009",
        "address": {
            "@type": "PostalAddress",
            ...address
        },
        "geo": {
            "@type": "GeoCoordinates",
            ...geo
        },
        "openingHoursSpecification": openingHours.map(hours => ({
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            "opens": "00:00",
            "closes": "23:59"
        })),
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": rating.ratingValue,
            "reviewCount": rating.reviewCount,
            "bestRating": siteConfig.rating.bestRating,
            "worstRating": siteConfig.rating.worstRating,
        },
        "review": [
            {
                "@type": "Review",
                "author": { "@type": "Person", "name": "Sophie M." },
                "datePublished": "2026-04-18",
                "reviewBody": "Excellent service ! Voiture impeccable livrée directement à l'aéroport de Tunis-Carthage. Personnel très professionnel et accueillant.",
                "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
            },
            {
                "@type": "Review",
                "author": { "@type": "Person", "name": "Thomas B." },
                "datePublished": "2026-04-02",
                "reviewBody": "Très bon rapport qualité/prix. Prise en charge rapide à l'hôtel à Hammamet. La voiture était propre et récente.",
                "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
            },
            {
                "@type": "Review",
                "author": { "@type": "Person", "name": "Jean-Pierre L." },
                "datePublished": "2026-03-10",
                "reviewBody": "Réservation simple et rapide, sans besoin de carte bancaire. Personnel très agréable. Je reviendrai !",
                "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
            }
        ],
        "sameAs": [
            siteConfig.social.facebook,
            siteConfig.social.instagram,
        ],
        "areaServed": [
            { "@type": "City", "name": "Tunis" },
            { "@type": "City", "name": "Hammamet" },
            { "@type": "City", "name": "Sousse" },
            { "@type": "City", "name": "Monastir" },
            { "@type": "City", "name": "Djerba" },
            { "@type": "City", "name": "Enfidha" }
        ],
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Location de Voitures",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Car",
                        "name": "Voiture Économique",
                        "description": "Citadine idéale pour la ville"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Car",
                        "name": "SUV",
                        "description": "Véhicule spacieux et confortable"
                    }
                }
            ]
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

export interface FAQSchemaProps {
    faqs: Array<{
        question: string;
        answer: string;
    }>;
}

export function FAQSchema({ faqs }: FAQSchemaProps) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

export interface BreadcrumbSchemaProps {
    items: Array<{
        name: string;
        url: string;
    }>;
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": items.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.url
        }))
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

export interface ProductSchemaProps {
    name: string;
    description: string;
    image: string;
    price: number;
    currency?: string;
    availability?: string;
    brand?: string;
    sku?: string;
    rating?: {
        ratingValue: number;
        reviewCount: number;
    };
}

export function ProductSchema({
    name,
    description,
    image,
    price,
    currency = siteConfig.pricing.currency,
    availability = "https://schema.org/InStock",
    brand = siteConfig.brand.name,
    sku,
    rating
}: ProductSchemaProps) {
    const schema: any = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": name,
        "description": description,
        "image": image,
        "brand": {
            "@type": "Brand",
            "name": brand
        },
        "offers": {
            "@type": "Offer",
            "url": `${siteConfig.url.baseUrl}/nos-voitures`,
            "priceCurrency": currency,
            "price": price,
            "availability": availability,
            "priceValidUntil": new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        }
    };

    if (sku) {
        schema.sku = sku;
    }

    if (rating) {
        schema.aggregateRating = {
            "@type": "AggregateRating",
            "ratingValue": rating.ratingValue,
            "reviewCount": rating.reviewCount
        };
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

export interface WebsiteSchemaProps {
    name?: string;
    url?: string;
    description?: string;
}

export function WebsiteSchema({
    name = siteConfig.brand.name,
    url = siteConfig.url.baseUrl,
    description = "Location de voiture en Tunisie sans carte bancaire"
}: WebsiteSchemaProps = {}) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": name,
        "url": url,
        "description": description,
        "dateCreated": "2009-01-01",
        "copyrightYear": 2009,
        "potentialAction": {
            "@type": "SearchAction",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": `${url}/nos-voitures?search={search_term_string}`
            },
            "query-input": "required name=search_term_string"
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
