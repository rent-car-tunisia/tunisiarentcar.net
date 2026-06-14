'use client';

import { useEffect, useRef, useState } from 'react';

interface ServiceItem {
    icon: string;
    title: string;
    desc: string;
}

const DEFAULT_SERVICES: ServiceItem[] = [
    {
        icon: "local_airport",
        title: "Livraison Aéroport",
        desc: "Accueil personnalisé à votre arrivée dans tous les aéroports de Tunisie. Service disponible 24h/24.",
    },
    {
        icon: "credit_card_off",
        title: "Sans Carte Bancaire",
        desc: "Réservez en ligne et payez en espèces à la livraison. Aucun acompte requis.",
    },
    {
        icon: "directions_car",
        title: "Flotte Récente",
        desc: "Des véhicules récents et bien entretenus pour un confort optimal sur toutes les routes.",
    },
    {
        icon: "support_agent",
        title: "Assistance 24/7",
        desc: "Notre équipe est disponible à tout moment pour vous accompagner pendant votre location.",
    },
    {
        icon: "verified_user",
        title: "Assurance Tous Risques",
        desc: "Tous nos véhicules sont couverts par une assurance complète pour votre tranquillité.",
    },
    {
        icon: "hotel",
        title: "Livraison Hôtel",
        desc: "Nous livrons directement à votre hôtel ou riad, partout en Tunisie.",
    },
];

// Map service slugs from DB to Material Symbols icon names
const SERVICE_ICON_MAP: Record<string, string> = {
    'automatique': 'directions_car',
    'luxe': 'diamond',
    'chauffeur': 'person',
    'pas-cher': 'savings',
    'longue-duree': 'calendar_month',
    '7-places': 'groups',
    '9-places': 'airport_shuttle',
    'mariage': 'favorite',
    'utilitaire': 'local_shipping',
    'electrique': 'bolt',
};

export function ServicesScroll() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState(false);
    const [services, setServices] = useState<ServiceItem[]>(DEFAULT_SERVICES);

    // Fetch services from API on mount (via server-side proxy)
    useEffect(() => {
        fetch('/api/services')
            .then(res => res.ok ? res.json() : Promise.reject('Failed'))
            .then((data: Array<{ slug: string; shortName: string; name: string; description: string; isActive: boolean }>) => {
                if (data && data.length > 0) {
                    const mapped = data
                        .filter(s => s.isActive)
                        .slice(0, 6)
                        .map(s => ({
                            icon: SERVICE_ICON_MAP[s.slug] || 'directions_car',
                            title: s.shortName || s.name,
                            desc: s.description,
                        }));
                    if (mapped.length > 0) setServices(mapped);
                }
            })
            .catch(() => { /* keep defaults */ });
    }, []);

    // Duplicate items for seamless infinite loop
    const items = [...services, ...services];

    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;

        let animationId: number;
        let scrollSpeed = 0.6; // px per frame

        const animate = () => {
            if (!isPaused && container) {
                container.scrollLeft += scrollSpeed;

                // When we've scrolled through the first set, jump back seamlessly
                const singleSetWidth = container.scrollWidth / 2;
                if (container.scrollLeft >= singleSetWidth) {
                    container.scrollLeft -= singleSetWidth;
                }
            }
            animationId = requestAnimationFrame(animate);
        };

        animationId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationId);
    }, [isPaused]);

    return (
        <section className="bg-[#f2f4f7] py-24">
            {/* Header */}
            <div className="max-w-screen-2xl mx-auto px-6 md:px-12 mb-12">
                <p className="font-body text-sm font-bold tracking-widest uppercase text-[#00256f] mb-2">
                    Nos Services
                </p>
                <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-[#191c1e]">
                    Tout pour votre confort
                </h2>
            </div>

            {/* Carousel wrapper with fade edges */}
            <div className="relative">
                {/* Left fade */}
                <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-[#f2f4f7] to-transparent z-10 pointer-events-none" />
                {/* Right fade */}
                <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-[#f2f4f7] to-transparent z-10 pointer-events-none" />

                {/* Scrolling container */}
                <div
                    ref={scrollRef}
                    className="flex gap-8 px-6 md:px-12 pb-4 overflow-x-hidden"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    {items.map((service, i) => (
                        <div
                            key={i}
                            className="flex-shrink-0 w-80 bg-white p-8 rounded-xl shadow-sm transition-shadow duration-300 hover:shadow-md"
                        >
                            <span className="material-symbols-outlined text-[#00256f] text-4xl mb-6 block">
                                {service.icon}
                            </span>
                            <h3 className="font-headline text-xl font-bold text-[#191c1e] mb-3">
                                {service.title}
                            </h3>
                            <p className="font-body text-[#444651] text-sm leading-relaxed">
                                {service.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
