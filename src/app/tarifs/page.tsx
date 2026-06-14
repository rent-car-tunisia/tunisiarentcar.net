import { Metadata } from "next";
import Link from "next/link";
import { getCars } from "@/lib/data";
import { CarCard } from "@/components/car-card";
import { ChevronRight, Phone, Car } from "lucide-react";
import { siteConfig, telUrl } from "@/lib/site-config";
import { TarifsSeasonTable, TarifsOptionsSection } from "@/components/tarifs-prices";
import { getIncludedFeatures, getUpsellOptions, toNumber } from "@/lib/get-site-data";

export const metadata: Metadata = {
    title: `Tarifs Location Voiture Tunisie 2026 | Prix & Promotions | ${siteConfig.brand.name}`,
    description: "Découvrez nos tarifs de location voiture en Tunisie. Prix transparents, kilométrage illimité, assurance incluse. Dès 324 DT pour 3 jours.",
    openGraph: {
        title: `Tarifs Location Voiture Tunisie 2026 | ${siteConfig.brand.name}`,
        description: "Prix location voiture Tunisie. Tarifs par catégorie et par saison. Sans carte bancaire.",
    },
    alternates: {
        canonical: `${siteConfig.url.baseUrl}/tarifs`,
    },
};

export default async function TarifsPage() {
    const [cars, includedFeatures, upsellOptions] = await Promise.all([
        getCars(),
        getIncludedFeatures(),
        getUpsellOptions(),
    ]);
    const featuredCars = cars.slice(0, 8);

    // Price tiers by season (3-day pricing based on real car data)
    const seasonalPrices = [
        { season: "Basse saison", months: "Nov - Mars", citadine: "324-426", compacte: "440-560", suv: "710-850", luxe: "1014-1200", color: "bg-blue-50 border-blue-200" },
        { season: "Moyenne saison", months: "Avr - Mai, Oct", citadine: "390-510", compacte: "530-670", suv: "850-1020", luxe: "1215-1440", color: "bg-amber-50 border-amber-200" },
        { season: "Haute saison", months: "Juin - Sept", citadine: "520-680", compacte: "700-900", suv: "1135-1360", luxe: "1625-1920", color: "bg-red-50 border-red-200" },
    ];

    // Build included list from API data, with fallback
    const included = includedFeatures.length > 0
        ? includedFeatures.map(f => f.label)
        : [
            "Kilométrage illimité",
            "Assurance responsabilité civile",
            "Assurance collision (CDW)",
            "TVA incluse",
            "Livraison aéroport gratuite",
            "Assistance routière 24/7",
        ];

    // Build options list from API data, with fallback
    const options = upsellOptions.length > 0
        ? upsellOptions.map(u => ({ name: u.name, priceTND: toNumber(u.pricePerDay) }))
        : [
            { name: "GPS", priceTND: 8 },
            { name: "Siège bébé", priceTND: 5 },
            { name: "Siège enfant", priceTND: 5 },
            { name: "Conducteur additionnel", priceTND: 10 },
            { name: "Assurance tous risques (franchise zéro)", priceTND: 45 },
        ];

    const themeGradient = `linear-gradient(135deg, ${siteConfig.theme.primary} 0%, ${siteConfig.theme.primaryContainer} 50%, ${siteConfig.theme.primary} 100%)`;

    return (
        <>
            {/* Hero */}
            <section className="bg-[#00256f]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 sm:py-6">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-1.5 text-xs text-blue-300/70 mb-3">
                        <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
                        <ChevronRight size={12} />
                        <span className="text-white font-medium">Tarifs</span>
                    </nav>

                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-white leading-tight">
                                Tarifs Location Voiture <span className="text-on-primary-container">Tunisie 2026</span>
                            </h1>
                            <p className="text-xs sm:text-sm text-blue-200/70 mt-1">
                                Prix transparents &bull; Kilométrage illimité &bull; Assurance incluse
                            </p>
                        </div>
                        <Link
                            href="/nos-voitures"
                            className="hidden sm:inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all flex-shrink-0"
                        >
                            <Car size={16} />
                            Voir nos voitures
                        </Link>
                    </div>
                </div>
            </section>

            {/* Seasonal Prices */}
            <TarifsSeasonTable seasonalPrices={seasonalPrices} themeGradient={themeGradient} />

            {/* What's Included + Options */}
            <TarifsOptionsSection options={options} included={included} />

            {/* Cars Grid */}
            <section className="py-16 bg-white">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Nos véhicules et leurs tarifs
                        </h2>
                        <Link href="/nos-voitures" className="text-accent font-medium hover:underline flex items-center gap-1">
                            Voir tout <ChevronRight size={16} />
                        </Link>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {featuredCars.map((car) => (
                            <CarCard
                                key={car.id}
                                id={car.id}
                                title={car.title}
                                slug={car.slug}
                                subtitle={car.subtitle}
                                price3Days={car.price3Days}
                                currency={car.currency}
                                image={car.featured_image}
                                category={car.category}
                                seats={car.seats}
                                doors={car.doors}
                                transmission={car.transmission}
                                fuel={car.fuel}
                                caution={car.caution}
                                freeCancellation={car.freeCancellation}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16" style={{ background: themeGradient }}>
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Besoin d&apos;un devis personnalisé ?
                    </h2>
                    <p className="text-gray-300 mb-8">
                        Contactez-nous pour obtenir un tarif adapté à vos besoins.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a
                            href={telUrl}
                            className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors"
                        >
                            <Phone size={20} />
                            {siteConfig.contact.phone.display}
                        </a>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-8 py-4 rounded-xl font-bold transition-colors"
                        >
                            Demander un devis
                            <ChevronRight size={18} />
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
