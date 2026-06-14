import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function PromoBanner() {
    return (
        <section className="bg-[#f7f9fc] py-24 px-6 md:px-12">
            <div className="max-w-screen-2xl mx-auto">
                <div className="rounded-2xl overflow-hidden flex flex-col md:flex-row items-center" style={{ backgroundColor: 'var(--site-primary)' }}>
                    {/* Left half — text */}
                    <div className="w-full md:w-1/2 p-12 md:p-20">
                        {/* Badge pill */}
                        <span className="inline-block bg-white/20 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase text-white mb-8">
                            {siteConfig.content.promo.badge}
                        </span>

                        <h2 className="font-headline text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                            {siteConfig.content.promo.h2}
                        </h2>

                        <p className="font-body text-lg mb-10 opacity-90" style={{ color: 'var(--site-icon-tint)' }}>
                            {siteConfig.content.promo.subtitle}
                        </p>

                        <div className="flex flex-wrap items-center gap-8">
                            {/* Price */}
                            <div className="text-white">
                                <p className="text-xs uppercase tracking-widest opacity-60 mb-1">
                                    {siteConfig.content.promo.priceLabel}
                                </p>
                                <p className="font-body text-4xl font-black">
                                    {siteConfig.pricing.minPrice3Days}{" "}
                                    <span className="text-lg font-semibold">
                                        {siteConfig.pricing.currencyDisplay} {siteConfig.content.promo.priceSuffix}
                                    </span>
                                </p>
                            </div>
                            {/* CTA */}
                            <Link
                                href="/nos-voitures"
                                className="bg-white px-8 py-4 rounded-lg font-bold transition-colors"
                                style={{ color: 'var(--site-primary)' }}
                                onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--site-icon-tint)';
                                    (e.currentTarget as HTMLElement).style.color = 'white';
                                }}
                                onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLElement).style.backgroundColor = 'white';
                                    (e.currentTarget as HTMLElement).style.color = 'var(--site-primary)';
                                }}
                            >
                                {siteConfig.content.promo.cta}
                            </Link>
                        </div>
                    </div>

                    {/* Right half — image */}
                    <div className="w-full md:w-1/2 h-[300px] md:h-[400px] relative ">
                        <img
                            src="/images/Promo-banner.jpg"
                            alt={siteConfig.content.hero.h1}
                            className="w-full h-full object-cover rounded-l-lg"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
