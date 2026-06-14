import { Metadata } from "next";
import Link from "next/link";
import { getAirportBySlug, getAirports, getCities, toNumber } from "@/lib/get-site-data";
import { getCars } from "@/lib/data";
import { CarCard } from "@/components/car-card";
import { Plane, Clock, MapPin, Shield, Phone, ChevronRight, Check, Car } from "lucide-react";
import { siteConfig, telUrl } from "@/lib/site-config";
import { BreadcrumbSchema } from "@/components/seo-schemas";
import { PriceHero, CurrencyPrice } from "@/components/currency-price";

interface AirportPageProps {
    slug: string;
}

export async function generateAirportMetadata(slug: string): Promise<Metadata> {
    const airport = await getAirportBySlug(slug);
    if (!airport) return { title: "Page non trouvée" };

    return {
        title: airport.metaTitle,
        description: airport.metaDescription,
        openGraph: {
            title: airport.metaTitle,
            description: airport.metaDescription,
        },
        alternates: {
            canonical: `${siteConfig.url.baseUrl}/aeroport-${airport.slug}`,
        },
    };
}

export async function AirportPageContent({ slug }: AirportPageProps) {
    const [airport, allCities, allAirports, cars] = await Promise.all([
        getAirportBySlug(slug),
        getCities(),
        getAirports(),
        getCars(),
    ]);
    if (!airport) return null;
    // Vary featured cars by airport so each page shows different vehicles
    const offset = slug.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) % Math.max(cars.length - 4, 1);
    const featuredCars = cars.slice(offset, offset + 4).length === 4
        ? cars.slice(offset, offset + 4)
        : [...cars.slice(offset), ...cars.slice(0, 4 - (cars.length - offset))];

    // JSON-LD Schema
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: `${siteConfig.brand.name} - ${airport.name}`,
        description: airport.description,
        address: {
            "@type": "PostalAddress",
            addressLocality: airport.city,
            addressCountry: "TN",
        },
        telephone: siteConfig.contact.phone.display,
        priceRange: `${toNumber(airport.fromPrice)} ${siteConfig.pricing.currencyDisplay} - 1521 ${siteConfig.pricing.currencyDisplay}`,
        openingHoursSpecification: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            opens: "00:00",
            closes: "23:59",
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
                { name: airport.name, url: `${siteConfig.url.baseUrl}/aeroport-${airport.slug}` },
            ]} />

            {/* Hero Section */}
            <section className="relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${siteConfig.theme.primary} 0%, ${siteConfig.theme.primaryContainer} 50%, ${siteConfig.theme.primary} 100%)` }}>
                {/* Decorative elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
                </div>

                <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
                        <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
                        <ChevronRight size={14} />
                        <span className="text-white font-medium">{airport.name}</span>
                    </nav>

                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left - Content */}
                        <div>
                            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                                <Plane size={18} className="text-accent" />
                                <span className="font-mono text-accent">{airport.code}</span>
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
                                Location Voiture<br />
                                <span className="text-accent">{airport.name}</span>
                            </h1>

                            <p className="text-lg text-gray-300 leading-relaxed mb-8 max-w-xl">
                                {airport.description}
                            </p>

                            {/* Trust indicators */}
                            <div className="flex flex-wrap items-center gap-4 mb-8">
                                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                                    <Clock size={18} className="text-accent" />
                                    <span className="text-white font-bold">24h/24</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                                    <Check size={18} className="text-green-400" />
                                    <span className="text-white text-sm">Sans carte bancaire</span>
                                </div>
                            </div>

                            {/* CTA */}
                            <div className="flex flex-wrap gap-4">
                                <Link
                                    href="/nos-voitures"
                                    className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 hover:shadow-lg hover:shadow-accent/25"
                                >
                                    <Car size={20} />
                                    Réserver maintenant
                                </Link>
                                <a
                                    href={telUrl}
                                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-4 rounded-xl font-medium transition-all"
                                >
                                    <Phone size={18} />
                                    {siteConfig.contact.phone.display}
                                </a>
                            </div>
                        </div>

                        {/* Right - Price Card */}
                        <div className="hidden lg:block">
                            <div className="bg-white rounded-2xl shadow-2xl p-8 transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                                        <Plane size={24} className="text-accent" />
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-500">À partir de</div>
                                <div className="text-3xl font-black text-gray-900"><PriceHero amount={toNumber(airport.fromPrice)} /></div>
                                    </div>
                                </div>
                                <div className="space-y-3 border-t border-gray-100 pt-4">
                                    {["Accueil au terminal", "Service 24h/24", "Kilométrage illimité", "Sans carte bancaire"].map((item, i) => (
                                        <div key={i} className="flex items-center gap-2 text-gray-700">
                                            <Check size={16} className="text-green-500" />
                                            <span className="text-sm">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Left Column */}
                        <div className="lg:col-span-2 space-y-8">

                            {/* Nearby Destinations */}
                            <div className="bg-white rounded-2xl p-8 shadow-sm">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                    <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
                                        <MapPin className="text-accent" size={20} />
                                    </div>
                                    Destinations depuis {airport.name}
                                </h2>
                                <p className="text-gray-600 mb-6">
                                    Distances et temps de trajet depuis l&apos;aéroport :
                                </p>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {airport.nearbyDestinations.map((dest, i) => (
                                        <div key={i} className="flex justify-between items-center bg-gray-50 rounded-xl p-4">
                                            <div>
                                                <div className="font-bold text-gray-900">{dest.name}</div>
                                                <div className="text-sm text-gray-500">{dest.distance}</div>
                                            </div>
                                            <div className="text-accent font-bold text-lg">{dest.time}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Services */}
                            <div className="bg-white rounded-2xl p-8 shadow-sm">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                    <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
                                        <Shield className="text-accent" size={20} />
                                    </div>
                                    Nos services à l&apos;aéroport
                                </h2>
                                <div className="grid md:grid-cols-2 gap-4">
                                {airport.airportServices.map((service, i) => (
                                        <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-lg p-3">
                                            <Check size={16} className="text-green-500 shrink-0" />
                                            <span className="text-gray-700">{service}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* How it works */}
                            <div className="bg-white rounded-2xl p-8 shadow-sm">
                                <h2 className="text-2xl font-bold text-gray-900 mb-8">
                                    Comment ça marche ?
                                </h2>
                                <div className="grid md:grid-cols-3 gap-8">
                                    {[
                                        { step: "1", title: "Réservez en ligne", desc: "Choisissez votre voiture et vos dates" },
                                        { step: "2", title: "Arrivée aéroport", desc: "Notre équipe vous attend au terminal" },
                                        { step: "3", title: "Partez !", desc: "Signez et prenez la route" },
                                    ].map((item, i) => (
                                        <div key={i} className="text-center">
                                            <div className="w-14 h-14 bg-accent text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg shadow-accent/25">
                                                {item.step}
                                            </div>
                                            <div className="font-bold text-gray-900 mb-2">{item.title}</div>
                                            <div className="text-sm text-gray-600">{item.desc}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Airlines */}
                            <div className="bg-white rounded-2xl p-8 shadow-sm">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                    <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
                                        <Plane className="text-accent" size={20} />
                                    </div>
                                    Compagnies aériennes
                                </h2>
                                <p className="text-gray-600 mb-6">
                                    Nous accueillons les voyageurs de toutes les compagnies :
                                </p>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {airport.flightInfo.map((info, i) => (
                                        <div key={i} className="bg-gray-50 rounded-xl p-4">
                                            <div className="font-bold text-gray-900 mb-1">{info.airline}</div>
                                            <div className="text-sm text-gray-600">
                                                Destinations : {info.destinations.join(", ")}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Sidebar */}
                        <div className="space-y-6">
                            {/* CTA Card */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
                                <div className="text-center mb-6">
                                    <div className="text-sm text-gray-500 mb-1">À partir de</div>
                                    <div className="text-4xl font-black text-gray-900">
                                     <PriceHero amount={toNumber(airport.fromPrice)} />
                                    </div>
                                </div>

                                <div className="space-y-3 mb-6">
                                    {["Accueil au terminal", "Service 24h/24", "Kilométrage illimité", "Sans carte bancaire"].map((item, i) => (
                                        <div key={i} className="flex items-center gap-2 text-gray-600">
                                            <Check size={16} className="text-green-500" />
                                            <span className="text-sm">{item}</span>
                                        </div>
                                    ))}
                                </div>

                                <Link
                                    href="/nos-voitures"
                                    className="block w-full bg-accent hover:bg-accent-dark text-white text-center py-4 rounded-xl font-bold transition-all hover:shadow-lg"
                                >
                                    Voir les voitures
                                </Link>

                                <a
                                    href={telUrl}
                                    className="flex items-center justify-center gap-2 w-full border-2 border-gray-200 text-gray-700 py-3 rounded-xl font-medium mt-3 hover:border-accent hover:text-accent transition-colors"
                                >
                                    <Phone size={16} />
                                    {siteConfig.contact.phone.display}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Cars */}
            <section className="py-16 bg-white">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Voitures disponibles à {airport.name}
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
                                citySlug={airport.city.toLowerCase()}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Nearby Cities */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">
                        Villes desservies depuis {airport.name}
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {allCities.filter(c => airport.nearbyDestinations.some(d => d.name.includes(c.name)) || c.name === airport.city).map((c) => (
                            <Link
                                key={c.slug}
                                href={`/location-voiture-${c.slug}`}
                                className="bg-white rounded-xl p-4 border border-gray-100 hover:border-accent hover:shadow-lg transition-all text-center group"
                            >
                                <div className="font-bold text-gray-900 group-hover:text-accent transition-colors">
                                    {c.name}
                                </div>
                                <div className="text-sm text-accent font-semibold"><CurrencyPrice amount={toNumber(c.fromPrice)} /></div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Other Airports */}
            <section className="py-16 bg-white">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">
                        Autres aéroports en Tunisie
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {allAirports.filter(a => a.slug !== airport.slug).map((a) => (
                            <Link
                                key={a.slug}
                                href={`/aeroport-${a.slug}`}
                                className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md border border-gray-100 hover:border-accent/30 transition-all group"
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <Plane size={18} className="text-accent" />
                                    <span className="font-mono text-sm text-gray-500">{a.code}</span>
                                </div>
                                <div className="font-bold text-gray-900 group-hover:text-accent transition-colors">
                                    {a.name}
                                </div>
                                <div className="text-sm text-gray-500"><CurrencyPrice amount={toNumber(a.fromPrice)} /> / 3 jours</div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
