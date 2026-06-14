'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FilterState, getPriceRange, getSeatValue } from './car-filters';
import { useBookingStore } from '@/store/useBookingStore';
import { CarCardPrice } from './car-card-price';

interface CarData {
    id: string;
    title: string;
    model?: string;
    subtitle?: string;
    slug: string;
    price: string;
    price3Days?: number;
    currency?: string;
    featured_image: string;
    category?: string;
    seats?: string;
    doors?: string;
    transmission?: string;
    fuel?: string;
    caution?: string;
    freeCancellation?: boolean;
}

interface CarGridProps {
    cars: CarData[];
    filters?: FilterState;
}

export default function CarGrid({ cars, filters }: CarGridProps) {
    const router = useRouter();
    const setSelectedCar = useBookingStore((s) => s.setSelectedCar);

    const filteredCars = useMemo(() => {
        let result = [...cars];

        if (filters) {
            if (filters.priceRange) {
                const range = getPriceRange(filters.priceRange);
                if (range) {
                    result = result.filter(car => {
                        const price = parseInt(car.price) || 0;
                        return price >= range.min && price <= range.max;
                    });
                }
            }

            if (filters.category) {
                result = result.filter(car => {
                    const carCategory = (car.category || '').toLowerCase();
                    return carCategory === filters.category;
                });
            }

            if (filters.transmission) {
                result = result.filter(car => {
                    const carTransmission = (car.transmission || '').toLowerCase();
                    return carTransmission === filters.transmission;
                });
            }

            if (filters.seats) {
                const seatValue = getSeatValue(filters.seats);
                if (seatValue !== null) {
                    result = result.filter(car => {
                        const carSeats = parseInt(car.seats || '5') || 5;
                        // For 7+ filter, match 7 or more seats
                        if (seatValue >= 7) return carSeats >= 7;
                        return carSeats === seatValue;
                    });
                }
            }
        }

        return result;
    }, [cars, filters]);

    const handleBookNow = (car: CarData) => {
        setSelectedCar({
            id: car.id,
            title: car.title,
            slug: car.slug,
             price: parseInt(car.price) || 324,
            image: car.featured_image || '',
        });
        router.push('/checkout');
    };

    if (filteredCars.length === 0) {
        return (
            <div className="text-center py-16">
                <div className="w-20 h-20 mx-auto mb-6 bg-[#f2f4f7] rounded-xl flex items-center justify-center">
                    <span className="material-symbols-outlined text-4xl text-[#444651]">directions_car</span>
                </div>
                <h3 className="font-headline text-xl font-bold text-[#191c1e] mb-2">Aucun véhicule trouvé</h3>
                <p className="text-[#444651] mb-6">Essayez de modifier vos critères de recherche</p>
                <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-3 bg-gradient-to-r from-[#00256f] to-[#1a3c8f] text-white rounded-lg font-bold hover:scale-[0.98] transition-transform"
                >
                    Réinitialiser les filtres
                </button>
            </div>
        );
    }

    return (
        <>
            {/* Results Count */}
            <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-[#444651]">
                    <span className="font-bold text-[#191c1e]">{filteredCars.length}</span> véhicule{filteredCars.length > 1 ? 's' : ''}
                </p>
                <select className="px-4 py-2.5 bg-white border border-[#e0e3e6] rounded-lg text-sm font-medium focus:ring-2 focus:ring-[#00256f] focus:border-[#00256f] outline-none transition-all">
                    <option>Prix croissant</option>
                    <option>Prix décroissant</option>
                    <option>Plus récents</option>
                </select>
            </div>

            {/* 3-column Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCars.map((car) => {
                    const price3Days = car.price3Days || parseInt(car.price) || 0;

                    const subtitle = car.subtitle || 'ou similaire';
                    const seats = car.seats || '5';
                    const doors = car.doors || '5 portes';
                    const transmission = car.transmission || 'Manuelle';
                    const fuel = car.fuel || 'Essence';
                    const freeCancellation = car.freeCancellation !== false;

                    return (
                        <div
                            key={car.id}
                            className="group bg-white rounded-xl overflow-hidden border border-[#e0e3e6]/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-400"
                        >
                            {/* Image */}
                            <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#f2f4f7]">
                                {car.featured_image ? (
                                    <Image
                                        src={car.featured_image}
                                        alt={car.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <span className="material-symbols-outlined text-5xl text-[#c4c6d3]">directions_car</span>
                                    </div>
                                )}
                                {car.category && (
                                    <span className="absolute top-4 left-4 bg-[#00256f] px-3 py-1.5 text-white font-bold text-[11px] uppercase tracking-wider rounded-md">
                                        {car.category}
                                    </span>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                {/* Title */}
                                <div className="mb-3">
                                    <h3 className="font-headline text-lg font-bold text-[#191c1e] leading-tight">
                                        {car.title}
                                    </h3>
                                    <p className="text-xs text-[#444651] mt-0.5">{subtitle}</p>
                                </div>

                                {/* Specs */}
                                <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 mb-4 text-[12px] text-[#444651]">
                                    <div className="flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-sm text-[#00256f]">airline_seat_recline_normal</span>
                                        {seats} places
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-sm text-[#00256f]">sensor_door</span>
                                        {doors}
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-sm text-[#00256f]">settings</span>
                                        {transmission}
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-sm text-[#00256f]">local_gas_station</span>
                                        {fuel}
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="border-t border-[#e0e3e6]/60 pt-4">
                                    {/* Price */}
                                    <div className="flex items-end justify-between mb-4">
                                        <div>
                                            <p className="text-[11px] text-[#444651] uppercase tracking-wide font-medium">
                                                Prix pour 3 jours
                                            </p>
                                            <CarCardPrice price3Days={price3Days} />
                                        </div>
                                        {freeCancellation && (
                                            <div className="flex items-center gap-1 text-emerald-600">
                                                <span className="material-symbols-outlined text-sm">check_circle</span>
                                                <span className="text-[10px] font-semibold">Annulation gratuite</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* CTA */}
                                    <button
                                        onClick={() => handleBookNow(car)}
                                        className="block w-full py-3 bg-[#00256f] text-white font-bold rounded-lg text-center text-sm uppercase tracking-wider hover:bg-[#1a3c8f] transition-colors duration-300"
                                    >
                                        Voir l&apos;offre
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
