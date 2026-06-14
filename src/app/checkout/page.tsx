'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
    ArrowLeft,
    Car,
    Check,
    Baby,
    MapPinned,
    Users,
    Sparkles,
    Shield,
    User,
} from 'lucide-react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useBookingStore } from '@/store/useBookingStore';
import { siteConfig } from '@/lib/site-config';
import { useCurrency } from '@/context/currency-context';

// Countries list for permit country (static UI data)
const COUNTRIES = [
    'Tunisie', 'France', 'Belgique', 'Suisse', 'Allemagne', 'Italie',
    'Royaume-Uni', 'États-Unis', 'Canada', 'Maroc', 'Algérie', 'Libye',
    'Turquie', 'Espagne', 'Portugal', 'Pays-Bas', 'Luxembourg',
    'Arabie Saoudite', 'Émirats arabes unis', 'Qatar', 'Autre',
];

// Icon map for upsell options
const ICON_MAP: Record<string, React.ComponentType<{ size?: number }>> = {
    gps: MapPinned,
    child_seat: Baby,
    additional_driver: Users,
    full_insurance: Shield,
};

interface UpsellOptionData {
    id: string;
    name: string;
    description: string;
    price: number;
    iconKey: string;
}

// Default upsell options fallback (used when API data not available)
const DEFAULT_UPSELL_OPTIONS: UpsellOptionData[] = [
    { id: 'gps', name: 'GPS Navigation', description: 'Ne vous perdez jamais', price: 8, iconKey: 'gps' },
    { id: 'child_seat', name: 'Siège enfant', description: 'Sécurité pour vos enfants', price: 5, iconKey: 'child_seat' },
    { id: 'additional_driver', name: 'Conducteur additionnel', description: 'Partagez la conduite', price: 10, iconKey: 'additional_driver' },
    { id: 'full_insurance', name: 'Assurance tous risques', description: 'Franchise réduite à 0 DT', price: 45, iconKey: 'full_insurance' },
];

// Guess icon key from upsell name
function guessIconKey(name: string): string {
    const lower = name.toLowerCase();
    if (lower.includes('gps') || lower.includes('navigation')) return 'gps';
    if (lower.includes('siège') || lower.includes('bébé') || lower.includes('enfant')) return 'child_seat';
    if (lower.includes('conducteur') || lower.includes('driver')) return 'additional_driver';
    if (lower.includes('assurance') || lower.includes('insurance')) return 'full_insurance';
    return 'gps'; // default
}

const inputClass = 'w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all text-sm';
const labelClass = 'block text-sm font-medium text-gray-700 mb-1';
const selectChevron = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`;
const selectClass = 'w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all text-sm appearance-none bg-white cursor-pointer bg-no-repeat bg-[length:12px] bg-[right_12px_center] pr-8';

// Generate days/months/years for DOB
const days = Array.from({ length: 31 }, (_, i) => i + 1);
const months = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
];
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 80 }, (_, i) => currentYear - 21 - i);

function CheckoutContent() {
    const router = useRouter();
    const booking = useBookingStore();
    const { convert, symbol } = useCurrency();

    // Form state
    const [civility, setCivility] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState<string | undefined>(undefined);
    const [dobDay, setDobDay] = useState('');
    const [dobMonth, setDobMonth] = useState('');
    const [dobYear, setDobYear] = useState('');
    const [licenseNumber, setLicenseNumber] = useState('');
    const [country, setCountry] = useState('Tunisie');
    const [flightNumber, setFlightNumber] = useState('');
    const [customerNote, setCustomerNote] = useState('');
    const [honeypot, setHoneypot] = useState('');

    // Upsells state
    const [selectedUpsells, setSelectedUpsells] = useState<string[]>([]);
    const [upsellOptions, setUpsellOptions] = useState<UpsellOptionData[]>(DEFAULT_UPSELL_OPTIONS);

    // UI state
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);

        // Fetch upsell options from API (via server-side proxy)
        fetch('/api/upsells')
            .then(res => res.ok ? res.json() : Promise.reject('Failed'))
            .then((data: Array<{ id: string; name: string; description?: string; pricePerDay: string | number; isActive: boolean }>) => {
                if (data && data.length > 0) {
                    const mapped = data
                        .filter(u => u.isActive)
                        .map(u => ({
                            id: u.id,
                            name: u.name,
                            description: u.description || '',
                            price: typeof u.pricePerDay === 'string' ? parseFloat(u.pricePerDay) || 0 : u.pricePerDay,
                            iconKey: guessIconKey(u.name),
                        }));
                    if (mapped.length > 0) setUpsellOptions(mapped);
                }
            })
            .catch(() => { /* keep defaults */ });
    }, []);

    // Get car from store
    const car = booking.selectedCar;

    // Calculate days
    const calculateDays = () => {
        if (!booking.pickupDate || !booking.returnDate) return 1;
        const pickup = new Date(booking.pickupDate);
        const returnD = new Date(booking.returnDate);
        const diff = Math.abs(returnD.getTime() - pickup.getTime());
        return Math.ceil(diff / (1000 * 60 * 60 * 24)) || 1;
    };

    const totalDays = calculateDays();
    const pricePerDay = car?.price || 108;
    const carTotal = pricePerDay * totalDays;

    // Calculate upsells total
    const upsellsTotal = selectedUpsells.reduce((total, upsellId) => {
        const upsell = upsellOptions.find(u => u.id === upsellId);
        return total + (upsell ? upsell.price * totalDays : 0);
    }, 0);

    const grandTotal = carTotal + upsellsTotal;

    // Toggle upsell
    const toggleUpsell = (upsellId: string) => {
        setSelectedUpsells(prev =>
            prev.includes(upsellId)
                ? prev.filter(id => id !== upsellId)
                : [...prev, upsellId]
        );
    };

    // Format date
    const formatDate = (dateStr: string) => {
        if (!dateStr) return '';
        const [year, month, day] = dateStr.split('-').map(Number);
        const date = new Date(year, month - 1, day);
        return date.toLocaleDateString('fr-FR', {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    // Submit booking
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (honeypot) return;

        setLoading(true);
        setError('');

        try {
            const dob = dobDay && dobMonth && dobYear
                ? `${dobYear}-${String(Number(dobMonth)).padStart(2, '0')}-${String(dobDay).padStart(2, '0')}`
                : '';

            const response = await fetch('/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    civility,
                    firstName,
                    lastName,
                    email,
                    phone: phone || '',
                    dateOfBirth: dob,
                    licenseNumber,
                    country,
                    flightNumber,
                    carId: car?.id,
                    carName: car?.title,
                    pickupLocation: booking.pickupLocation,
                    pickupDate: booking.pickupDate,
                    pickupTime: booking.pickupTime,
                    returnLocation: booking.pickupLocation,
                    returnDate: booking.returnDate,
                    returnTime: booking.returnTime,
                    customerNote,
                    totalDays,
                    totalPrice: grandTotal,
                    upsells: selectedUpsells,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Échec de la réservation');
            }

            sessionStorage.setItem('booking_completed', 'true');
            router.push(`/thank-you?order=${data.booking.orderNumber}`);
        } catch (err: any) {
            setError(err.message || 'Échec de la réservation. Veuillez réessayer.');
        } finally {
            setLoading(false);
        }
    };

    // Show loading state until client-side hydration completes
    if (!isClient) {
        return (
            <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-10 h-10 border-4 border-accent/20 border-t-accent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-500 text-sm">Chargement de votre réservation...</p>
                </div>
            </div>
        );
    }

    // Redirect if no car selected
    if (!car) {
        return (
            <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
                <div className="text-center">
                    <Car className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                    <h2 className="text-xl font-bold text-gray-800 mb-2">Aucun véhicule sélectionné</h2>
                    <p className="text-gray-500 mb-6">Veuillez choisir un véhicule pour continuer</p>
                    <Link href="/nos-voitures" className="px-6 py-3 bg-accent text-white rounded-xl font-semibold hover:bg-accent/90 transition-colors">
                        Voir nos voitures
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Header */}
            <section
                className="relative overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${siteConfig.theme.primary} 0%, ${siteConfig.theme.primaryContainer} 50%, ${siteConfig.theme.primary} 100%)` }}
            >
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
                </div>

                <div className="relative z-10 max-w-6xl mx-auto px-6 pt-12 pb-8">
                    <Link href="/nos-voitures" className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-6 transition-colors">
                        <ArrowLeft size={16} />
                        Retour aux véhicules
                    </Link>

                    <div className="flex flex-wrap items-center justify-between gap-6">
                        <div className="flex items-center gap-8">
                            <div>
                                <p className="text-gray-400 text-xs mb-1">{booking.pickupLocation}</p>
                                <p className="text-white font-semibold">{formatDate(booking.pickupDate)}</p>
                                <p className="text-on-primary-container font-medium">{booking.pickupTime}</p>
                            </div>
                            <div className="text-2xl text-gray-500">&rarr;</div>
                            <div>
                                <p className="text-gray-400 text-xs mb-1">{booking.pickupLocation}</p>
                                <p className="text-white font-semibold">{formatDate(booking.returnDate)}</p>
                                <p className="text-on-primary-container font-medium">{booking.returnTime}</p>
                            </div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3 text-center">
                            <span className="text-3xl font-black text-white">{totalDays}</span>
                            <span className="text-gray-300 ml-2">jours</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-6 py-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column - Form */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Car Card */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-6">
                            <div className="flex gap-6">
                                <div className="w-40 h-28 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 relative">
                                    {car?.image ? (
                                        <Image src={car.image} alt={car.title || ''} fill className="object-contain p-2" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <Car className="w-12 h-12 text-gray-300" />
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <span className="inline-block bg-accent/10 text-accent text-xs font-semibold px-2 py-0.5 rounded mb-2">
                                                Coup de coeur
                                            </span>
                                            <h2 className="text-xl font-bold text-gray-900">{car?.title}</h2>
                                            <p className="text-gray-500 text-sm">ou petite voiture similaire</p>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-2xl font-bold text-accent">{convert(pricePerDay)}</span>
                                            <span className="text-gray-500 text-sm"> {symbol}/j</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
                                        <span className="flex items-center gap-1"><Check size={14} className="text-green-500" />Kilométrage illimité</span>
                                        <span className="flex items-center gap-1"><Check size={14} className="text-green-500" />Assurance incluse</span>
                                        <span className="flex items-center gap-1"><Check size={14} className="text-green-500" />Annulation gratuite 48h</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Upsells */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Sparkles size={20} className="text-accent" />
                                <h3 className="text-lg font-bold text-gray-900">Options supplémentaires</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {upsellOptions.map((upsell) => {
                                    const isSelected = selectedUpsells.includes(upsell.id);
                                    const Icon = ICON_MAP[upsell.iconKey] || MapPinned;
                                    return (
                                        <button
                                            key={upsell.id}
                                            type="button"
                                            onClick={() => toggleUpsell(upsell.id)}
                                            className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${isSelected ? 'border-accent bg-accent/5' : 'border-gray-100 hover:border-gray-200 bg-white'}`}
                                        >
                                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isSelected ? 'bg-accent text-white' : 'bg-gray-100 text-gray-500'}`}>
                                                <Icon size={20} />
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-semibold text-gray-900">{upsell.name}</p>
                                                <p className="text-xs text-gray-500">{upsell.description}</p>
                                            </div>
                                            <div className="text-right">
                                                <span className="font-bold text-accent">+{convert(upsell.price)} {symbol}/j</span>
                                                <span className="text-gray-400 text-xs block">par jour</span>
                                            </div>
                                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${isSelected ? 'bg-accent border-accent' : 'border-gray-300'}`}>
                                                {isSelected && <Check size={14} className="text-white" />}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Driver Form */}
                        <form id="checkout-form" onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-6">
                            <div className="flex items-center gap-2 mb-6">
                                <User size={20} className="text-accent" />
                                <h3 className="text-lg font-bold text-gray-900">Informations du conducteur</h3>
                            </div>

                            {error && (
                                <div className="mb-3 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                                    {error}
                                </div>
                            )}

                            {/* Civilité */}
                            <div className="mb-3">
                                <label className={labelClass}>Civilité *</label>
                                <div className="flex gap-3">
                                    {['Monsieur', 'Madame'].map((opt) => (
                                        <button
                                            key={opt}
                                            type="button"
                                            onClick={() => setCivility(opt)}
                                            className={`px-5 py-2.5 rounded-xl border-2 text-sm font-medium transition-all ${civility === opt ? 'border-accent bg-accent/5 text-accent' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Prénom + Nom */}
                            <div className="grid md:grid-cols-2 gap-4 mb-3">
                                <div>
                                    <label className={labelClass}>Prénom *</label>
                                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required className={inputClass} placeholder="John" />
                                </div>
                                <div>
                                    <label className={labelClass}>Nom *</label>
                                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required className={inputClass} placeholder="Doe" />
                                </div>
                            </div>

                            {/* Email + Téléphone */}
                            <div className="grid md:grid-cols-2 gap-4 mb-3">
                                <div>
                                    <label className={labelClass}>Email *</label>
                                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className={inputClass} placeholder="john@example.com" />
                                </div>
                                <div>
                                    <label className={labelClass}>Téléphone *</label>
                                    <PhoneInput
                                        international
                                        defaultCountry="TN"
                                        value={phone}
                                        onChange={setPhone}
                                        className="phone-input-checkout"
                                    />
                                </div>
                            </div>

                            {/* Date de naissance */}
                            <div className="mb-3">
                                <label className={labelClass}>Date de naissance *</label>
                                <div className="grid grid-cols-3 gap-2">
                                    <select value={dobDay} onChange={(e) => setDobDay(e.target.value)} required className={selectClass} style={{ backgroundImage: selectChevron }}>
                                        <option value="">Jour</option>
                                        {days.map(d => <option key={d} value={d}>{d}</option>)}
                                    </select>
                                    <select value={dobMonth} onChange={(e) => setDobMonth(e.target.value)} required className={selectClass} style={{ backgroundImage: selectChevron }}>
                                        <option value="">Mois</option>
                                        {months.map((m, i) => <option key={i} value={i + 1}>{m}</option>)}
                                    </select>
                                    <select value={dobYear} onChange={(e) => setDobYear(e.target.value)} required className={selectClass} style={{ backgroundImage: selectChevron }}>
                                        <option value="">Année</option>
                                        {years.map(y => <option key={y} value={y}>{y}</option>)}
                                    </select>
                                </div>
                                <p className="text-xs text-gray-400 mt-1">Les conducteurs doivent avoir au moins 21 ans</p>
                            </div>

                            {/* N° Permis + Pays */}
                            <div className="grid md:grid-cols-2 gap-4 mb-3">
                                <div>
                                    <label className={labelClass}>N° Permis de conduire *</label>
                                    <input
                                        type="text"
                                        value={licenseNumber}
                                        onChange={(e) => setLicenseNumber(e.target.value)}
                                        required
                                        className={inputClass}
                                        placeholder="Numéro de votre permis"
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>Pays *</label>
                                    <select value={country} onChange={(e) => setCountry(e.target.value)} required className={selectClass} style={{ backgroundImage: selectChevron }}>
                                        {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                            </div>

                            {/* N° de vol — half width */}
                            <div className="grid md:grid-cols-2 gap-4 mb-3">
                                <div>
                                    <label className={labelClass}>N° de vol (optionnel)</label>
                                    <input
                                        type="text"
                                        value={flightNumber}
                                        onChange={(e) => setFlightNumber(e.target.value)}
                                        className={inputClass}
                                        placeholder="Ex: TU 123"
                                    />
                                </div>
                            </div>

                            {/* Note */}
                            <div className="mb-6">
                                <label className={labelClass}>Note (optionnel)</label>
                                <textarea
                                    value={customerNote}
                                    onChange={(e) => setCustomerNote(e.target.value)}
                                    rows={3}
                                    className={`${inputClass} resize-none`}
                                    placeholder="Instructions spéciales..."
                                />
                            </div>

                            {/* Honeypot */}
                            <input type="text" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} className="hidden" tabIndex={-1} autoComplete="off" />

                            {/* Submit - Mobile Only */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full lg:hidden bg-accent hover:bg-accent/90 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 shadow-lg shadow-accent/25"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Traitement...
                                    </>
                                ) : (
                                    <>Confirmer la réservation &bull; {convert(grandTotal)} {symbol}</>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Right Column - Sticky Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-20">
                            <h3 className="font-bold text-gray-900 mb-4">Résumé de la réservation</h3>

                            {/* Price Breakdown */}
                            <div className="space-y-3 mb-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">{car?.title} x {totalDays} jours</span>
                                    <span className="font-medium">{convert(carTotal)} {symbol}</span>
                                </div>
                                {selectedUpsells.map(upsellId => {
                                    const upsell = upsellOptions.find(u => u.id === upsellId);
                                    if (!upsell) return null;
                                    return (
                                        <div key={upsellId} className="flex justify-between text-sm">
                                            <span className="text-gray-600">{upsell.name} x {totalDays}j</span>
                                            <span className="font-medium">{convert(upsell.price * totalDays)} {symbol}</span>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="border-t border-gray-100 pt-4 mb-6">
                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-gray-900">Total</span>
                                    <span className="text-2xl font-black text-accent">{convert(grandTotal)} {symbol}</span>
                                </div>
                            </div>

                            {/* Submit Button - Desktop */}
                            <button
                                type="submit"
                                form="checkout-form"
                                disabled={loading}
                                className="hidden lg:flex w-full bg-accent hover:bg-accent/90 text-white py-4 rounded-xl font-bold text-lg items-center justify-center gap-2 transition-all disabled:opacity-50 shadow-lg shadow-accent/25"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Traitement...
                                    </>
                                ) : (
                                    'Confirmer la réservation'
                                )}
                            </button>

                            {/* Trust Badges */}
                            <div className="mt-6 pt-4 border-t border-gray-100 space-y-2">
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <Check size={14} className="text-green-500 flex-shrink-0" />
                                    <span>Annulation gratuite jusqu&apos;à 48h</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <Check size={14} className="text-green-500 flex-shrink-0" />
                                    <span>Paiement à la prise en charge</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <Check size={14} className="text-green-500 flex-shrink-0" />
                                    <span>Assistance 24/7</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function CheckoutPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
            </div>
        }>
            <CheckoutContent />
        </Suspense>
    );
}
