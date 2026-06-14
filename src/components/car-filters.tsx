'use client';

import { useState, useEffect } from 'react';
import { Filter, X } from 'lucide-react';

const CATEGORIES = [
    { id: 'économique', label: 'Économique' },
    { id: 'compacte', label: 'Compacte' },
    { id: 'berline', label: 'Berline' },
    { id: 'suv', label: 'SUV' },
    { id: 'familiale', label: 'Familiale' },
    { id: 'utilitaire', label: 'Utilitaire' },
];

const PRICE_RANGES = [
    { id: 'budget', label: '< 400 DT', min: 0, max: 399 },
    { id: 'standard', label: '400 - 699 DT', min: 400, max: 699 },
    { id: 'premium', label: '700 - 1099 DT', min: 700, max: 1099 },
    { id: 'luxury', label: '1100 DT +', min: 1100, max: 9999 },
];

const TRANSMISSIONS = [
    { id: 'manuelle', label: 'Manuelle' },
    { id: 'automatique', label: 'Automatique' },
];

const SEATS = [
    { id: 's4', label: '4 places', value: 4 },
    { id: 's5', label: '5 places', value: 5 },
    { id: 's7', label: '7+ places', value: 7 },
];

const selectChevron = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`;

const selectClass =
    'appearance-none bg-gray-50 border border-gray-200 rounded-lg pl-3 pr-7 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-accent/30 focus:border-accent outline-none transition-all cursor-pointer bg-no-repeat bg-[length:12px] bg-[right_8px_center] w-full sm:w-auto';

export interface FilterState {
    category: string;
    priceRange: string;
    transmission: string;
    seats: string;
}

interface CarFiltersProps {
    onFilterChange?: (filters: FilterState) => void;
}

export default function CarFilters({ onFilterChange }: CarFiltersProps) {
    const [category, setCategory] = useState('');
    const [priceRange, setPriceRange] = useState('');
    const [transmission, setTransmission] = useState('');
    const [seats, setSeats] = useState('');

    useEffect(() => {
        if (onFilterChange) {
            onFilterChange({ category, priceRange, transmission, seats });
        }
    }, [category, priceRange, transmission, seats, onFilterChange]);

    const clearFilters = () => {
        setCategory('');
        setPriceRange('');
        setTransmission('');
        setSeats('');
    };

    const activeFiltersCount = [category, priceRange, transmission, seats].filter(Boolean).length;

    return (
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            {/* Label + clear row */}
            <div className="flex items-center justify-between sm:justify-start gap-2 flex-shrink-0">
                <div className="flex items-center gap-1.5">
                    <Filter size={15} className="text-accent" />
                    <span className="text-sm font-semibold text-gray-700">Filtres</span>
                </div>
                {/* Clear — mobile: inline with label | desktop: at end */}
                {activeFiltersCount > 0 && (
                    <button
                        onClick={clearFilters}
                        className="sm:hidden flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-red-500 transition-colors"
                    >
                        <X size={12} />
                        Effacer ({activeFiltersCount})
                    </button>
                )}
            </div>

            {/* Dropdowns — 2x2 grid on mobile, inline on desktop */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className={selectClass}
                    style={{ backgroundImage: selectChevron }}
                >
                    <option value="">Catégorie</option>
                    {CATEGORIES.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.label}</option>
                    ))}
                </select>

                <select
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className={selectClass}
                    style={{ backgroundImage: selectChevron }}
                >
                    <option value="">Budget</option>
                    {PRICE_RANGES.map((range) => (
                        <option key={range.id} value={range.id}>{range.label}</option>
                    ))}
                </select>

                <select
                    value={transmission}
                    onChange={(e) => setTransmission(e.target.value)}
                    className={selectClass}
                    style={{ backgroundImage: selectChevron }}
                >
                    <option value="">Transmission</option>
                    {TRANSMISSIONS.map((trans) => (
                        <option key={trans.id} value={trans.id}>{trans.label}</option>
                    ))}
                </select>

                <select
                    value={seats}
                    onChange={(e) => setSeats(e.target.value)}
                    className={selectClass}
                    style={{ backgroundImage: selectChevron }}
                >
                    <option value="">Places</option>
                    {SEATS.map((s) => (
                        <option key={s.id} value={s.id}>{s.label}</option>
                    ))}
                </select>
            </div>

            {/* Clear — desktop only */}
            {activeFiltersCount > 0 && (
                <button
                    onClick={clearFilters}
                    className="hidden sm:flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-red-500 transition-colors ml-auto flex-shrink-0"
                >
                    <X size={14} />
                    Effacer
                    <span className="bg-accent text-white text-[10px] font-bold w-5 h-5 rounded-full inline-flex items-center justify-center">
                        {activeFiltersCount}
                    </span>
                </button>
            )}
        </div>
    );
}

// Export helper to get price range from filter ID
export function getPriceRange(filterId: string): { min: number; max: number } | null {
    const range = PRICE_RANGES.find(r => r.id === filterId);
    return range ? { min: range.min, max: range.max } : null;
}

// Export helper to get seat value from filter ID
export function getSeatValue(filterId: string): number | null {
    const seat = SEATS.find(s => s.id === filterId);
    return seat ? seat.value : null;
}
