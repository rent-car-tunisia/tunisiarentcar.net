'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export type CurrencyCode = 'TND' | 'EUR';

interface CurrencyContextType {
    currency: CurrencyCode;
    toggleCurrency: () => void;
    setCurrency: (c: CurrencyCode) => void;
    convert: (amountTND: number) => number;
    format: (amountTND: number) => string;
    symbol: string;
}

const EXCHANGE_RATE_TND_TO_EUR = 1 / 3.3; // 1 EUR = 3.3 TND

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
    const [currency, setCurrency] = useState<CurrencyCode>('TND');

    const toggleCurrency = useCallback(() => {
        setCurrency(prev => prev === 'TND' ? 'EUR' : 'TND');
    }, []);

    const convert = useCallback((amountTND: number): number => {
        if (currency === 'EUR') {
            return Math.round(amountTND * EXCHANGE_RATE_TND_TO_EUR);
        }
        return amountTND;
    }, [currency]);

    const symbol = currency === 'EUR' ? '\u20AC' : 'DT';

    const format = useCallback((amountTND: number): string => {
        const converted = currency === 'EUR'
            ? Math.round(amountTND * EXCHANGE_RATE_TND_TO_EUR)
            : amountTND;
        return `${converted} ${currency === 'EUR' ? '\u20AC' : 'DT'}`;
    }, [currency]);

    return (
        <CurrencyContext.Provider value={{ currency, toggleCurrency, setCurrency, convert, format, symbol }}>
            {children}
        </CurrencyContext.Provider>
    );
}

export function useCurrency() {
    const ctx = useContext(CurrencyContext);
    if (!ctx) {
        throw new Error('useCurrency must be used within a CurrencyProvider');
    }
    return ctx;
}
