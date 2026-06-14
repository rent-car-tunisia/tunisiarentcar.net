'use client';

import Image from "next/image";
import Link from "next/link";
import { CarCardPrice } from "./car-card-price";
import { siteConfig } from "@/lib/site-config";

interface CarCardProps {
    id: string;
    title: string;
    slug: string;
    subtitle?: string;
    price3Days: number;
    currency?: string;
    image: string;
    category?: string;
    seats?: string;
    doors?: string;
    transmission?: string;
    fuel?: string;
    caution?: string;
    freeCancellation?: boolean;
    citySlug?: string;
}

export function CarCard({
    id,
    title,
    slug,
    subtitle = "ou similaire",
    price3Days,
    currency = "TND",
    image,
    category,
    seats = "5",
    doors = "5 portes",
    transmission = "Manuelle",
    fuel = "Essence",
    caution,
    freeCancellation = true,
    citySlug = "tunis",
}: CarCardProps) {
    const isOutlined = (siteConfig.theme.cardVariant as string) === "outlined";

    return (
        <div className={`group bg-white rounded-xl overflow-hidden flex flex-col h-full transition-all duration-300 ${
            isOutlined
                ? "border-2 border-[#e0e3e6] hover:shadow-md"
                : "border border-[#e0e3e6]/60 hover:shadow-xl hover:-translate-y-1"
        }`}
        style={isOutlined ? { '--hover-border': 'var(--site-primary)' } as React.CSSProperties : undefined}
        onMouseEnter={isOutlined ? (e) => (e.currentTarget.style.borderColor = 'var(--site-primary)') : undefined}
        onMouseLeave={isOutlined ? (e) => (e.currentTarget.style.borderColor = '#e0e3e6') : undefined}
        >
            {/* Image */}
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#f2f4f7]">
                <Image
                    src={image || "/car-placeholder.png"}
                    alt={title}
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {category && (
                    <span
                        className="absolute top-4 left-4 px-3 py-1.5 text-white font-bold text-[11px] uppercase tracking-wider rounded-md"
                        style={{ backgroundColor: 'var(--site-primary)' }}
                    >
                        {category}
                    </span>
                )}
            </div>

            {/* Body */}
            <div className="p-5 md:p-6 flex flex-col flex-1">
                <div className="mb-4">
                    <h3 className="font-headline text-lg md:text-xl font-bold text-[#191c1e] leading-tight">
                        {title}
                    </h3>
                    <p className="text-xs text-[#444651] mt-0.5">{subtitle}</p>
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4 text-[13px] text-[#444651]">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-base" style={{ color: 'var(--site-primary)' }}>airline_seat_recline_normal</span>
                        {seats} places
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-base" style={{ color: 'var(--site-primary)' }}>sensor_door</span>
                        {doors}
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-base" style={{ color: 'var(--site-primary)' }}>settings</span>
                        {transmission}
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-base" style={{ color: 'var(--site-primary)' }}>local_gas_station</span>
                        {fuel}
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-base" style={{ color: 'var(--site-primary)' }}>ac_unit</span>
                        Climatisation
                    </div>
                    {caution && (
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-base" style={{ color: 'var(--site-primary)' }}>shield</span>
                            {caution}
                        </div>
                    )}
                </div>

                <div className="border-t border-[#e0e3e6]/60 pt-4 mt-auto">
                    <div className="flex items-end justify-between mb-4">
                        <div>
                            <p className="text-[11px] text-[#444651] uppercase tracking-wide font-medium">
                                Prix pour 3 jours
                            </p>
                            <CarCardPrice price3Days={price3Days} />
                        </div>
                        {freeCancellation && (
                            <div className="flex items-center gap-1.5 text-emerald-600">
                                <span className="material-symbols-outlined text-base">check_circle</span>
                                <span className="text-[11px] font-semibold">Annulation gratuite</span>
                            </div>
                        )}
                    </div>

                    <Link
                        href={`/rental/${citySlug}/${slug}`}
                        className={`block w-full py-3.5 font-bold rounded-lg text-center text-sm uppercase tracking-wider transition-colors duration-300 ${
                            isOutlined
                                ? "bg-transparent border-2 text-[var(--site-primary)] hover:text-white"
                                : "text-white hover:opacity-90"
                        }`}
                        style={isOutlined
                            ? { borderColor: 'var(--site-primary)', color: 'var(--site-primary)' }
                            : { backgroundColor: 'var(--site-primary)' }
                        }
                        onMouseEnter={isOutlined ? (e) => {
                            (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--site-primary)';
                            (e.currentTarget as HTMLElement).style.color = 'white';
                        } : undefined}
                        onMouseLeave={isOutlined ? (e) => {
                            (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                            (e.currentTarget as HTMLElement).style.color = 'var(--site-primary)';
                        } : undefined}
                    >
                        Voir l&apos;offre
                    </Link>
                </div>
            </div>
        </div>
    );
}
