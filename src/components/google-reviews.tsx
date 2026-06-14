'use client';

import { useEffect, useRef, useState } from 'react';
import { siteConfig } from '@/lib/site-config';

const REVIEWS = [
    {
        name: "Sophie M.",
        location: "Paris, France",
        rating: 5,
        date: "il y a 2 semaines",
        text: "Excellent service ! Voiture impeccable livrée directement à l'aéroport de Tunis-Carthage. Personnel très professionnel et accueillant. Je recommande vivement !",
    },
    {
        name: "Thomas B.",
        location: "Lyon, France",
        rating: 5,
        date: "il y a 1 mois",
        text: "Très bon rapport qualité/prix. Prise en charge rapide à l'hôtel à Hammamet. La voiture était propre et récente. Parfait pour mon séjour en famille.",
    },
    {
        name: "Fatma K.",
        location: "Tunis, Tunisie",
        rating: 5,
        date: "il y a 3 semaines",
        text: "Service irréprochable. Voiture propre et en parfait état. La livraison à l'hôtel est très pratique. Prix honnêtes et sans mauvaises surprises.",
    },
    {
        name: "Jean-Pierre L.",
        location: "Bruxelles, Belgique",
        rating: 5,
        date: "il y a 2 mois",
        text: "Réservation simple et rapide, sans besoin de carte bancaire. Personnel très agréable. La voiture était disponible à l'heure convenue. Je reviendrai !",
    },
    {
        name: "Yasmine B.",
        location: "Sousse, Tunisie",
        rating: 5,
        date: "il y a 5 jours",
        text: "Je loue ici depuis plusieurs années, toujours satisfaite ! Prix imbattables, voitures récentes et bien entretenues. Le meilleur service de location en Tunisie.",
    },
    {
        name: "Marc D.",
        location: "Marseille, France",
        rating: 5,
        date: "il y a 1 mois",
        text: "Super expérience à Djerba ! Voiture livrée à l'aéroport à l'heure pile. Tarifs transparents, pas de frais cachés. Je recommande à 100%.",
    },
];

function StarIcon() {
    return (
        <svg className="w-4 h-4 text-[#FBBC04]" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
    );
}

function GoogleLogo({ size = 20 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
    );
}

function GoogleVerified() {
    return (
        <span className="inline-flex items-center gap-1 text-[11px] text-gray-400">
            <GoogleLogo size={12} />
            <svg className="w-3 h-3 text-[#4285F4]" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Avis vérifié
        </span>
    );
}

export function GoogleReviews() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState(false);

    const rating = siteConfig.rating.value;
    const reviewCount = siteConfig.rating.reviewCount;

    // Duplicate for seamless loop
    const items = [...REVIEWS, ...REVIEWS];

    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;

        let animationId: number;
        const scrollSpeed = 0.5;

        const animate = () => {
            if (!isPaused && container) {
                container.scrollLeft += scrollSpeed;
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
        <section className="bg-white py-24">
            {/* Header */}
            <div className="max-w-screen-2xl mx-auto px-6 md:px-12 mb-12">
                <p className="font-body text-sm font-bold tracking-widest uppercase text-[#00256f] mb-2">
                    Avis Clients
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                    <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-[#191c1e]">
                        Ce que disent nos clients
                    </h2>

                    {/* Google Rating Badge */}
                    <div className="inline-flex items-center gap-4 bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 shadow-sm shrink-0">
                        <GoogleLogo size={28} />
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="font-headline text-2xl font-extrabold text-[#191c1e]">{rating}</span>
                                <div className="flex items-center gap-0.5">
                                    {[1, 2, 3, 4, 5].map((i) => <StarIcon key={i} />)}
                                </div>
                            </div>
                            <p className="text-xs text-gray-500 mt-0.5">
                                <span className="font-semibold text-gray-700">{reviewCount}+</span> avis Google
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Carousel */}
            <div className="relative">
                {/* Left fade */}
                <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                {/* Right fade */}
                <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                {/* Scrolling container */}
                <div
                    ref={scrollRef}
                    className="flex gap-6 px-6 md:px-12 pb-4 overflow-x-hidden"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    {items.map((review, i) => (
                        <div
                            key={i}
                            className="flex-shrink-0 w-80 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col gap-4"
                        >
                            {/* Top: name + Google logo */}
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="font-semibold text-[#191c1e] text-sm">{review.name}</p>
                                    <p className="text-xs text-gray-400">{review.location}</p>
                                </div>
                                <GoogleLogo size={18} />
                            </div>

                            {/* Stars + date */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-0.5">
                                    {[1, 2, 3, 4, 5].map((j) => <StarIcon key={j} />)}
                                </div>
                                <span className="text-xs text-gray-400">{review.date}</span>
                            </div>

                            {/* Text */}
                            <p className="text-sm text-gray-600 leading-relaxed flex-1">
                                &ldquo;{review.text}&rdquo;
                            </p>

                            {/* Verified badge */}
                            <div className="pt-2 border-t border-gray-50">
                                <GoogleVerified />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
