'use client';

import { useCurrency } from '@/context/currency-context';

/** Inline price text — replaces "{amount} DT" anywhere */
export function CurrencyPrice({ amount, className }: { amount: number; className?: string }) {
    const { convert, symbol } = useCurrency();
    return <span className={className}>{convert(amount)} {symbol}</span>;
}

/** "Dès {amount} DT / 3 jours" badge */
export function PriceBadge({ amount, className }: { amount: number; className?: string }) {
    const { convert, symbol } = useCurrency();
    return <span className={className}>Dès {convert(amount)} {symbol} / 3 jours</span>;
}

/** Large price display: "{amount} DT / 3 jours" */
export function PriceHero({ amount, label }: { amount: number; label?: string }) {
    const { convert, symbol } = useCurrency();
    return (
        <>
            {convert(amount)} <span className="text-lg font-normal text-gray-500">{symbol} / {label || '3 jours'}</span>
        </>
    );
}

/** Sidebar price: "Dès {amount} DT / 3 jours" */
export function PriceSidebar({ amount }: { amount: number }) {
    const { convert, symbol } = useCurrency();
    return (
        <>
            Dès {convert(amount)} {symbol}<span className="text-lg font-normal text-gray-500"> / 3 jours</span>
        </>
    );
}
