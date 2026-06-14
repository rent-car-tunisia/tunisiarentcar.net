"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useBookingStore } from "@/store/useBookingStore";
import { MapPin, Calendar, Clock, Search, ChevronDown, Award, Phone } from "lucide-react";

const LOCATIONS = [
    "Aéroport Tunis-Carthage",
    "Aéroport Enfidha-Hammamet",
    "Aéroport Monastir",
    "Aéroport Djerba",
    "Tunis Centre",
    "Hammamet",
    "Sousse",
    "Monastir",
    "Djerba",
];

// Smart time presets
const TIME_OPTIONS = [
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
    "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
    "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
    "20:00", "20:30", "21:00", "21:30", "22:00", "22:30",
    "23:00", "23:30", "00:00",
];

// Custom Dropdown Component
function CustomSelect({
    value,
    options,
    onChange,
    placeholder,
    icon: Icon,
    className = ""
}: {
    value: string;
    options: string[];
    onChange: (val: string) => void;
    placeholder?: string;
    icon?: React.ElementType;
    className?: string;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={ref} className={`relative ${className}`}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="
          w-full h-12 flex items-center justify-between gap-1
          bg-white border border-gray-200 rounded-xl px-2.5
          text-foreground font-medium text-left
          hover:border-accent focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20
          transition-all duration-200
        "
            >
                <div className="flex items-center gap-1">
                    {Icon && <Icon size={14} className="text-accent shrink-0" />}
                    <span className="text-sm">{value || placeholder}</span>
                </div>
                <ChevronDown
                    size={12}
                    className={`text-muted shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                />
            </button>

            {isOpen && (
                <div
                    className="
            absolute z-50 mt-2 w-full min-w-[100px] bg-white border border-gray-200 rounded-xl shadow-xl
            max-h-60 overflow-y-auto
            [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
          "
                >
                    {options.map((option) => (
                        <button
                            key={option}
                            type="button"
                            onClick={() => {
                                onChange(option);
                                setIsOpen(false);
                            }}
                            className={`
                w-full px-4 py-2.5 text-left text-sm font-medium
                hover:bg-accent/5 transition-colors
                ${value === option ? "bg-accent/10 text-accent" : "text-foreground"}
                first:rounded-t-xl last:rounded-b-xl
              `}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export function SearchWidget() {
    const router = useRouter();
    const {
        pickupLocation,
        setPickupLocation,
        pickupDate,
        setPickupDate,
        returnDate,
        setReturnDate,
    } = useBookingStore();

    const [location, setLocation] = useState(pickupLocation || LOCATIONS[0]);
    const [pickupTime, setPickupTime] = useState("10:00");
    const [returnTime, setReturnTime] = useState("10:00");

    // Set default dates if not set
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const [pickup, setPickup] = useState(
        pickupDate || today.toISOString().split("T")[0]
    );
    const [returnD, setReturnD] = useState(
        returnDate || tomorrow.toISOString().split("T")[0]
    );

    // Sync with store
    useEffect(() => {
        setPickupLocation(location);
        setPickupDate(pickup);
        setReturnDate(returnD);
    }, [location, pickup, returnD, setPickupLocation, setPickupDate, setReturnDate]);

    const handleSearch = () => {
        if (typeof window !== "undefined") {
            localStorage.setItem("pickupTime", pickupTime);
            localStorage.setItem("returnTime", returnTime);
        }
        router.push("/cars");
    };

    // Format date for display - short format
    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "short"
        });
    };

    return (
        <div className="w-full max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                {/* Location Row */}
                <div className="mb-6">
                    <label className="flex items-center gap-1 text-xs font-semibold text-muted uppercase tracking-wide mb-2">
                        <MapPin size={12} />
                        Lieu de prise en charge
                    </label>
                    <CustomSelect
                        value={location}
                        options={LOCATIONS}
                        onChange={setLocation}
                        icon={MapPin}
                    />
                </div>

                {/* Date + Time Row — ALIGNED */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    {/* Pickup */}
                    <div>
                        <label className="flex items-center gap-1 text-xs font-semibold text-muted uppercase tracking-wide mb-2">
                            <Calendar size={12} />
                            Date de départ
                        </label>
                        <div className="flex gap-2 items-stretch">
                            {/* Date Input */}
                            <div className="flex-1 relative min-w-0">
                                <input
                                    type="date"
                                    value={pickup}
                                    onChange={(e) => setPickup(e.target.value)}
                                    min={today.toISOString().split("T")[0]}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                />
                                <div className="h-12 flex items-center justify-between gap-1 bg-white border border-gray-200 rounded-xl px-3 text-foreground font-medium">
                                    <div className="flex items-center gap-1.5">
                                        <Calendar size={14} className="text-accent shrink-0" />
                                        <span className="text-sm whitespace-nowrap">{formatDate(pickup)}</span>
                                    </div>
                                    <ChevronDown size={12} className="text-muted shrink-0" />
                                </div>
                            </div>
                            {/* Time Select */}
                            <CustomSelect
                                value={pickupTime}
                                options={TIME_OPTIONS}
                                onChange={setPickupTime}
                                icon={Clock}
                                className="w-[90px] shrink-0"
                            />
                        </div>
                    </div>

                    {/* Return */}
                    <div>
                        <label className="flex items-center gap-1 text-xs font-semibold text-muted uppercase tracking-wide mb-2">
                            <Calendar size={12} />
                            Date de retour
                        </label>
                        <div className="flex gap-2 items-stretch">
                            {/* Date Input */}
                            <div className="flex-1 relative min-w-0">
                                <input
                                    type="date"
                                    value={returnD}
                                    onChange={(e) => setReturnD(e.target.value)}
                                    min={pickup}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                />
                                <div className="h-12 flex items-center justify-between gap-1 bg-white border border-gray-200 rounded-xl px-3 text-foreground font-medium">
                                    <div className="flex items-center gap-1.5">
                                        <Calendar size={14} className="text-accent shrink-0" />
                                        <span className="text-sm whitespace-nowrap">{formatDate(returnD)}</span>
                                    </div>
                                    <ChevronDown size={12} className="text-muted shrink-0" />
                                </div>
                            </div>
                            {/* Time Select */}
                            <CustomSelect
                                value={returnTime}
                                options={TIME_OPTIONS}
                                onChange={setReturnTime}
                                icon={Clock}
                                className="w-[90px] shrink-0"
                            />
                        </div>
                    </div>
                </div>

                {/* CTA Button */}
                <button
                    onClick={handleSearch}
                    className="w-full bg-accent hover:bg-accent-dark text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                >
                    <Search size={20} />
                    Rechercher une voiture
                </button>

                {/* Trust Badges */}
                <div className="flex flex-wrap justify-center gap-6 mt-6 pt-6 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-muted">
                        <MapPin size={16} className="text-accent" />
                        <span className="text-sm font-medium">Partout en Tunisie</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted">
                        <Award size={16} className="text-accent" />
                        <span className="text-sm font-medium">Prix les moins chers</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted">
                        <Phone size={16} className="text-accent" />
                        <span className="text-sm font-medium">Assistance 24/7</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
