import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAirports, getAirportBySlug, getCities, toNumber } from "@/lib/get-site-data";
import { getCars } from "@/lib/data";
import { CarCard } from "@/components/car-card";
import { Plane, Clock, MapPin, Shield, CreditCard, Phone, ChevronRight, Star, Check, Car } from "lucide-react";
import { siteConfig, telUrl } from "@/lib/site-config";
import { CurrencyPrice } from "@/components/currency-price";

interface PageProps {
    params: Promise<{ airport: string }>;
}

// Generate static paths for all airports
export async function generateStaticParams() {
    const airports = await getAirports();
    return airports.map((airport) => ({
        airport: airport.slug,
    }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { airport: slug } = await params;
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

export default async function AirportPage({ params }: PageProps) {
    const { airport: slug } = await params;
    const [airport, allAirports, cars] = await Promise.all([
        getAirportBySlug(slug),
        getAirports(),
        getCars(),
    ]);

    if (!airport) notFound();

    const featuredCars = cars.slice(0, 4);

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

            {/* Hero Section */}
            <section className="relative min-h-[400px] overflow-hidden bg-primary">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-repeat" />
                </div>

                <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
                    <nav className="text-sm text-white/70 mb-6">
                        <Link href="/" className="hover:text-white">Accueil</Link>
                        <span className="mx-2">/</span>
                        <span className="text-white">{airport.name}</span>
                    </nav>

                    <div className="flex items-center gap-3 mb-4">
                        <Plane className="text-accent" size={40} />
                        <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1 text-white font-mono">
                            {airport.code}
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
                        Location Voiture {airport.name}
                    </h1>
                    <p className="text-xl text-white/90 max-w-2xl mb-6">
                        {airport.description}
                    </p>

                    <div className="flex flex-wrap gap-4 mb-8">
                        <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 text-white flex items-center gap-2">
                            <Clock size={18} />
                            <span className="font-bold">Service 24h/24</span>
                        </div>
                        <div className="bg-accent text-white rounded-lg px-4 py-2 font-bold">
                            Dès <CurrencyPrice amount={toNumber(airport.fromPrice)} /> / 3 jours
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 text-white">
                            Sans carte bancaire
                        </div>
                    </div>

                    <Link
                        href="/nos-voitures"
                        className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105"
                    >
                        Réserver maintenant
                        <ChevronRight size={20} />
                    </Link>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-12">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Left Column */}
                        <div className="lg:col-span-2 space-y-10">

                            {/* Nearby Destinations */}
                            <div>
                                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                                    <MapPin className="text-accent" size={24} />
                                    Destinations depuis {airport.name}
                                </h2>
                                <p className="text-muted mb-4">
                                    Distances et temps de trajet depuis l&apos;aéroport :
                                </p>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {airport.nearbyDestinations.map((dest, i) => (
                                        <div key={i} className="card p-4 flex justify-between items-center">
                                            <div>
                                                <div className="font-bold text-foreground">{dest.name}</div>
                                                <div className="text-sm text-muted">{dest.distance}</div>
                                            </div>
                                            <div className="text-accent font-bold">{dest.time}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Services */}
                            <div>
                                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                                    <Shield className="text-accent" size={24} />
                                    Nos services à l&apos;aéroport
                                </h2>
                                <div className="grid md:grid-cols-2 gap-3">
                                    {airport.airportServices.map((service, i) => (
                                        <div key={i} className="flex items-center gap-2 text-foreground">
                                            <Check size={16} className="text-green-500" />
                                            {service}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* How it works */}
                            <div>
                                <h2 className="text-2xl font-bold text-foreground mb-4">
                                    Comment ça marche ?
                                </h2>
                                <div className="grid md:grid-cols-3 gap-6">
                                    {[
                                        { step: "1", title: "Réservez en ligne", desc: "Choisissez votre voiture et vos dates" },
                                        { step: "2", title: "Arrivée aéroport", desc: "Notre équipe vous attend au terminal" },
                                        { step: "3", title: "Partez!", desc: "Signez et prenez la route" },
                                    ].map((item, i) => (
                                        <div key={i} className="text-center">
                                            <div className="w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
                                                {item.step}
                                            </div>
                                            <div className="font-bold text-foreground mb-1">{item.title}</div>
                                            <div className="text-sm text-muted">{item.desc}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Airlines */}
                            <div>
                                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                                    <Plane className="text-accent" size={24} />
                                    Compagnies aériennes
                                </h2>
                                <p className="text-muted mb-4">
                                    Nous accueillons les voyageurs de toutes les compagnies :
                                </p>
                                <div className="space-y-3">
                                    {airport.flightInfo.map((info, i) => (
                                        <div key={i} className="card p-4">
                                            <div className="font-bold text-foreground mb-1">{info.airline}</div>
                                            <div className="text-sm text-muted">
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
                            <div className="card p-6 sticky top-6">
                                <h3 className="text-xl font-bold text-foreground mb-4">
                                    Réserver à {airport.name}
                                </h3>
                                <div className="text-3xl font-black text-accent mb-2">
                                    Dès <CurrencyPrice amount={toNumber(airport.fromPrice)} /><span className="text-lg font-normal text-muted"> / 3 jours</span>
                                </div>
                                <ul className="space-y-2 mb-6 text-sm">
                                    <li className="flex items-center gap-2 text-muted">
                                        <Check size={14} className="text-green-500" />
                                        Accueil au terminal
                                    </li>
                                    <li className="flex items-center gap-2 text-muted">
                                        <Check size={14} className="text-green-500" />
                                        Service 24h/24
                                    </li>
                                    <li className="flex items-center gap-2 text-muted">
                                        <Check size={14} className="text-green-500" />
                                        Kilométrage illimité
                                    </li>
                                    <li className="flex items-center gap-2 text-muted">
                                        <Check size={14} className="text-green-500" />
                                        Sans carte bancaire
                                    </li>
                                </ul>
                                <Link
                                    href="/nos-voitures"
                                    className="block w-full bg-accent hover:bg-accent-dark text-white text-center py-4 rounded-xl font-bold transition-colors"
                                >
                                    Voir les voitures
                                </Link>
                                <a
                                    href={telUrl}
                                    className="block w-full border-2 border-accent text-accent text-center py-3 rounded-xl font-bold mt-3 hover:bg-accent hover:text-white transition-colors"
                                >
                                    <Phone size={16} className="inline mr-2" />
                                    {siteConfig.contact.phone.display}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Cars */}
            <section className="py-12 bg-surface">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-2xl font-bold text-foreground mb-6">
                        Voitures disponibles à {airport.name}
                    </h2>
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

            {/* Other Airports */}
            <section className="py-12">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-2xl font-bold text-foreground mb-6">
                        Autres aéroports en Tunisie
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {allAirports.filter(a => a.slug !== airport.slug).map((a) => (
                            <Link
                                key={a.slug}
                                href={`/aeroport-${a.slug}`}
                                className="card p-4 hover:border-accent transition-colors group"
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <Plane size={18} className="text-accent" />
                                    <span className="font-mono text-sm text-muted">{a.code}</span>
                                </div>
                                <div className="font-bold text-foreground group-hover:text-accent transition-colors">
                                    {a.name}
                                </div>
                                <div className="text-sm text-muted">Dès <CurrencyPrice amount={toNumber(a.fromPrice)} /> / 3 jours</div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
