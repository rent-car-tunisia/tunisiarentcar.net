import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCars, getCarBySlug, Car } from "@/lib/data";
import { CarDetailClient } from "@/components/car-detail-client";
import { BreadcrumbSchema } from "@/components/seo-schemas";
import { siteConfig } from "@/lib/site-config";
import { getCities, getReviews, getIncludedFeatures, getUpsellOptions, toNumber } from "@/lib/get-site-data";

interface PageProps {
    params: Promise<{
        city: string;
        "car-slug": string;
    }>;
}

const CITY_NAMES: Record<string, string> = {
    tunis: "Tunis",
    hammamet: "Hammamet",
    sousse: "Sousse",
    monastir: "Monastir",
    djerba: "Djerba",
    enfidha: "Enfidha",
    sfax: "Sfax",
    gabes: "Gabès",
    tozeur: "Tozeur",
    kairouan: "Kairouan",
    bizerte: "Bizerte",
    nabeul: "Nabeul",
};

export async function generateStaticParams() {
    const [cars, cities] = await Promise.all([getCars(), getCities()]);
    const params: { city: string; "car-slug": string }[] = [];

    cities.forEach((city) => {
        cars.forEach((car: Car) => {
            params.push({
                city: city.slug,
                "car-slug": car.slug,
            });
        });
    });

    return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { city: citySlug, "car-slug": slug } = await params;
    const car = await getCarBySlug(slug);
    const city = CITY_NAMES[citySlug] || citySlug.charAt(0).toUpperCase() + citySlug.slice(1);

    if (!car) return { title: "Voiture non trouvée" };

    const transmissionText = car.transmission === 'Automatique' ? 'boîte automatique' : 'boîte manuelle';
    const categoryHint = parseInt(car.price) < 450 ? 'économique' : parseInt(car.price) < 800 ? 'confortable' : 'premium';

    return {
        title: `Location ${car.title} à ${city} | Dès ${car.price} DT / 3 jours | ${siteConfig.brand.name}`,
        description: `Louez une ${car.title} (${transmissionText}, ${car.seats || '5'} places, ${car.fuel || 'essence'}) à ${city}. Véhicule ${categoryHint} dès ${car.price} DT pour 3 jours. Livraison aéroport 24h/24, sans carte bancaire, kilométrage illimité. ${siteConfig.brand.name}.`,
        keywords: [
            `location ${car.title} ${city}`,
            `louer ${car.title} tunisie`,
            `${car.title} location`,
            `voiture location ${city}`,
            `rent car ${city.toLowerCase()}`,
        ],
        openGraph: {
            title: `Location ${car.title} à ${city} | ${siteConfig.brand.name}`,
            description: `Location ${car.title} à ${city}. Prix: ${car.price} ${siteConfig.pricing.currencyDisplay} pour 3 jours. Livraison aéroport gratuite, service 24h/24.`,
            images: [car.featured_image.startsWith('http') ? car.featured_image : `${siteConfig.url.baseUrl}${car.featured_image}`],
            type: "website",
        },
        alternates: {
            canonical: `${siteConfig.url.baseUrl}/rental/${citySlug}/${slug}`,
        },
    };
}

export default async function RentalPage({ params }: PageProps) {
    const { city: citySlug, "car-slug": slug } = await params;
    const [car, allCitiesData, reviewsData, includedData, upsellsData] = await Promise.all([
        getCarBySlug(slug),
        getCities(),
        getReviews(),
        getIncludedFeatures(),
        getUpsellOptions(),
    ]);
    const city = CITY_NAMES[citySlug] || citySlug.charAt(0).toUpperCase() + citySlug.slice(1);

    if (!car) notFound();

    // Find city description from cities data
    const cityData = allCitiesData.find(c => c.slug === citySlug);
    const cityDescription = cityData?.description || "Tunisie";

    // Build included features list
    const includedFeatures = includedData.length > 0
        ? includedData.map(f => f.label)
        : [
            "Kilométrage illimité",
            "Assurance tous risques",
            "Livraison aéroport gratuite",
            "Assistance 24h/24",
            "Climatisation",
            "Annulation gratuite 24h avant",
        ];

    // Build options from upsells (excluding full insurance which is separate)
    const optionsForClient = upsellsData.length > 0
        ? upsellsData
            .filter(u => u.isActive && u.name !== 'Assurance tous risques')
            .map(u => ({
                name: u.name,
                price: toNumber(u.pricePerDay),
                id: u.id,
            }))
        : [
            { name: "GPS Navigation", price: 8, id: "gps" },
            { name: "Siège enfant", price: 5, id: "child-seat" },
            { name: "Conducteur additionnel", price: 10, id: "extra-driver" },
        ];

    // Build reviews for client
    const reviewsForClient = reviewsData.length > 0
        ? reviewsData.map(r => ({ text: r.text, author: r.author, city: r.city || '' }))
        : [
            { text: "Excellent service, voiture impeccable et livraison à l'heure à l'aéroport.", author: "Mohamed K.", city: "Tunis" },
            { text: "Voiture propre et bien entretenue. Le processus de réservation était très simple.", author: "Sarah L.", city: "Paris" },
        ];

    // Cities list for "Also available at" section
    const allCities = allCitiesData.map(c => ({ slug: c.slug, name: c.name }));

    // JSON-LD Schema for SEO
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: `Location ${car.title} à ${city}`,
        description: `Louez une ${car.title} à ${city}, Tunisie. Livraison aéroport gratuite, sans carte bancaire.`,
        image: car.featured_image,
        brand: {
            "@type": "Brand",
            name: car.title.split(" ")[0], // e.g., "Hyundai"
        },
        offers: {
            "@type": "Offer",
            price: car.price,
            priceCurrency: siteConfig.pricing.currency,
            availability: "https://schema.org/InStock",
            seller: {
                "@type": "Organization",
                name: siteConfig.brand.name,
                telephone: siteConfig.contact.phone.display,
            },
        },
        aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: String(siteConfig.rating.value),
            reviewCount: String(siteConfig.rating.reviewCount),
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <BreadcrumbSchema items={[
                { name: "Accueil", url: siteConfig.url.baseUrl },
                { name: "Nos Voitures", url: `${siteConfig.url.baseUrl}/nos-voitures` },
                { name: `Location voiture ${city}`, url: `${siteConfig.url.baseUrl}/location-voiture-${citySlug}` },
                { name: car.title, url: `${siteConfig.url.baseUrl}/rental/${citySlug}/${slug}` },
            ]} />
            <CarDetailClient
                car={{
                    id: car.id,
                    title: car.title,
                    slug: car.slug,
                    description: `Location ${car.title} en Tunisie. ${car.transmission}, ${car.seats} places, ${car.fuel}. ${car.caution}.`,
                    excerpt: car.subtitle || 'ou similaire',
                    price: car.price,
                    featured_image: car.featured_image,
                    seats: car.seats,
                    transmission: car.transmission,
                    fuel: car.fuel,
                }}
                city={city}
                citySlug={citySlug}
                includedFeatures={includedFeatures}
                options={optionsForClient}
                reviews={reviewsForClient}
                cityDescription={cityDescription}
                allCities={allCities}
            />
        </>
    );
}
