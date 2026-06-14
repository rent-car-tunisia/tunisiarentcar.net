'use client';

import { useCurrency } from '@/context/currency-context';

export function CurrencyToggle() {
    const { currency, toggleCurrency } = useCurrency();

    return (
        <button
            onClick={toggleCurrency}
            className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 rounded-full px-3 py-1.5 text-xs font-bold transition-colors"
            aria-label="Changer la devise"
            title={currency === 'TND' ? 'Afficher les prix en Euro' : 'Afficher les prix en Dinar Tunisien'}
        >
            <span className={currency === 'TND' ? 'text-blue-900' : 'text-gray-400'}>DT</span>
            <span className="text-gray-300">/</span>
            <span className={currency === 'EUR' ? 'text-blue-900' : 'text-gray-400'}>€</span>
        </button>
    );
}
