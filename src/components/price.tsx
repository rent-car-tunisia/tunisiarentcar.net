'use client';

import { useCurrency } from '@/context/currency-context';

interface PriceProps {
    /** Amount in TND (base currency) */
    amount: number;
    /** Show "/ 3 jours" suffix */
    per3Days?: boolean;
    /** Show "/j" suffix */
    perDay?: boolean;
    /** Custom suffix text */
    suffix?: string;
    /** Additional CSS classes for the wrapper */
    className?: string;
}

/**
 * Displays a price in the user's selected currency (TND or EUR).
 * Always pass the TND amount — conversion is handled automatically.
 */
export function Price({ amount, per3Days, perDay, suffix, className }: PriceProps) {
    const { format } = useCurrency();

    const formatted = format(amount);
    let suffixText = '';
    if (per3Days) suffixText = ' / 3 jours';
    else if (perDay) suffixText = '/j';
    else if (suffix) suffixText = suffix;

    return <span className={className}>{formatted}{suffixText}</span>;
}

/**
 * Server-safe price display — shows TND only (no toggle support).
 * Use this in server components where CurrencyContext isn't available.
 */
export function PriceStatic({ amount, per3Days, perDay, suffix, className }: PriceProps) {
    let suffixText = '';
    if (per3Days) suffixText = ' / 3 jours';
    else if (perDay) suffixText = '/j';
    else if (suffix) suffixText = suffix;

    return <span className={className}>{amount} DT{suffixText}</span>;
}
