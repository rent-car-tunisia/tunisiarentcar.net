import { getCars, Car } from "@/lib/data";
import { siteConfig } from "@/lib/site-config";
import { CarCard } from "@/components/car-card";
import { HeroSection } from "@/components/hero-section";
import { FloatingSearch } from "@/components/floating-search";
import { GoogleReviews } from "@/components/google-reviews";
import { LocalBusinessSchema, WebsiteSchema, FAQSchema } from "@/components/seo-schemas";
import { getFaqs } from "@/lib/get-site-data";
import Link from "next/link";

const DESTINATIONS = [
    { name: "Tunis", slug: "tunis", tag: "Capital" },
    { name: "Djerba", slug: "djerba", tag: "Island" },
    { name: "Hammamet", slug: "hammamet", tag: "Beach" },
    { name: "Sousse", slug: "sousse", tag: "Coastal" },
    { name: "Monastir", slug: "monastir", tag: "Airport" },
    { name: "Sfax", slug: "sfax", tag: "City" },
];

const GUARANTEES = [
    { icon: "price_check", title: "Best Price", desc: "We match any lower price you find." },
    { icon: "speed", title: "Fast Booking", desc: "Confirmed in under 5 minutes via WhatsApp." },
    { icon: "no_crash", title: "Clean Cars", desc: "All vehicles cleaned and inspected before delivery." },
    { icon: "support_agent", title: "24/7 Support", desc: "Our team answers calls and messages day and night." },
];

export default async function Home() {
    const [cars, faqs] = await Promise.all([getCars(), getFaqs()]);
    const featuredCars = cars.slice(0, 6);
    const displayFaqs = faqs.slice(0, 8);

    return (
        <div className="flex flex-col">
            <HeroSection />
            <FloatingSearch />

            {/* Popular Destinations */}
            <section className="bg-white py-20 px-4 md:px-12">
                <div className="max-w-screen-xl mx-auto">
                    <div className="flex items-end justify-between mb-10">
                        <div>
                            <p className="font-body text-sm font-bold tracking-widest uppercase mb-2" style={{ color: 'var(--site-primary)' }}>Where to go</p>
                            <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-gray-900">Popular destinations</h2>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                        {DESTINATIONS.map((d, i) => (
                            <Link
                                key={d.slug}
                                href={`/location-voiture-${d.slug}`}
                                className="group relative rounded-2xl overflow-hidden aspect-square flex flex-col items-center justify-center text-white text-center p-4 hover:scale-105 transition-transform duration-300 shadow-md"
                                style={{ backgroundColor: `color-mix(in srgb, var(--site-primary) ${100 - i * 8}%, #042f2e)` }}
                            >
                                <span className="font-headline font-extrabold text-xl">{d.name}</span>
                                <span className="font-body text-xs opacity-80 mt-1 px-2 py-0.5 rounded-full bg-white/20">{d.tag}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Fleet */}
            <section style={{ backgroundColor: 'color-mix(in srgb, var(--site-primary) 5%, white)' }} className="py-24 px-4 md:px-12">
                <div className="max-w-screen-2xl mx-auto">
                    <div className="flex items-end justify-between mb-12">
                        <div>
                            <p className="font-body text-sm font-bold tracking-widest uppercase mb-2" style={{ color: 'var(--site-primary)' }}>
                                {siteConfig.content.home.fleetLabel}
                            </p>
                            <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-gray-900">
                                {siteConfig.content.home.fleetTitle}
                            </h2>
                        </div>
                        <Link href="/nos-voitures" className="hidden md:flex items-center gap-2 font-bold text-sm hover:gap-4 transition-all duration-300" style={{ color: 'var(--site-primary)' }}>
                            {siteConfig.content.home.viewAll}
                            <span className="material-symbols-outlined text-lg">arrow_forward</span>
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featuredCars.map((car: Car) => (
                            <CarCard key={car.id} id={car.id} title={car.title} slug={car.slug} subtitle={car.subtitle} price3Days={car.price3Days} currency={car.currency} image={car.featured_image} category={car.category} seats={car.seats} doors={car.doors} transmission={car.transmission} fuel={car.fuel} caution={car.caution} freeCancellation={car.freeCancellation} />
                        ))}
                    </div>
                    <div className="text-center mt-10 md:hidden">
                        <Link href="/nos-voitures" className="inline-flex items-center gap-2 font-bold" style={{ color: 'var(--site-primary)' }}>
                            {siteConfig.content.home.viewAllMobile}
                            <span className="material-symbols-outlined text-lg">arrow_forward</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Price Banner */}
            <section className="bg-gray-900 py-16 px-4 text-center">
                <div className="max-w-screen-md mx-auto text-white">
                    <p className="font-body text-sm tracking-widest uppercase opacity-60 mb-3">{siteConfig.content.promo.badge}</p>
                    <h2 className="font-headline text-4xl md:text-5xl font-extrabold mb-2">
                        {siteConfig.pricing.priceRange3DaysEur}
                    </h2>
                    <p className="opacity-60 font-body text-sm mb-6">for 3 days · unlimited mileage · full insurance</p>
                    <p className="font-body text-base opacity-80 mb-8">{siteConfig.content.promo.subtitle}</p>
                    <div className="flex items-center justify-center gap-4 flex-wrap">
                        <Link href="/nos-voitures" className="px-8 py-4 rounded-full font-bold text-white shadow-lg hover:scale-105 transition-transform" style={{ backgroundColor: 'var(--site-primary)' }}>
                            {siteConfig.content.promo.cta}
                        </Link>
                        <a href={`tel:${siteConfig.contact.phone.link}`} className="px-8 py-4 rounded-full font-bold border border-white/40 text-white hover:border-white transition-colors">
                            {siteConfig.contact.phone.display}
                        </a>
                    </div>
                </div>
            </section>

            {/* 4 Guarantees */}
            <section className="bg-white py-20 px-4 md:px-12">
                <div className="max-w-screen-xl mx-auto">
                    <div className="text-center mb-12">
                        <p className="font-body text-sm font-bold tracking-widest uppercase mb-2" style={{ color: 'var(--site-primary)' }}>Why choose us</p>
                        <h2 className="font-headline text-3xl font-extrabold text-gray-900">Our guarantees</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {GUARANTEES.map((g) => (
                            <div key={g.title} className="flex flex-col items-center text-center p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow">
                                <div className="w-16 h-16 rounded-2xl mb-4 flex items-center justify-center" style={{ backgroundColor: 'color-mix(in srgb, var(--site-primary) 10%, white)' }}>
                                    <span className="material-symbols-outlined text-3xl" style={{ color: 'var(--site-primary)' }}>{g.icon}</span>
                                </div>
                                <h3 className="font-headline font-bold text-gray-900 mb-2">{g.title}</h3>
                                <p className="font-body text-sm text-gray-500">{g.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <GoogleReviews />

            {/* FAQ — left-border style */}
            <section className="bg-gray-50 py-20 px-4 md:px-12">
                <div className="max-w-screen-lg mx-auto">
                    <div className="text-center mb-12">
                        <p className="font-body text-sm font-bold tracking-widest uppercase mb-2" style={{ color: 'var(--site-primary)' }}>
                            {siteConfig.content.home.faqLabel}
                        </p>
                        <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-gray-900">
                            {siteConfig.content.home.faqTitle}
                        </h2>
                    </div>
                    <div className="space-y-3">
                        {displayFaqs.map((faq, i) => (
                            <details key={i} className="group bg-white rounded-xl overflow-hidden shadow-sm" style={{ borderLeft: '4px solid var(--site-primary)' }}>
                                <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-gray-50 transition-colors">
                                    <span className="font-bold text-gray-900 text-left pr-4">{faq.question}</span>
                                    <span className="material-symbols-outlined transition-transform group-open:rotate-180 shrink-0" style={{ color: 'var(--site-primary)' }}>expand_more</span>
                                </summary>
                                <div className="px-5 pb-5 text-gray-600 leading-relaxed font-body text-sm">{faq.answer}</div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            <LocalBusinessSchema />
            <WebsiteSchema />
            <FAQSchema faqs={displayFaqs} />
        </div>
    );
}
