'use client';

import { useCurrency } from '@/context/currency-context';

export function CarCardPrice({ price3Days }: { price3Days: number }) {
    const { convert, symbol } = useCurrency();

    return (
        <p className="font-headline text-2xl md:text-3xl font-black text-[#00256f] leading-none mt-1">
            {convert(price3Days)} <span className="text-sm font-semibold">{symbol}</span>
        </p>
    );
}
