'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useBookingStore } from '@/store/useBookingStore';
import { DatePicker } from './date-picker';
import { TimePicker } from './time-picker';
import { siteConfig } from '@/lib/site-config';

const LOCATIONS = [
    'Tunis, Tunisie',
    'Aeroport Tunis-Carthage',
    'Aeroport Enfidha',
    'Hammamet',
    'Sousse',
    'Monastir',
    'Djerba',
];

export function FloatingSearch() {
    const router = useRouter();
    const setBookingDates = useBookingStore((s) => s.setBookingDates);

    const [location, setLocation] = useState<string>(siteConfig.booking.defaultLocation);
    const [showLocationDropdown, setShowLocationDropdown] = useState(false);

    const [pickupDate, setPickupDate] = useState('');
    const [pickupTime, setPickupTime] = useState('10:00');
    const [returnDate, setReturnDate] = useState('');
    const [returnTime, setReturnTime] = useState('10:00');

    useEffect(() => {
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
        setBookingDates({
            location,
            pickupDate,
            pickupTime,
            returnDate,
            returnTime,
        });
        router.push('/nos-voitures');
    };

    return (
        <div className="max-w-6xl mx-auto px-4 md:px-6 -mt-24 relative z-20">
            <div className="bg-white p-5 md:p-10 rounded-xl shadow-2xl border border-[#c4c6d3]/15">
                {/* Form Grid: 4 columns on desktop */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-5 md:gap-8">
                    {/* Location */}
                    <div className="relative">
                        <label className="label">Lieu de prise en charge</label>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-0 bottom-2 text-[#00256f] text-xl">
                                location_on
                            </span>
                            <button
                                onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                                className="w-full text-left py-2 pl-7 bg-transparent border-b-2 border-[#e0e3e6] focus:border-[#00256f] font-semibold text-[#191c1e] text-sm transition-colors"
                            >
                                {location}
                            </button>
                            {showLocationDropdown && (
                                <div className="absolute top-full left-0 right-0 bg-white shadow-xl rounded-lg border mt-2 z-50 max-h-60 overflow-y-auto hide-scrollbar">
                                    {LOCATIONS.map((loc) => (
                                        <button
                                            key={loc}
                                            onClick={() => {
                                                setLocation(loc);
                                                setShowLocationDropdown(false);
                                            }}
                                            className="w-full text-left px-4 py-3 hover:bg-[#f2f4f7] transition-colors flex items-center gap-3 text-sm"
                                        >
                                            <span className="material-symbols-outlined text-[#444651] text-lg">location_on</span>
                                            {loc}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Pickup Date */}
                    <div>
                        <label className="label">Date de depart</label>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-0 bottom-2 text-[#00256f] text-xl">
                                calendar_today
                            </span>
                            <div className="py-2 pl-7 border-b-2 border-[#e0e3e6] focus-within:border-[#00256f] transition-colors">
                                <DatePicker
                                    value={pickupDate}
                                    onChange={setPickupDate}
                                    minDate={new Date()}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Return Date */}
                    <div>
                        <label className="label">Date de retour</label>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-0 bottom-2 text-[#00256f] text-xl">
                                calendar_today
                            </span>
                            <div className="py-2 pl-7 border-b-2 border-[#e0e3e6] focus-within:border-[#00256f] transition-colors">
                                <DatePicker
                                    value={returnDate}
                                    onChange={setReturnDate}
                                    minDate={pickupDate ? new Date(pickupDate) : new Date()}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Search Button */}
                    <div className="flex items-end">
                        <button
                            onClick={handleSearch}
                            className="w-full bg-gradient-to-r from-[#00256f] to-[#1a3c8f] text-white font-bold py-4 rounded-lg shadow-lg shadow-[#00256f]/20 hover:scale-[0.98] transition-transform flex items-center justify-center gap-2 uppercase tracking-wider text-sm"
                        >
                            <span className="material-symbols-outlined text-xl">search</span>
                            Rechercher
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
