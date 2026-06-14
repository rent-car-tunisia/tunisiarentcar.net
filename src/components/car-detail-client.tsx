"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    ShieldCheck, Fuel, Users, Car as CarIcon, Check, ChevronRight,
    Calendar, Clock, Phone, Star, MessageCircle,
    CreditCard, Plane, CheckCircle, BadgeCheck, Zap
} from "lucide-react";
import { useBookingStore } from "@/store/useBookingStore";
import { DatePicker } from "./date-picker";
import { TimePicker } from "./time-picker";
import { siteConfig, telUrl, whatsappUrl } from "@/lib/site-config";
import { useCurrency } from "@/context/currency-context";

interface Car {
    id: string;
    title: string;
    slug: string;
    description: string;
    excerpt: string;
    price: string;
    featured_image: string;
    seats?: string;
    transmission?: string;
    fuel?: string;
}

interface OptionItem {
    name: string;
    price: number;
    id: string;
}

interface ReviewItem {
    text: string;
    author: string;
    city: string;
}

interface CityItem {
    slug: string;
    name: string;
}

interface CarDetailClientProps {
    car: Car;
    city: string;
    citySlug: string;
    includedFeatures: string[];
    options: OptionItem[];
    reviews: ReviewItem[];
    cityDescription: string;
    allCities: CityItem[];
}

export function CarDetailClient({ car, city, citySlug, includedFeatures, options, reviews, cityDescription, allCities }: CarDetailClientProps) {
    const router = useRouter();
    const booking = useBookingStore();
    const { convert, symbol } = useCurrency();

    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        if (!booking.pickupDate || !booking.returnDate) {
            const today = new Date();
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            const nextWeek = new Date(today);
            nextWeek.setDate(nextWeek.getDate() + 7);

            booking.setPickupDate(tomorrow.toISOString().split('T')[0]);
            booking.setReturnDate(nextWeek.toISOString().split('T')[0]);
        }
        booking.setPickupLocation(`${city}, Tunisie`);
    }, []);

    const calculateDays = () => {
        if (!booking.pickupDate || !booking.returnDate) return 1;
        const start = new Date(booking.pickupDate);
        const end = new Date(booking.returnDate);
        const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
        return diff > 0 ? diff : 1;
    };

    const days = calculateDays();
    const pricePerDay = parseInt(car.price) || 0;
    const priceFor3Days = pricePerDay * 3;
    const basePrice = pricePerDay * days;
    const optionsPrice = selectedOptions.reduce((acc, optId) => {
        const opt = options.find(o => o.id === optId);
        return acc + (opt ? opt.price * days : 0);
    }, 0);
    const totalPrice = basePrice + optionsPrice;

    const toggleOption = (optId: string) => {
        setSelectedOptions(prev =>
            prev.includes(optId)
                ? prev.filter(id => id !== optId)
                : [...prev, optId]
        );
    };

    const handleReservation = () => {
        booking.setPickupLocation(`${city}, Tunisie`);
        booking.setSelectedCar({
            id: car.id,
            title: car.title,
            slug: car.slug,
            price: pricePerDay,
            image: car.featured_image,
        });
        router.push("/checkout");
    };

    return (
        <>
            {/* Compact Hero */}
            <section className="bg-[#00256f]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 sm:py-6">
                    <nav className="flex items-center gap-1.5 text-xs text-blue-300/70 mb-3 flex-wrap">
                        <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
                        <ChevronRight size={12} />
                        <Link href="/nos-voitures" className="hover:text-white transition-colors">Nos Voitures</Link>
                        <ChevronRight size={12} />
                        <Link href={`/location-voiture-${citySlug}`} className="hover:text-white transition-colors">{city}</Link>
                        <ChevronRight size={12} />
                        <span className="text-white font-medium">{car.title}</span>
                    </nav>
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-white leading-tight">
                                Location {car.title} <span className="text-on-primary-container">à {city}</span>
                            </h1>
                            <p className="text-xs sm:text-sm text-blue-200/70 mt-1">
                                {car.seats || '5'} places &bull; {car.transmission || 'Manuelle'} &bull; {car.fuel || 'Essence'} &bull; Kilométrage illimité
                            </p>
                        </div>
                        <div className="hidden sm:flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2 flex-shrink-0">
                            <span className="text-lg font-black text-on-primary-container">{convert(pricePerDay)} {symbol}</span>
                            <span className="text-xs text-blue-200/80">/jour</span>
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

            {/* Main Content: Image+Details left, Booking card right */}
            <section className="py-8 sm:py-10 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
                        {/* Left Column */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Car Image + Specs Card */}
                            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                                <div className="bg-gradient-to-b from-gray-50 to-white p-6 sm:p-8 flex items-center justify-center relative">
                                    <Image
                                        src={car.featured_image || "/car-placeholder.png"}
                                        alt={car.title}
                                        width={500}
                                        height={300}
                                        className="object-contain max-h-[260px]"
                                        priority
                                    />
                                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg whitespace-nowrap">
                                        <CheckCircle size={13} />
                                        Disponible maintenant
                                    </div>
                                </div>
                                <div className="p-4 sm:p-5 border-t border-gray-100">
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                        {[
                                            { icon: Users, label: `${car.seats || '5'} places` },
                                            { icon: CarIcon, label: car.transmission || 'Manuelle' },
                                            { icon: Fuel, label: car.fuel || 'Essence' },
                                            { icon: ShieldCheck, label: "Assuré" },
                                        ].map((spec, i) => (
                                            <div key={i} className="flex items-center gap-2 bg-gray-50 px-3 py-2.5 rounded-lg">
                                                <spec.icon size={16} className="text-accent flex-shrink-0" />
                                                <span className="text-gray-700 text-sm font-medium">{spec.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* What's Included */}
                            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100">
                                <h2 className="text-lg font-bold text-gray-900 mb-3">
                                    Ce qui est inclus
                                </h2>
                                <div className="grid sm:grid-cols-2 gap-2">
                                    {includedFeatures.map((item, i) => (
                                        <div key={i} className="flex items-center gap-2.5 bg-green-50/50 rounded-lg px-3 py-2">
                                            <Check size={14} className="text-green-500 flex-shrink-0" />
                                            <span className="text-gray-700 text-sm">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Options */}
                            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100">
                                <h2 className="text-lg font-bold text-gray-900 mb-3">
                                    Options supplémentaires
                                </h2>
                                <div className="space-y-2.5">
                                    {options.map((option) => (
                                        <button
                                            key={option.id}
                                            onClick={() => toggleOption(option.id)}
                                            className={`w-full flex items-center justify-between p-3 sm:p-3.5 rounded-xl border-2 transition-all ${selectedOptions.includes(option.id)
                                                    ? 'border-accent bg-accent/5'
                                                    : 'border-gray-100 hover:border-gray-200'
                                                }`}
                                        >
                                            <span className="font-medium text-gray-900 text-sm">{option.name}</span>
                                            <div className="flex items-center gap-2.5">
                                                <span className="text-accent font-bold text-sm">+{convert(option.price)} {symbol}/j</span>
                                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedOptions.includes(option.id)
                                                        ? 'bg-accent border-accent'
                                                        : 'border-gray-300'
                                                    }`}>
                                                    {selectedOptions.includes(option.id) && (
                                                        <Check size={12} className="text-white" />
                                                    )}
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Seasonal Pricing */}
                            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100">
                                <h2 className="text-lg font-bold text-gray-900 mb-3">
                                    Tarifs saisonniers — {car.title} (3 jours)
                                </h2>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                    {[
                                        { month: "Jan-Fév", price: priceFor3Days },
                                        { month: "Mars-Avril", price: Math.round(priceFor3Days * 1.1) },
                                        { month: "Mai", price: Math.round(priceFor3Days * 1.15) },
                                        { month: "Juin", price: Math.round(priceFor3Days * 1.4) },
                                        { month: "Juil-Août", price: Math.round(priceFor3Days * 1.8), hot: true },
                                        { month: "Sept-Oct", price: Math.round(priceFor3Days * 1.15) },
                                        { month: "Nov-Déc", price: priceFor3Days },
                                    ].map((item, i) => (
                                        <div
                                            key={i}
                                            className={`p-3 rounded-xl text-center ${item.hot
                                                    ? 'bg-accent/10 border-2 border-accent'
                                                    : 'bg-gray-50'
                                                }`}
                                        >
                                            <div className="text-xs text-gray-500 mb-1">{item.month}</div>
                                            <div className="font-bold text-gray-900 text-sm">{convert(item.price)} {symbol}<span className="text-[10px] font-normal"> / 3j</span></div>
                                            {item.hot && <div className="text-[10px] text-accent font-medium mt-0.5">Haute saison</div>}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* SEO Content */}
                            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100">
                                <h2 className="text-lg font-bold text-gray-900 mb-3">
                                    Location {car.title} à {city}
                                </h2>
                                <div className="prose prose-sm prose-gray max-w-none">
                                    <p className="text-gray-600 leading-relaxed">
                                        Louez une {car.title} à {city}, {cityDescription || "Tunisie"}.
                                        Avec {siteConfig.brand.name}, votre agence de location de voitures de confiance
                                        en Tunisie depuis {siteConfig.brand.foundingYear}, vous bénéficiez d&apos;un véhicule
                                        {car.transmission?.toLowerCase() === 'automatique' ? " automatique" : " à boîte manuelle"} confortable
                                        avec {car.seats || '5'} places, idéal pour explorer la région.
                                    </p>
                                    <p className="text-gray-600 leading-relaxed mt-3">
                                        La {car.title} est l&apos;un de nos véhicules les plus demandés à {city}. Motorisation {car.fuel?.toLowerCase() || 'essence'},
                                        climatisation, et équipements complets pour un trajet agréable. Profitez de la livraison gratuite
                                        à l&apos;aéroport de {city} et dans tous les hôtels de la région — disponible 24 heures sur 24.
                                    </p>
                                    <p className="text-gray-600 leading-relaxed mt-3">
                                        Notre service de location sans carte bancaire vous permet de réserver en toute simplicité.
                                        Payez à l&apos;arrivée en espèces ou par carte. Annulation gratuite jusqu&apos;à 24h avant le départ.
                                        Tous nos tarifs incluent le kilométrage illimité et l&apos;assurance de base (responsabilité civile + CDW).
                                    </p>
                                </div>
                            </div>

                            {/* Why rent this car */}
                            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100">
                                <h2 className="text-lg font-bold text-gray-900 mb-3">
                                    Pourquoi louer une {car.title} ?
                                </h2>
                                <div className="grid sm:grid-cols-2 gap-2">
                                    {[
                                        `${car.seats || '5'} places confortables`,
                                        `Transmission ${car.transmission?.toLowerCase() || 'manuelle'}`,
                                        `Moteur ${car.fuel?.toLowerCase() || 'essence'} économique`,
                                        "Climatisation incluse",
                                        "Kilométrage illimité",
                                        "Assurance tous risques disponible",
                                        "Livraison aéroport gratuite",
                                        "Annulation gratuite 24h",
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-2.5 bg-gray-50 rounded-lg px-3 py-2">
                                            <Check size={14} className="text-green-500 flex-shrink-0" />
                                            <span className="text-gray-700 text-sm">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column — Sticky Booking Card + Contact */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-20 space-y-5">
                                {/* Booking / Pricing Card */}
                                <div className="bg-white rounded-2xl p-5 border-2 border-accent/20 shadow-lg shadow-accent/5">
                                    {/* Availability badge */}
                                    <div className="flex justify-center mb-3">
                                        <div className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                            Disponible — Réservez maintenant
                                        </div>
                                    </div>

                                    {/* Price Header */}
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <span className="text-2xl sm:text-3xl font-black text-gray-900">{convert(priceFor3Days)} {symbol}</span>
                                            <span className="text-gray-500 text-xs block">Prix pour 3 jours</span>
                                        </div>
                                        <div className="bg-accent text-white rounded-lg px-2.5 py-1.5 flex items-center gap-1.5">
                                            <Calendar size={13} />
                                            <span className="font-bold text-sm">{days} jour{days > 1 ? 's' : ''}</span>
                                        </div>
                                    </div>

                                    {/* Date & Time Pickers */}
                                    {isClient && (
                                        <div className="grid grid-cols-2 gap-2.5 mb-4">
                                            <div className="bg-gray-50 rounded-xl p-2.5">
                                                <span className="text-[10px] text-gray-400 uppercase tracking-wider block mb-1.5">Départ</span>
                                                <div className="bg-white rounded-lg border border-gray-200 px-2 py-1.5 mb-1.5">
                                                    <DatePicker
                                                        value={booking.pickupDate}
                                                        onChange={(date) => booking.setPickupDate(date)}
                                                        minDate={new Date()}
                                                    />
                                                </div>
                                                <div className="bg-white rounded-lg border border-gray-200 px-2 py-1.5">
                                                    <TimePicker
                                                        value={booking.pickupTime}
                                                        onChange={(time) => booking.setPickupTime(time)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="bg-gray-50 rounded-xl p-2.5">
                                                <span className="text-[10px] text-gray-400 uppercase tracking-wider block mb-1.5">Retour</span>
                                                <div className="bg-white rounded-lg border border-gray-200 px-2 py-1.5 mb-1.5">
                                                    <DatePicker
                                                        value={booking.returnDate}
                                                        onChange={(date) => booking.setReturnDate(date)}
                                                        minDate={booking.pickupDate ? new Date(booking.pickupDate) : new Date()}
                                                    />
                                                </div>
                                                <div className="bg-white rounded-lg border border-gray-200 px-2 py-1.5">
                                                    <TimePicker
                                                        value={booking.returnTime}
                                                        onChange={(time) => booking.setReturnTime(time)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Pricing Breakdown */}
                                    <div className="bg-gray-50 rounded-xl p-3 mb-4">
                                        <div className="flex justify-between text-sm mb-1.5">
                                            <span className="text-gray-600">{convert(pricePerDay)} {symbol} x {days} jour{days > 1 ? 's' : ''}</span>
                                            <span className="font-semibold">{convert(basePrice)} {symbol}</span>
                                        </div>
                                        {optionsPrice > 0 && (
                                            <div className="flex justify-between text-sm mb-1.5">
                                                <span className="text-gray-600">Options</span>
                                                <span className="font-semibold">+{convert(optionsPrice)} {symbol}</span>
                                            </div>
                                        )}
                                        <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between">
                                            <span className="font-bold text-gray-900 text-sm">Total</span>
                                            <span className="font-black text-lg text-accent">{convert(totalPrice)} {symbol}</span>
                                        </div>
                                    </div>

                                    {/* Reserve Button */}
                                    <button
                                        onClick={handleReservation}
                                        className="w-full bg-accent hover:bg-accent/90 text-white py-3.5 rounded-xl font-bold text-base transition-colors shadow-lg shadow-accent/25"
                                    >
                                        Réserver maintenant
                                    </button>

                                    {/* Trust Indicators */}
                                    <div className="flex items-center justify-center gap-3 mt-3 text-[10px] sm:text-xs text-gray-500">
                                        <span className="flex items-center gap-1">
                                            <CreditCard size={12} />
                                            Sans carte bancaire
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <CheckCircle size={12} />
                                            Annulation gratuite
                                        </span>
                                    </div>
                                    <p className="text-center text-[10px] text-gray-400 mt-2">
                                        Réponse en moins de 30 minutes
                                    </p>
                                </div>

                                {/* Quick Contact */}
                                <div className="bg-white rounded-2xl p-5 border border-gray-100">
                                    <h3 className="font-bold text-gray-900 text-sm mb-3">Besoin d&apos;aide ?</h3>
                                    <div className="space-y-2.5">
                                        <a
                                            href={telUrl}
                                            className="flex items-center gap-2.5 w-full bg-accent hover:bg-accent/90 text-white px-4 py-2.5 rounded-xl font-bold text-sm transition-colors"
                                        >
                                            <Phone size={16} />
                                            {siteConfig.contact.phone.display}
                                        </a>
                                        <a
                                            href={whatsappUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2.5 w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2.5 rounded-xl font-bold text-sm transition-colors"
                                        >
                                            <MessageCircle size={16} />
                                            WhatsApp
                                        </a>
                                    </div>
                                </div>

                                {/* Review */}
                                <div className="bg-gray-50 rounded-2xl p-5">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="flex text-yellow-400">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={14} fill="currentColor" />
                                            ))}
                                        </div>
                                        <span className="font-bold text-gray-900 text-sm">{siteConfig.rating.value}/5</span>
                                    </div>
                                    {(() => {
                                        const reviewIndex = reviews.length > 0 ? (car.title.length + citySlug.length) % reviews.length : 0;
                                        const review = reviews[reviewIndex];
                                        if (!review) return null;
                                        return (
                                            <>
                                                <p className="text-sm text-gray-600 leading-relaxed italic">
                                                    &ldquo;{review.text}&rdquo;
                                                </p>
                                                <p className="text-xs text-gray-400 mt-2">— {review.author}, {review.city}</p>
                                            </>
                                        );
                                    })()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Other Cities */}
            <section className="py-8 sm:py-10 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">
                        Également disponible à
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                        {allCities.filter(c => c.slug !== citySlug).map((c) => (
                            <Link
                                key={c.slug}
                                href={`/rental/${c.slug}/${car.slug}`}
                                className="bg-gray-50 hover:bg-accent hover:text-white text-gray-900 p-3 rounded-xl text-center font-semibold text-sm transition-colors"
                            >
                                {c.name}
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
                            { icon: Clock, title: "Service 24h/24", desc: "Livraison jour et nuit à " + city },
                            { icon: Plane, title: "Livraison aéroport", desc: "Gratuite dans toute la Tunisie" },
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
