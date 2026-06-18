// ═══════════════════════════════════════════════════════════════════
// Site Configuration — Tunisia Rent Car
// Domain: tunisiarentcar.net | EN | International
// ═══════════════════════════════════════════════════════════════════

export const siteConfig = {
    lang: "en",

    brand: {
        name: "Tunisia Rent Car",
        nameShort: "TRC",
        nameUpper: "TUNISIA RENT CAR",
        slug: "tunisia-rent-car",
        foundingYear: 2009,
        description: "Rent a car in Tunisia at the best price. Tunisia car rental with free airport delivery, no credit card required, unlimited mileage and full insurance included.",
    },

    contact: {
        phone: {
            display: "+216 23 179 016",
            link: "+21623179016",
            whatsapp: "21623179016",
        },
        email: "contact.booking.rentalcars@gmail.com",
        address: {
            street: "Tunis-Carthage International Airport",
            city: "Tunis",
            region: "Tunis",
            postalCode: "2035",
            country: "TN",
            displayShort: "Tunis, Tunisia",
        },
        geo: {
            latitude: 36.8510,
            longitude: 10.2272,
        },
    },

    url: {
        domain: "tunisiarentcar.net",
        baseUrl: "https://tunisiarentcar.net",
        googleReview: "",
    },

    social: {
        facebook: "",
        instagram: "",
    },

    logo: {
        main: "/images/logo/logo.png",
        white: "/images/logo/logo-wh.png",
        external: "",
        ogImage: "/images/og-image.jpg",
    },

    rating: {
        value: 4.9,
        reviewCount: 195,
        bestRating: 5,
        worstRating: 1,
    },

    pricing: {
        currency: "TND",
        currencyDisplay: "DT",
        eurRate: 3.3,
        minPrice3Days: 324,
        minPrice3DaysEur: 98,
        maxPrice3Days: 1521,
        priceRange3Days: "324 DT - 1521 DT",
        priceRange3DaysEur: "€98 - €461",
        pricingLabel: "Price for 3 days",
    },

    seo: {
        titleDefault: "Tunisia Rent Car – Cheap Car Rental, No Credit Card Needed",
        titleTemplate: "%s | Tunisia Rent Car",
        description: "Rent a car in Tunisia from 324 DT for 3 days. No credit card required, free airport delivery, unlimited mileage, full insurance. Best car rental rates in Tunisia.",
        keywords: [
            "rent a car tunisia",
            "car rental tunisia",
            "tunisia car rental",
            "cheap car rental tunisia",
            "rent car tunisia airport",
            "tunisia rent a car no credit card",
            "best car rental tunisia",
            "car rental tunis airport",
            "car rental djerba",
            "car rental hammamet",
            "rent a car monastir",
            "rent car tunisia unlimited mileage",
        ],
        locale: "en_TN",
        language: "en",
        googleVerification: "",
    },

    booking: {
        storageKey: "trc-booking-storage",
        reviewStorageKey: "trc_reviewed",
        defaultLocation: "Tunis, Tunisia",
    },

    telegram: {
        botToken: "",
        chatId: "",
    },

    email: {
        to: "contact.booking.rentalcars@gmail.com",
    },

    content: {
        hero: {
            h1: "Rent a Car in Tunisia",
            subtitle: "Best car rental rates in Tunisia with free delivery to all airports and hotels. No credit card required, unlimited mileage, full insurance included. From 324 DT for 3 days.",
            badge: "Best Price Guaranteed",
        },
        nav: {
            links: [
                { href: "/", label: "Home" },
                { href: "/nos-voitures", label: "Our Cars" },
                { href: "/tarifs", label: "Rates" },
                { href: "/contact", label: "Contact" },
            ],
            mobileAvailability: "Available 24/7",
            currencyLabel: "Currency:",
        },
        trust: {
            badges: [
                {
                    icon: "credit_card_off",
                    title: "No Credit Card",
                    desc: "Pay cash on arrival. 100% free reservation with no commitment required.",
                },
                {
                    icon: "schedule",
                    title: "24/7 Availability",
                    desc: "Our team is available day and night. Airport pickup available at any hour.",
                },
                {
                    icon: "verified_user",
                    title: "Insurance Included",
                    desc: "All our vehicles come with full insurance coverage. Drive with complete peace of mind.",
                },
            ],
        },
        footer: {
            tagline: "Car rental in Tunisia with free delivery to airports and hotels. No credit card required, pay cash on arrival.",
            cityLinksHeading: "Car Rental by City",
            servicesHeading: "Our Services",
            serviceLinks: [
                { name: "Our Cars", href: "/nos-voitures" },
                { name: "Rates", href: "/tarifs" },
                { name: "FAQ", href: "/faq" },
                { name: "Contact", href: "/contact" },
            ],
            allRightsReserved: "All rights reserved.",
        },
        promo: {
            badge: "Best Deal",
            h2: "Explore Tunisia at your own pace",
            subtitle: "From beach resorts to ancient ruins — rent a car and discover Tunisia your way. Free airport delivery with every booking.",
            priceLabel: "From",
            priceSuffix: "/ 3 days",
            cta: "Browse cars",
        },
        home: {
            fleetLabel: "Our Fleet",
            fleetTitle: "Cars Available",
            viewAll: "View all",
            viewAllMobile: "View all cars",
            faqLabel: "Frequently Asked Questions",
            faqTitle: "Everything you need to know about renting a car in Tunisia",
        },
        meta: {
            ogTitle: "Tunisia Rent Car – From 324 DT/3 Days | No Credit Card",
            ogDesc: "Rent a car in Tunisia from 324 DT for 3 days. No credit card, free airport delivery, unlimited mileage, full insurance.",
            ogImageAlt: "Tunisia Rent Car – Best Car Rental Rates",
        },
    },

    theme: {
        heroVariant: "split",   // "overlay" | "split"
        cardVariant: "outlined",   // "default" | "outlined"
        primary: "#0f766e",
        primaryContainer: "#115e59",
        primaryFixed: "#dbe1ff",
        onPrimary: "#ffffff",
        onPrimaryContainer: "#5eead4",
        accent: "#0f766e",
        accentDark: "#115e59",
        background: "#f7f9fc",
        surface: "#f7f9fc",
        surfaceContainerLow: "#f2f4f7",
        surfaceContainerLowest: "#ffffff",
        surfaceContainerHighest: "#e0e3e6",
        onSurface: "#191c1e",
        onSurfaceVariant: "#444651",
        outlineVariant: "#c4c6d3",
        footerBg: "#042f2e",
    },
} as const;

export const whatsappUrl = `https://wa.me/${siteConfig.contact.phone.whatsapp}`;
export const telUrl = `tel:${siteConfig.contact.phone.link}`;
export const mailtoUrl = `mailto:${siteConfig.contact.email}`;
export const ogImageUrl = `${siteConfig.url.baseUrl}${siteConfig.logo.ogImage}`;
export const logoFullUrl = `${siteConfig.url.baseUrl}/images/logo/logo.png`;
export const copyrightLine = (year: number) =>
    `© ${siteConfig.brand.foundingYear} - ${year} ${siteConfig.brand.name}. ${siteConfig.content.footer.allRightsReserved}`;

export type SiteConfig = typeof siteConfig;
