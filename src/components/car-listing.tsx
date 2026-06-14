'use client';

import { useState, useEffect } from 'react';
import CarFilters, { FilterState } from './car-filters';
import CarGrid from './car-grid';
import { useBookingStore } from '@/store/useBookingStore';
import { DatePicker } from './date-picker';
import { TimePicker } from './time-picker';

interface CarData {
    id: string;
    title: string;
    slug: string;
    price: string;
    price3Days?: number;
    currency?: string;
    featured_image: string;
    excerpt?: string;
    category?: string;
    subtitle?: string;
    seats?: string;
    doors?: string;
    transmission?: string;
    fuel?: string;
    caution?: string;
    freeCancellation?: boolean;
}

interface CarListingProps {
    cars: CarData[];
}

export default function CarListing({ cars }: CarListingProps) {
    const booking = useBookingStore();
    const [filters, setFilters] = useState<FilterState>({
        category: '',
        priceRange: '',
        transmission: '',
        seats: '',
    });

    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);

    const hasBookingData = isClient && booking.pickupDate && booking.returnDate;

    const getDuration = () => {
        if (!booking.pickupDate || !booking.returnDate) return 0;
        const pickup = new Date(booking.pickupDate);
        const returnD = new Date(booking.returnDate);
        const diff = Math.abs(returnD.getTime() - pickup.getTime());
        return Math.ceil(diff / (1000 * 60 * 60 * 24)) || 1;
    };

    return (
        <div className="space-y-4">
            {/* Combined Search Bar + Filters */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-visible px-3 sm:px-4">
                {/* Date/Time Row */}
                {hasBookingData && (
                    <div className="py-3">
                        {/* Mobile: 2 rows (pickup row + return row) | Desktop: single row */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                            {/* Pickup */}
                            <div className="flex items-center gap-2 min-w-0">
                                <div className="min-w-0">
                                    <span className="text-[10px] text-gray-400 uppercase tracking-wider block mb-0.5">Départ</span>
                                    <DatePicker
                                        value={booking.pickupDate}
                                        onChange={(date) => booking.setPickupDate(date)}
                                        minDate={new Date()}
                                    />
                                </div>
                                <div className="h-7 w-px bg-gray-200 flex-shrink-0" />
                                <div className="min-w-0">
                                    <span className="text-[10px] text-gray-400 uppercase tracking-wider block mb-0.5">Heure</span>
                                    <TimePicker
                                        value={booking.pickupTime}
                                        onChange={(time) => booking.setPickupTime(time)}
                                    />
                                </div>

                                {/* Duration badge — mobile only, right side of pickup row */}
                                <div className="sm:hidden ml-auto flex-shrink-0">
                                    <div className="bg-accent/10 rounded-lg px-2.5 py-1 flex items-center gap-1">
                                        <span className="text-base font-black text-accent">{getDuration()}</span>
                                        <span className="text-[10px] text-gray-500">j</span>
                                    </div>
                                </div>
                            </div>

                            {/* Vertical separator — desktop only */}
                            <div className="hidden sm:block h-8 w-px bg-gray-200 flex-shrink-0" />

                            {/* Return */}
                            <div className="flex items-center gap-2 min-w-0">
                                <div className="min-w-0">
                                    <span className="text-[10px] text-gray-400 uppercase tracking-wider block mb-0.5">Retour</span>
                                    <DatePicker
                                        value={booking.returnDate}
                                        onChange={(date) => booking.setReturnDate(date)}
                                        minDate={booking.pickupDate ? new Date(booking.pickupDate) : new Date()}
                                    />
                                </div>
                                <div className="h-7 w-px bg-gray-200 flex-shrink-0" />
                                <div className="min-w-0">
                                    <span className="text-[10px] text-gray-400 uppercase tracking-wider block mb-0.5">Heure</span>
                                    <TimePicker
                                        value={booking.returnTime}
                                        onChange={(time) => booking.setReturnTime(time)}
                                    />
                                </div>
                            </div>

                            {/* Duration badge — desktop only, right-aligned */}
                            <div className="hidden sm:flex ml-auto flex-shrink-0">
                                <div className="bg-accent/10 rounded-lg px-3 py-1.5 flex items-center gap-1">
                                    <span className="text-lg font-black text-accent">{getDuration()}</span>
                                    <span className="text-xs text-gray-600">jours</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Divider — negative margins to span full width edge-to-edge */}
                {hasBookingData && <div className="-mx-3 sm:-mx-4 border-t border-gray-100" />}

                {/* Filters Row */}
                <div className="py-2.5">
                    <CarFilters onFilterChange={setFilters} />
                </div>
            </div>

            {/* Car Grid */}
            <CarGrid cars={cars} filters={filters} />
        </div>
    );
}
