import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getServiceBySlug, getCities, toNumber } from "@/lib/get-site-data";
import { getCars } from "@/lib/data";
import { CarCard } from "@/components/car-card";
import { Check, ChevronRight, Phone, Star, Shield, Clock, CreditCard, HelpCircle, ArrowRight, BadgeCheck, Users, Zap } from "lucide-react";
import { FAQSchema } from "@/components/seo-schemas";
import { siteConfig, telUrl } from "@/lib/site-config";
import { PriceSidebar, CurrencyPrice } from "@/components/currency-price";

interface ServicePageTemplateProps {
    serviceSlug: string;
}

export async function generateServiceMetadata(serviceSlug: string): Promise<Metadata> {
    const service = await getServiceBySlug(serviceSlug);
    if (!service) return { title: "Page non trouvée" };

    return {
        title: service.metaTitle,
        description: service.metaDescription,
        openGraph: {
            title: service.metaTitle,
            description: service.metaDescription,
            images: service.heroImage ? [service.heroImage] : [],
        },
        alternates: {
            canonical: `${siteConfig.url.baseUrl}/location-voiture-${service.slug}`,
        },
    };
}

export default async function ServicePageTemplate({ serviceSlug }: ServicePageTemplateProps) {
    const service = await getServiceBySlug(serviceSlug);
    if (!service) notFound();

    const [cars, allCities] = await Promise.all([
        getCars(),
        getCities(),
    ]);
    const offset = serviceSlug.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) % Math.max(cars.length - 4, 1);
    const featuredCars = cars.slice(offset, offset + 4).length === 4
        ? cars.slice(offset, offset + 4)
        : [...cars.slice(offset), ...cars.slice(0, 4 - (cars.length - offset))];

    const fromPrice = toNumber(service.fromPrice);

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: service.name,
        description: service.description,
        provider: {
            "@type": "AutoRental",
            name: siteConfig.brand.name,
            telephone: siteConfig.contact.phone.display,
        },
        areaServed: {
            "@type": "Country",
            name: "Tunisia",
        },
        offers: {
            "@type": "Offer",
            price: fromPrice,
            priceCurrency: "TND",
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <FAQSchema faqs={service.faqs} />

            {/* Compact Hero */}
            <section className="bg-[#00256f]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 sm:py-6">
                    <nav className="flex items-center gap-1.5 text-xs text-blue-300/70 mb-3">
                        <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
                        <ChevronRight size={12} />
                        <span className="text-white font-medium">{service.shortName}</span>
                    </nav>
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-white leading-tight">
                                {service.name.replace(" Tunisie", "")} <span className="text-on-primary-container">Tunisie</span>
                            </h1>
                            <p className="text-xs sm:text-sm text-blue-200/70 mt-1">
                                Kilométrage illimité &bull; Assurance incluse &bull; Sans carte bancaire
                            </p>
                        </div>
                        <div className="hidden sm:flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2 flex-shrink-0">
                            <span className="text-xs text-blue-200/80">dès</span>
                            <span className="text-lg font-black text-on-primary-container"><CurrencyPrice amount={fromPrice} className="" /></span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Social Proof Bar */}
            <section className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
                    <div className="flex flex-wrap items-center justify-center sm:justify-between gap-3 sm:gap-4 text-sm">
                        <div className="flex items-center gap-2">
                            <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={14} fill="currentColor" />
                                ))}
                            </div>
                            <span className="font-bold text-gray-900">{siteConfig.rating.value}/5</span>
                            <span className="text-gray-500 text-xs">({siteConfig.rating.reviewCount}+ avis)</span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1"><BadgeCheck size={14} className="text-green-500" /> Agence vérifiée</span>
                            <span className="flex items-center gap-1"><Users size={14} className="text-accent" /> +2 000 clients/an</span>
                            <span className="hidden sm:flex items-center gap-1"><Zap size={14} className="text-amber-500" /> Confirmation immédiate</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Cars — Above the fold */}
            <section className="py-8 sm:py-10 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex items-end justify-between mb-5">
                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                                Voitures disponibles — {service.shortName}
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">{service.description}</p>
                        </div>
                        <Link href="/nos-voitures" className="hidden sm:flex items-center gap-1 text-accent font-semibold text-sm hover:underline">
                            Toute la flotte <ArrowRight size={14} />
                        </Link>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
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
                    <div className="sm:hidden mt-4 text-center">
                        <Link href="/nos-voitures" className="inline-flex items-center gap-1.5 text-accent font-semibold text-sm">
                            Voir toute la flotte <ArrowRight size={14} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Banner */}
            <section className="bg-accent">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="text-center sm:text-left">
                            <h2 className="text-lg sm:text-xl font-bold text-white">
                                Réservez maintenant — {service.shortName}
                            </h2>
                            <p className="text-white/80 text-sm mt-1">
                                Sans carte bancaire &bull; Annulation gratuite 24h &bull; Paiement à l&apos;arrivée
                            </p>
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0">
                            <Link
                                href="/nos-voitures"
                                className="bg-white text-accent px-6 py-3 rounded-xl font-bold text-sm hover:bg-gray-50 transition-colors shadow-lg"
                            >
                                Réserver en ligne
                            </Link>
                            <a
                                href={telUrl}
                                className="bg-white/20 text-white px-5 py-3 rounded-xl font-bold text-sm hover:bg-white/30 transition-colors flex items-center gap-2"
                            >
                                <Phone size={16} />
                                Appeler
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content: About + Features + FAQ */}
            <section className="py-8 sm:py-10 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
                        <div className="lg:col-span-2 space-y-6">
                            {/* About */}
                            <div>
                                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                                    {service.name}
                                </h2>
                                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                                    {service.longDescription}
                                </p>
                            </div>

                            {/* Features */}
                            <div className="bg-gray-50 rounded-2xl p-5 sm:p-6">
                                <h3 className="text-base font-bold text-gray-900 mb-3">
                                    Ce qui est inclus
                                </h3>
                                <div className="grid sm:grid-cols-2 gap-2">
                                    {service.features.map((feature, i) => (
                                        <div key={i} className="flex items-center gap-2 text-gray-700 text-sm bg-white rounded-lg px-3 py-2">
                                            <Check size={14} className="text-green-500 flex-shrink-0" />
                                            {feature}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* FAQ */}
                            <div>
                                <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                                    <HelpCircle className="text-accent" size={18} />
                                    Questions fréquentes
                                </h3>
                                <div className="space-y-0 border border-gray-100 rounded-2xl overflow-hidden">
                                    {service.faqs.map((faq, i) => (
                                        <details key={i} className="group border-b border-gray-100 last:border-0 bg-white">
                                            <summary className="cursor-pointer font-medium text-gray-900 text-sm list-none flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors">
                                                {faq.question}
                                                <ChevronRight size={14} className="text-gray-400 group-open:rotate-90 transition-transform flex-shrink-0 ml-4" />
                                            </summary>
                                            <p className="px-5 pb-4 text-gray-600 text-sm leading-relaxed">
                                                {faq.answer}
                                            </p>
                                        </details>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sticky Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-20 space-y-5">
                                {/* Booking Card */}
                                <div className="bg-white rounded-2xl p-5 border-2 border-accent/20 shadow-lg shadow-accent/5">
                                    <div className="text-center mb-4">
                                        <div className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-semibold mb-3">
                                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                            Véhicules disponibles
                                        </div>
                                        <div className="text-xs text-gray-500 mb-1">{service.shortName} dès</div>
                                        <div className="text-3xl font-black text-gray-900">
                                            <PriceSidebar amount={fromPrice} />
                                        </div>
                                        {service.priceNote && (
                                            <div className="text-xs text-accent mt-1 font-medium">{service.priceNote}</div>
                                        )}
                                    </div>
                                    <ul className="space-y-2.5 mb-5">
                                        {service.benefits.map((benefit, i) => (
                                            <li key={i} className="flex items-center gap-2 text-gray-700 text-sm">
                                                <Check size={14} className="text-green-500 flex-shrink-0" />
                                                {benefit}
                                            </li>
                                        ))}
                                    </ul>
                                    <Link
                                        href="/nos-voitures"
                                        className="block w-full bg-accent hover:bg-accent/90 text-white text-center py-3.5 rounded-xl font-bold transition-colors shadow-lg shadow-accent/25"
                                    >
                                        Choisir ma voiture
                                    </Link>
                                    <a
                                        href={telUrl}
                                        className="flex items-center justify-center gap-2 w-full border-2 border-gray-200 text-gray-700 text-center py-3 rounded-xl font-bold text-sm mt-3 hover:border-accent hover:text-accent transition-colors"
                                    >
                                        <Phone size={15} />
                                        {siteConfig.contact.phone.display}
                                    </a>
                                    <p className="text-center text-[10px] text-gray-400 mt-3">
                                        Réponse en moins de 30 minutes
                                    </p>
                                </div>

                                {/* Review Card */}
                                <div className="bg-gray-50 rounded-2xl p-5">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="flex text-yellow-400">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={14} fill="currentColor" />
                                            ))}
                                        </div>
                                        <span className="font-bold text-gray-900 text-sm">{siteConfig.rating.value}/5</span>
                                    </div>
                                    <p className="text-sm text-gray-600 leading-relaxed italic">
                                        &ldquo;Excellent rapport qualité-prix. Réservation simple, livraison ponctuelle, voiture impeccable. Très professionnel.&rdquo;
                                    </p>
                                    <p className="text-xs text-gray-400 mt-2">— Client vérifié, 2025</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Other Cities */}
            <section className="py-8 sm:py-10 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-5">
                        Nos villes de location
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                        {allCities.slice(0, 6).map((city) => (
                            <Link
                                key={city.slug}
                                href={`/location-voiture-${city.slug}`}
                                className="bg-white rounded-xl p-3 border border-gray-100 hover:border-accent hover:shadow-md transition-all text-center group"
                            >
                                <div className="font-bold text-gray-900 text-sm group-hover:text-accent transition-colors">
                                    {city.name}
                                </div>
                                <div className="text-xs text-accent font-semibold"><CurrencyPrice amount={toNumber(city.fromPrice)} /></div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trust Badges — Bottom */}
            <section className="bg-[#00256f]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
                        {[
                            { icon: Clock, title: "Service 24h/24", desc: "Livraison jour et nuit partout en Tunisie" },
                            { icon: Shield, title: "Assurance incluse", desc: "Tous risques disponible à 45 DT/j" },
                            { icon: CreditCard, title: "Sans carte bancaire", desc: "Paiement à l'arrivée en espèces" },
                            { icon: Phone, title: siteConfig.contact.phone.display, desc: "Assistance téléphonique 7j/7" },
                        ].map((item, i) => (
                            <div key={i} className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <item.icon size={20} className="text-on-primary-container" />
                                </div>
                                <div>
                                    <div className="font-bold text-white text-sm">{item.title}</div>
                                    <div className="text-blue-200/60 text-xs mt-0.5">{item.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
