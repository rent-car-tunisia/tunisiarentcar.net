'use client';

import { useCurrency } from '@/context/currency-context';
import { Calendar, Check, Shield } from 'lucide-react';

// Convert a "min-max" TND range string to the user's currency
function useRangeFormat() {
    const { convert, symbol } = useCurrency();
    return (range: string) => {
        const [min, max] = range.split('-').map(Number);
        return `${convert(min)}-${convert(max)} ${symbol}`;
    };
}

interface SeasonalPrice {
    season: string;
    months: string;
    citadine: string;
    compacte: string;
    suv: string;
    luxe: string;
    color: string;
}

interface Option {
    name: string;
    priceTND: number;
}

export function TarifsHeroCard() {
    const { convert, symbol } = useCurrency();
    const categories = [
        { label: 'Citadine', price: 324 },
        { label: 'Compacte', price: 440 },
        { label: 'SUV', price: 710 },
        { label: 'Berline', price: 1014 },
    ];

    return (
        <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="text-center mb-6">
                <div className="text-sm text-gray-500">A partir de</div>
                <div className="text-5xl font-black text-gray-900">
                    {convert(324)} <span className="text-lg font-normal text-gray-500">{symbol} / 3 jours</span>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                {categories.map((cat, i) => (
                    <div key={i} className="bg-gray-50 rounded-lg p-3 text-center">
                        <div className="text-sm text-gray-500">{cat.label}</div>
                        <div className="font-bold text-gray-900">Des {convert(cat.price)} {symbol}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function TarifsSeasonTable({ seasonalPrices, themeGradient }: { seasonalPrices: SeasonalPrice[]; themeGradient: string }) {
    const { symbol } = useCurrency();
    const formatRange = useRangeFormat();

    return (
        <section className="py-16 bg-white">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                    <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
                        <Calendar className="text-accent" size={20} />
                    </div>
                    Tarifs par saison ({symbol} / 3 jours)
                </h2>

                <div className="overflow-x-auto rounded-2xl border border-gray-200">
                    <table className="w-full">
                        <thead>
                            <tr style={{ background: themeGradient }}>
                                <th className="p-5 text-left text-white font-bold">Saison</th>
                                <th className="p-5 text-center text-white font-bold">Citadine</th>
                                <th className="p-5 text-center text-white font-bold">Compacte</th>
                                <th className="p-5 text-center text-white font-bold">SUV</th>
                                <th className="p-5 text-center text-white font-bold">Luxe</th>
                            </tr>
                        </thead>
                        <tbody>
                            {seasonalPrices.map((row, i) => (
                                <tr key={i} className={`border-b border-gray-100 ${row.color}`}>
                                    <td className="p-5">
                                        <div className="font-bold text-gray-900">{row.season}</div>
                                        <div className="text-sm text-gray-500">{row.months}</div>
                                    </td>
                                    <td className="p-5 text-center font-bold text-gray-900">{formatRange(row.citadine)}</td>
                                    <td className="p-5 text-center font-bold text-gray-900">{formatRange(row.compacte)}</td>
                                    <td className="p-5 text-center font-bold text-gray-900">{formatRange(row.suv)}</td>
                                    <td className="p-5 text-center font-bold text-gray-900">{formatRange(row.luxe)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <p className="text-sm text-gray-500 mt-4">
                    * Les prix varient selon le modele exact et la disponibilite. Contactez-nous pour un devis precis.
                </p>
            </div>
        </section>
    );
}

export function TarifsOptionsSection({ options, included }: { options: Option[]; included: string[] }) {
    const { convert, symbol } = useCurrency();

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-6xl mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white rounded-2xl p-8 shadow-sm">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                                <Check className="text-green-600" size={20} />
                            </div>
                            Inclus dans nos tarifs
                        </h2>
                        <ul className="space-y-4">
                            {included.map((item, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                                        <Check size={14} className="text-green-600" />
                                    </div>
                                    <span className="text-gray-700">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-white rounded-2xl p-8 shadow-sm">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                            <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
                                <Shield className="text-accent" size={20} />
                            </div>
                            Options supplementaires
                        </h2>
                        <ul className="space-y-4">
                            {options.map((item, i) => (
                                <li key={i} className="flex justify-between items-center py-2 border-b border-gray-100">
                                    <span className="text-gray-700">{item.name}</span>
                                    <span className="font-bold text-gray-900 bg-gray-50 px-3 py-1 rounded-lg">
                                        {convert(item.priceTND)} {symbol}/j
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
