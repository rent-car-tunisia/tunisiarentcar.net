import { Metadata } from "next";
import Link from "next/link";
import { getCars } from "@/lib/data";
import { CarCard } from "@/components/car-card";
import { CreditCard, Check, Shield, Phone, ChevronRight, Banknote, Wallet, Car, Sparkles } from "lucide-react";
import { siteConfig, telUrl } from "@/lib/site-config";

export const metadata: Metadata = {
    title: `Location Voiture Tunisie Sans Carte Bancaire | Paiement Cash | ${siteConfig.brand.name}`,
    description: "Louez une voiture en Tunisie sans carte de crédit. Paiement en espèces ou carte de débit accepté. Paiement à l'arrivée possible.",
    openGraph: {
        title: `Location Voiture Sans Carte Bancaire | ${siteConfig.brand.name}`,
        description: "Louez sans carte de crédit en Tunisie. Paiement cash accepté.",
    },
    alternates: {
        canonical: `${siteConfig.url.baseUrl}/sans-carte-bancaire`,
    },
};

export default async function SansCarteBancairePage() {
    const cars = await getCars();
    // Offset so this page shows different cars than other pages
    const offset = 8 % Math.max(cars.length - 4, 1);
    const featuredCars = cars.slice(offset, offset + 4);

    // Payment methods
    const paymentMethods = [
        { icon: <Banknote size={32} />, title: "Espèces", desc: "Paiement cash en dinars tunisiens au retrait du véhicule", color: "bg-green-50 border-green-200" },
        { icon: <CreditCard size={32} />, title: "Carte de débit", desc: "Visa Electron, Maestro et autres cartes de débit acceptées", color: "bg-blue-50 border-blue-200" },
        { icon: <Wallet size={32} />, title: "Virement bancaire", desc: "Pour les réservations longue durée ou entreprises", color: "bg-purple-50 border-purple-200" },
    ];

    const deposits = [
        { category: "Citadine / Économique", amount: "500 DT" },
        { category: "Compacte / Berline", amount: "800 DT" },
        { category: "SUV / 7 places", amount: "1000 DT" },
        { category: "Luxe / Premium", amount: "1500 DT" },
    ];

    return (
        <>
            {/* Hero */}
            <section className="relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${siteConfig.theme.primary} 0%, ${siteConfig.theme.primaryContainer} 50%, ${siteConfig.theme.primary} 100%)` }}>
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
                </div>

                <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
                    <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
                        <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
                        <ChevronRight size={14} />
                        <span className="text-white font-medium">Sans Carte Bancaire</span>
                    </nav>

                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
                                <Sparkles size={16} />
                                Sans carte de crédit
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
                                Location Voiture<br />
                                <span className="text-accent">Sans Carte Bancaire</span>
                            </h1>
                            <p className="text-lg text-gray-300 leading-relaxed mb-8">
                                Pas de carte de crédit ? Pas de problème ! Chez {siteConfig.brand.name}, vous pouvez louer une voiture en Tunisie en payant en espèces ou par carte de débit.
                            </p>

                            <div className="flex flex-wrap items-center gap-4 mb-8">
                                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                                    <Banknote size={18} className="text-green-400" />
                                    <span className="text-white font-medium">Paiement cash</span>
                                </div>
                                <div className="flex items-center gap-2 bg-accent/20 rounded-lg px-4 py-2">
                                    <span className="text-accent font-bold">Dès {siteConfig.pricing.minPrice3Days} {siteConfig.pricing.currencyDisplay} / 3 jours</span>
                                </div>
                            </div>

                            <Link
                                href="/nos-voitures"
                                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105"
                            >
                                <Car size={20} />
                                Réserver maintenant
                            </Link>
                        </div>

                        <div className="hidden lg:flex justify-center">
                            <div className="relative">
                                <div className="absolute inset-0 bg-accent/20 rounded-full blur-3xl transform scale-75" />
                                <div className="relative bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                                    <div className="flex items-center justify-center mb-4">
                                        <div className="w-20 h-20 bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl flex items-center justify-center">
                                            <CreditCard size={40} className="text-accent" strokeWidth={1.5} />
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-gray-900 mb-2">
                                            Pas de carte de crédit
                                        </div>
                                        <div className="text-gray-500">requise</div>
                                    </div>
                                    <div className="mt-6 pt-6 border-t border-gray-100 space-y-2">
                                        {["Cash accepté", "Carte de débit OK", "Paiement à l'arrivée"].map((item, i) => (
                                            <div key={i} className="flex items-center gap-2 text-gray-700">
                                                <Check size={14} className="text-green-500" />
                                                <span className="text-sm">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Payment Methods */}
            <section className="py-16 bg-white">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                        Nos modes de paiement acceptés
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {paymentMethods.map((method, i) => (
                            <div key={i} className={`rounded-2xl p-8 border-2 ${method.color} text-center transition-all hover:shadow-lg`}>
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-xl shadow-sm text-accent mb-4">
                                    {method.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{method.title}</h3>
                                <p className="text-gray-600">{method.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-10 text-center">
                        Comment ça fonctionne ?
                    </h2>
                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { step: "1", title: "Réservez en ligne", desc: "Choisissez votre voiture et vos dates" },
                            { step: "2", title: "Confirmation", desc: "Nous confirmons par WhatsApp" },
                            { step: "3", title: "Prise en charge", desc: "Payez en espèces ou carte" },
                            { step: "4", title: "Partez !", desc: "Profitez de votre voyage" },
                        ].map((item, i) => (
                            <div key={i} className="text-center">
                                <div className="w-14 h-14 bg-accent text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg shadow-accent/25">
                                    {item.step}
                                </div>
                                <div className="font-bold text-gray-900 mb-2">{item.title}</div>
                                <div className="text-sm text-gray-600">{item.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Deposit Info */}
            <section className="py-16 bg-white">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-gray-50 rounded-2xl p-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
                                    <Shield className="text-accent" size={20} />
                                </div>
                                Dépôt de garantie
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Un dépôt de garantie est demandé à la prise en charge du véhicule :
                            </p>
                            <ul className="space-y-3">
                                {deposits.map((item, i) => (
                                    <li key={i} className="flex justify-between items-center py-2 border-b border-gray-200">
                                        <span className="text-gray-700">{item.category}</span>
                                        <span className="font-bold text-gray-900 bg-white px-3 py-1 rounded-lg">{item.amount}</span>
                                    </li>
                                ))}
                            </ul>
                            <p className="text-sm text-gray-500 mt-4">
                                * Le dépôt est restitué intégralement au retour du véhicule en bon état.
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-accent/5 to-accent/10 rounded-2xl p-8 border border-accent/20">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">
                                Pourquoi choisir {siteConfig.brand.name} ?
                            </h3>
                            <ul className="space-y-4">
                                {[
                                    "Pas de carte de crédit obligatoire",
                                    "Paiement possible à l'arrivée",
                                    "Kilométrage illimité inclus",
                                    "Assurance de base incluse",
                                    "Service 24h/24 aux aéroports",
                                    "Livraison hôtel gratuite",
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                                            <Check size={14} className="text-green-600" />
                                        </div>
                                        <span className="text-gray-700">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Cars */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Voitures disponibles
                        </h2>
                        <Link href="/nos-voitures" className="text-accent font-medium hover:underline flex items-center gap-1">
                            Voir tout <ChevronRight size={16} />
                        </Link>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {featuredCars.map((car) => (
                            <CarCard
                                key={car.id}
                                id={car.id}
                                title={car.title}
                                slug={car.slug}
                                subtitle={car.subtitle}
                                price3Days={car.price3Days}
                                currency={car.currency}
                                image={car.featured_image}
                                category={car.category}
                                seats={car.seats}
                                doors={car.doors}
                                transmission={car.transmission}
                                fuel={car.fuel}
                                caution={car.caution}
                                freeCancellation={car.freeCancellation}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16" style={{ background: `linear-gradient(135deg, ${siteConfig.theme.primary} 0%, ${siteConfig.theme.primaryContainer} 50%, ${siteConfig.theme.primary} 100%)` }}>
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Réservez maintenant sans carte bancaire
                    </h2>
                    <p className="text-gray-300 mb-8">
                        Contactez-nous pour confirmer votre réservation en quelques minutes.
                    </p>
                    <a
                        href={telUrl}
                        className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors"
                    >
                        <Phone size={20} />
                        {siteConfig.contact.phone.display}
                    </a>
                </div>
            </section>
        </>
    );
}
