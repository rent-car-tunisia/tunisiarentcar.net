'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    Car,
    Plane,
    MapPin,
    Search,
    ChevronDown,
    Star,
    Shield,
    CreditCard
} from 'lucide-react';
import { DatePicker } from './date-picker';
import { TimePicker } from './time-picker';
import { useBookingStore } from '@/store/useBookingStore';
import { siteConfig } from '@/lib/site-config';

const LOCATIONS = [
    'Tunis, Tunisie',
    'Aéroport Tunis-Carthage',
    'Aéroport Enfidha',
    'Hammamet',
    'Sousse',
    'Monastir',
    'Djerba',
];

interface HeroKayakProps {
    lowestPrice: number;
}

export function HeroKayak({ lowestPrice }: HeroKayakProps) {
    const router = useRouter();
    const setBookingDates = useBookingStore((s) => s.setBookingDates);

    const [location, setLocation] = useState<string>(siteConfig.booking.defaultLocation);
    const [showLocationDropdown, setShowLocationDropdown] = useState(false);
    const [isClient, setIsClient] = useState(false);

    // Initialize dates only on client to avoid hydration mismatch
    const [pickupDate, setPickupDate] = useState('');
    const [pickupTime, setPickupTime] = useState('10:00');
    const [returnDate, setReturnDate] = useState('');
    const [returnTime, setReturnTime] = useState('10:00');

    // Set dates on client only
    useEffect(() => {
        setIsClient(true);
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const nextWeek = new Date(today);
        nextWeek.setDate(nextWeek.getDate() + 8);

        const formatDate = (d: Date) =>
            `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

        setPickupDate(formatDate(tomorrow));
        setReturnDate(formatDate(nextWeek));
    }, []);

    const handleSearch = () => {
        // Save to booking store (persisted in localStorage)
        setBookingDates({
            location,
            pickupDate,
            pickupTime,
            returnDate,
            returnTime,
        });
        // Navigate with clean URL
        router.push('/nos-voitures');
    };

    // Format date for display
    const formatDisplayDate = (dateStr: string) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
        return date.toLocaleDateString('fr-FR', options);
    };

    return (
        <section className="pt-8 pb-12 md:pt-12 md:pb-16 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                    {/* Left Content */}
                    <div>
                        {/* Headline */}
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight mb-3 md:mb-4">
                            Location de voitures<br />
                            en <span className="text-accent">Tunisie</span>.
                        </h1>

                        <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 max-w-lg">
                            Réservez facilement et payez à l'arrivée. Sans carte bancaire.
                        </p>

                        {/* Search Form - Clean KAYAK Style */}
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-visible">
                            {/* Tabs + Options */}
                            <div className="flex items-center gap-2 sm:gap-4 px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-100 bg-gray-50/50 rounded-t-2xl flex-wrap">
                                {/* Service Tabs */}
                                <div className="flex items-center gap-1">
                                    <button className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-accent text-white text-xs sm:text-sm font-medium">
                                        <Car size={14} />
                                        Voitures
                                    </button>
                                    <button className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors text-xs sm:text-sm">
                                        <Plane size={14} />
                                        Aéroport
                                    </button>
                                </div>

                                {/* Divider */}
                                <div className="h-5 w-px bg-gray-300 hidden md:block" />

                                {/* Options - hidden on very small screens */}
                                <label className="hidden sm:flex items-center gap-2 cursor-pointer text-xs sm:text-sm text-gray-600">
                                    <input type="checkbox" defaultChecked className="w-3.5 h-3.5 accent-accent rounded" />
                                    <span>Même lieu</span>
                                </label>

                                <div className="hidden md:flex items-center gap-1 text-sm text-gray-500">
                                    <span>Âge:</span>
                                    <span className="font-medium text-gray-700">25-65 ans</span>
                                    <ChevronDown size={12} />
                                </div>
                            </div>

                            {/* Main Search Row */}
                            <div className="p-3 sm:p-4 overflow-visible">
                                {/* Location Dropdown */}
                                <div className="relative mb-3 sm:mb-4">
                                    <button
                                        onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                                        className="w-full flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl border border-gray-200 hover:border-accent/50 transition-colors text-left"
                                    >
                                        <MapPin size={20} className="text-accent flex-shrink-0" />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs text-gray-500 uppercase tracking-wide">Lieu de prise en charge</p>
                                            <p className="font-semibold text-gray-900 truncate">{location}</p>
                                        </div>
                                        <ChevronDown size={18} className="text-gray-400" />
                                    </button>

                                    {showLocationDropdown && (
                                        <div className="absolute top-full left-0 right-0 bg-white shadow-xl rounded-xl border mt-2 z-50 max-h-60 overflow-y-auto hide-scrollbar">
                                            {LOCATIONS.map((loc) => (
                                                <button
                                                    key={loc}
                                                    onClick={() => {
                                                        setLocation(loc);
                                                        setShowLocationDropdown(false);
                                                    }}
                                                    className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-center gap-3"
                                                >
                                                    <MapPin size={16} className="text-gray-400" />
                                                    <span className="text-sm">{loc}</span>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Date/Time Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4 overflow-visible">
                                    {/* Pickup */}
                                    <div className="form-field">
                                        <span className="form-field-label text-xs">Départ</span>
                                        <div className="flex items-center gap-2">
                                            <div className="flex-1 min-w-0">
                                                <DatePicker
                                                    value={pickupDate}
                                                    onChange={setPickupDate}
                                                    minDate={new Date()}
                                                />
                                            </div>
                                            <span className="text-gray-300">|</span>
                                            <TimePicker
                                                value={pickupTime}
                                                onChange={setPickupTime}
                                            />
                                        </div>
                                    </div>

                                    {/* Return */}
                                    <div className="form-field">
                                        <span className="form-field-label text-xs">Retour</span>
                                        <div className="flex items-center gap-2">
                                            <div className="flex-1 min-w-0">
                                                <DatePicker
                                                    value={returnDate}
                                                    onChange={setReturnDate}
                                                    minDate={pickupDate ? new Date(pickupDate) : new Date()}
                                                />
                                            </div>
                                            <span className="text-gray-300">|</span>
                                            <TimePicker
                                                value={returnTime}
                                                onChange={setReturnTime}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Search Button */}
                                <button
                                    onClick={handleSearch}
                                    className="w-full bg-accent hover:bg-accent/90 text-white py-4 rounded-xl transition-colors shadow-lg font-bold text-lg flex items-center justify-center gap-2"
                                >
                                    <Search size={20} />
                                    Rechercher
                                </button>
                            </div>
                        </div>

                        {/* Trust Indicators */}
                        <div className="flex flex-wrap items-center gap-3 sm:gap-6 mt-4 sm:mt-6 text-xs sm:text-sm text-gray-600">
                            <a
                                href={siteConfig.url.googleReview}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 sm:gap-2 hover:opacity-80 transition-opacity"
                            >
                                <img src="/images/google-logo.png" alt="Google" className="h-4 w-4 sm:h-5 sm:w-5" />
                                <div className="flex text-yellow-400">
                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={12} fill="currentColor" />)}
                                </div>
                                <span className="font-medium">{siteConfig.rating.value}/5</span>
                            </a>
                            <div className="flex items-center gap-1.5 sm:gap-2">
                                <CreditCard size={14} className="text-accent" />
                                <span>Sans carte</span>
                            </div>
                            <div className="flex items-center gap-1.5 sm:gap-2">
                                <Shield size={14} className="text-accent" />
                                <span>Assurance</span>
                            </div>
                        </div>
                    </div>

                    {/* Right - Image Collage */}
                    <div className="hidden lg:block relative pt-8">
                        <div className="grid grid-cols-2 gap-4">
                            {/* Image 1 - Large */}
                            <div className="row-span-2 rounded-2xl overflow-hidden shadow-xl h-[400px]">
                                <img
                                    src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=500&fit=crop&q=80"
                                    alt="Conduire en Tunisie"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Image 2 */}
                            <div className="rounded-2xl overflow-hidden shadow-xl h-[190px]">
                                <img
                                    src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=200&fit=crop&q=80"
                                    alt="Plage en Tunisie"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Image 3 */}
                            <div className="rounded-2xl overflow-hidden shadow-xl h-[190px]">
                                <img
                                    src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=300&h=200&fit=crop&q=80"
                                    alt="Road trip en Tunisie"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        {/* Price Badge */}
                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-accent text-white px-8 py-4 rounded-2xl shadow-xl">
                            <p className="text-sm opacity-80 text-center">À partir de</p>
                            <p className="text-3xl font-black text-center">{lowestPrice} {siteConfig.pricing.currencyDisplay}<span className="text-base font-normal"> / 3 jours</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
