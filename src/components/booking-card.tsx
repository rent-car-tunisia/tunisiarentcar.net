"use client";

import { useBookingStore } from "@/store/useBookingStore";
import { useRouter } from "next/navigation";
import { siteConfig, telUrl } from "@/lib/site-config";

interface BookingCardProps {
    carId: string;
    carTitle: string;
    price: string;
    city: string;
}

export function BookingCard({ carId, carTitle, price, city }: BookingCardProps) {
    const router = useRouter();
    const { pickupLocation, pickupDate, returnDate, setSelectedCar } = useBookingStore();

    const handleBooking = () => {
        setSelectedCar({
            id: carId,
            title: carTitle,
            slug: carId,
            price: Math.round((parseInt(price) || 324) / 3),
            image: '',
        });
        router.push("/checkout");
    };

    // Calculate days
    const start = pickupDate ? new Date(pickupDate) : new Date();
    const end = returnDate ? new Date(returnDate) : new Date(Date.now() + 86400000);
    const diffTime = end.getTime() - start.getTime();
    const days = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24))) || 1;
    const pricePerDay = Math.round((parseInt(price) || 324) / 3);
    const totalPrice = pricePerDay * days;

    return (
        <div className="sticky top-24 bg-white p-6 rounded-xl shadow-sm space-y-6">
            {/* Price */}
            <div>
                <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-[#00256f]">{price} DT</span>
                    <span className="text-[#444651] text-xs">/ 3 jours</span>
                </div>
            </div>

            <div className="h-px bg-[#e0e3e6]" />

            {/* Booking Details */}
            <div className="space-y-4">
                <div>
                    <label className="label">
                        <span className="material-symbols-outlined text-sm mr-1 align-middle">location_on</span>
                        Lieu de prise en charge
                    </label>
                    <div className="py-2 pl-7 border-b-2 border-[#e0e3e6] font-semibold text-[#191c1e] text-sm">
                        {pickupLocation || "Aéroport Tunis-Carthage"}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="label">Départ</label>
                        <div className="py-2 border-b-2 border-[#e0e3e6] font-semibold text-[#191c1e] text-sm">
                            {pickupDate || "—"}
                        </div>
                    </div>
                    <div>
                        <label className="label">Retour</label>
                        <div className="py-2 border-b-2 border-[#e0e3e6] font-semibold text-[#191c1e] text-sm">
                            {returnDate || "—"}
                        </div>
                    </div>
                </div>
            </div>

            <div className="h-px bg-[#e0e3e6]" />

            {/* Total */}
            <div className="flex justify-between items-center">
                <span className="text-[#444651] text-sm">{days} jour{days > 1 ? "s" : ""} × {pricePerDay} DT/j</span>
                <span className="text-xl font-black text-[#191c1e]">{totalPrice} DT</span>
            </div>

            {/* CTA */}
            <button
                onClick={handleBooking}
                className="w-full bg-gradient-to-r from-[#00256f] to-[#1a3c8f] text-white font-bold py-4 rounded-lg shadow-lg shadow-[#00256f]/20 hover:scale-[0.98] transition-transform"
            >
                Réserver maintenant
            </button>

            {/* Trust */}
            <div className="space-y-2 pt-2">
                <div className="flex items-center gap-2 text-sm text-[#444651]">
                    <span className="material-symbols-outlined text-green-600 text-lg">verified_user</span>
                    Assurance tous risques incluse
                </div>
                <div className="flex items-center gap-2 text-sm text-[#444651]">
                    <span className="material-symbols-outlined text-[#00256f] text-lg">call</span>
                    <a href={telUrl} className="hover:text-[#191c1e] transition-colors">
                        Besoin d'aide ? {siteConfig.contact.phone.display}
                    </a>
                </div>
            </div>
        </div>
    );
}
