import Image from "next/image";
import Link from "next/link";
import { CarCardPrice } from "./car-card-price";

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
    return (
        <div className="group bg-white rounded-xl overflow-hidden border border-[#e0e3e6]/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-400 flex flex-col h-full">
            {/* Image */}
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#f2f4f7]">
                <Image
                    src={image || "/car-placeholder.png"}
                    alt={title}
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Category badge */}
                {category && (
                    <span className="absolute top-4 left-4 bg-[#00256f] px-3 py-1.5 text-white font-bold text-[11px] uppercase tracking-wider rounded-md">
                        {category}
                    </span>
                )}
            </div>

            {/* Body */}
            <div className="p-5 md:p-6 flex flex-col flex-1">
                {/* Title row */}
                <div className="mb-4">
                    <h3 className="font-headline text-lg md:text-xl font-bold text-[#191c1e] leading-tight">
                        {title}
                    </h3>
                    <p className="text-xs text-[#444651] mt-0.5">{subtitle}</p>
                </div>

                {/* Specs grid — 2 columns of icon+text */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4 text-[13px] text-[#444651]">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-base text-[#00256f]">airline_seat_recline_normal</span>
                        {seats} places
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-base text-[#00256f]">sensor_door</span>
                        {doors}
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-base text-[#00256f]">settings</span>
                        {transmission}
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-base text-[#00256f]">local_gas_station</span>
                        {fuel}
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-base text-[#00256f]">ac_unit</span>
                        Climatisation
                    </div>
                    {caution && (
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-base text-[#00256f]">shield</span>
                            {caution}
                        </div>
                    )}
                </div>

                {/* Divider — pushed to bottom */}
                <div className="border-t border-[#e0e3e6]/60 pt-4 mt-auto">
                    {/* Price row */}
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

                    {/* CTA */}
                    <Link
                        href={`/rental/${citySlug}/${slug}`}
                        className="block w-full py-3.5 bg-[#00256f] text-white font-bold rounded-lg text-center text-sm uppercase tracking-wider hover:bg-[#1a3c8f] transition-colors duration-300"
                    >
                        Voir l&apos;offre
                    </Link>
                </div>
            </div>
        </div>
    );
}
