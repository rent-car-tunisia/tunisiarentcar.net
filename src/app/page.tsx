import { getCars, Car } from "@/lib/data";
import { siteConfig } from "@/lib/site-config";
import { CarCard } from "@/components/car-card";
import { HeroSection } from "@/components/hero-section";
import { FloatingSearch } from "@/components/floating-search";
import { TrustBadges } from "@/components/trust-badges";
import { PromoBanner } from "@/components/promo-banner";
import { ServicesScroll } from "@/components/services-scroll";
import { GoogleReviews } from "@/components/google-reviews";
import { LocalBusinessSchema, WebsiteSchema, FAQSchema } from "@/components/seo-schemas";
import { getFaqs } from "@/lib/get-site-data";
import Link from "next/link";

export default async function Home() {
    const [cars, faqs] = await Promise.all([getCars(), getFaqs()]);
    const featuredCars = cars.slice(0, 6);
    const displayFaqs = faqs.slice(0, 8);

    return (
        <div className="flex flex-col">
            {/* 1. Hero Section */}
            <HeroSection />

            {/* 2. Floating Booking Widget */}
            <FloatingSearch />




            {/* 4. Featured Cars — 3-column grid */}
            <section className="bg-[#f7f9fc] py-24 px-4 md:px-12">
                <div className="max-w-screen-2xl mx-auto">
                    {/* Section header */}
                    <div className="flex items-end justify-between mb-12">
                        <div>
                            <p className="font-body text-sm font-bold tracking-widest uppercase text-[#00256f] mb-2">
                                {siteConfig.content.home.fleetLabel}
                            </p>
                            <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-[#191c1e]">
                                {siteConfig.content.home.fleetTitle}
                            </h2>
                        </div>
                        <Link
                            href="/nos-voitures"
                            className="hidden md:flex items-center gap-2 text-[#00256f] font-bold text-sm hover:gap-4 transition-all duration-300"
                        >
                            {siteConfig.content.home.viewAll}
                            <span className="material-symbols-outlined text-lg">arrow_forward</span>
                        </Link>
                    </div>

                    {/* 3-column car grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featuredCars.map((car: Car) => (
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

                    {/* Mobile "Voir tout" link */}
                    <div className="text-center mt-10 md:hidden">
                        <Link
                            href="/nos-voitures"
                            className="inline-flex items-center gap-2 text-[#00256f] font-bold"
                        >
                            {siteConfig.content.home.viewAllMobile}
                            <span className="material-symbols-outlined text-lg">arrow_forward</span>
                        </Link>
                    </div>
                </div>
            </section>
            {/* 3. Trust Badges */}
            <TrustBadges />
            {/* 5. Promotion Banner */}
            <PromoBanner />

            {/* 6. Services Horizontal Scroll */}
            <ServicesScroll />

            {/* 7. Google Reviews */}
            <GoogleReviews />

            {/* 8. FAQ Section */}
            <section className="bg-white py-20 px-4 md:px-12">
                <div className="max-w-screen-lg mx-auto">
                    <div className="text-center mb-12">
                        <p className="font-body text-sm font-bold tracking-widest uppercase text-[#00256f] mb-2">
                            {siteConfig.content.home.faqLabel}
                        </p>
                        <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-[#191c1e]">
                            {siteConfig.content.home.faqTitle}
                        </h2>
                    </div>
                    <div className="space-y-4">
                        {displayFaqs.map((faq, i) => (
                            <details key={i} className="group bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
                                <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-gray-100 transition-colors">
                                    <span className="font-bold text-gray-900 text-left pr-4">{faq.question}</span>
                                    <span className="material-symbols-outlined text-[#00256f] transition-transform group-open:rotate-180 shrink-0">
                                        expand_more
                                    </span>
                                </summary>
                                <div className="px-5 pb-5 text-gray-600 leading-relaxed">
                                    {faq.answer}
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* JSON-LD Structured Data */}
            <LocalBusinessSchema />
            <WebsiteSchema />
            <FAQSchema faqs={displayFaqs} />
        </div>
    );
}
