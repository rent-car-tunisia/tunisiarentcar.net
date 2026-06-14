import { Metadata } from "next";
import Link from "next/link";
import { getCars } from "@/lib/data";
import { CarCard } from "@/components/car-card";
import { Clock, Building2, Users, Check, ChevronRight, Phone, FileText, Car, Sparkles } from "lucide-react";
import { siteConfig, telUrl } from "@/lib/site-config";

export const metadata: Metadata = {
    title: `Location Voiture Longue Durée Tunisie | Entreprises & Particuliers | ${siteConfig.brand.name}`,
    description: "Location voiture longue durée en Tunisie. Tarifs dégressifs pour entreprises et particuliers. Dès 280 DT la semaine. Devis gratuit.",
    openGraph: {
        title: `Location Longue Durée Tunisie | ${siteConfig.brand.name}`,
        description: "Location voiture longue durée entreprises et particuliers. Tarifs mensuels avantageux.",
    },
    alternates: {
        canonical: `${siteConfig.url.baseUrl}/longue-duree`,
    },
};

export default async function LongueDureePage() {
    const cars = await getCars();
    // Offset so this page shows different cars than other pages
    const offset = 12 % Math.max(cars.length - 4, 1);
    const featuredCars = cars.slice(offset, offset + 4);

    // Long-term pricing
    const longTermPrices = [
        { duration: "1 semaine", citadine: "280", compacte: "350", suv: "490", discount: "5%" },
        { duration: "2 semaines", citadine: "500", compacte: "630", suv: "880", discount: "10%" },
        { duration: "1 mois", citadine: "900", compacte: "1100", suv: "1500", discount: "20%" },
        { duration: "3 mois", citadine: "2400", compacte: "3000", suv: "4200", discount: "25%" },
        { duration: "6 mois+", citadine: "Sur devis", compacte: "Sur devis", suv: "Sur devis", discount: "30%+" },
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
                        <span className="text-white font-medium">Longue Durée</span>
                    </nav>

                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
                                <Sparkles size={16} />
                                Jusqu&apos;à -30%
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
                                Location Voiture<br />
                                <span className="text-accent">Longue Durée</span>
                            </h1>
                            <p className="text-lg text-gray-300 leading-relaxed mb-8">
                                Tarifs dégressifs pour vos locations de longue durée. Solutions flexibles pour entreprises et particuliers.
                            </p>

                            <div className="flex flex-wrap items-center gap-4 mb-8">
                                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                                    <Clock size={18} className="text-accent" />
                                    <span className="text-white font-medium">À partir de 1 semaine</span>
                                </div>
                                <div className="flex items-center gap-2 bg-green-500/20 rounded-lg px-4 py-2">
                                    <span className="text-green-400 font-bold">Jusqu&apos;à -30%</span>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-4">
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105"
                                >
                                    <FileText size={20} />
                                    Demander un devis
                                </Link>
                                <a
                                    href={telUrl}
                                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-4 rounded-xl font-medium transition-all"
                                >
                                    <Phone size={18} />
                                    {siteConfig.contact.phone.display}
                                </a>
                            </div>
                        </div>

                        <div className="hidden lg:block">
                            <div className="bg-white rounded-2xl shadow-2xl p-8">
                                <div className="text-center mb-6">
                                    <div className="text-sm text-gray-500">Location à la semaine dès</div>
                                    <div className="text-5xl font-black text-gray-900">280 <span className="text-lg font-normal text-gray-500">DT / semaine</span></div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        { label: "1 semaine", discount: "-5%" },
                                        { label: "2 semaines", discount: "-10%" },
                                        { label: "1 mois", discount: "-20%" },
                                        { label: "3 mois+", discount: "-30%" },
                                    ].map((item, i) => (
                                        <div key={i} className="bg-gray-50 rounded-lg p-3 text-center">
                                            <div className="text-sm text-gray-600">{item.label}</div>
                                            <div className="font-bold text-green-600">{item.discount}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tabs */}
            <section className="py-16 bg-white">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Entreprises */}
                        <div className="rounded-2xl p-8 border-2 border-accent bg-gradient-to-br from-accent/5 to-transparent">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                                    <Building2 size={24} className="text-accent" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">Entreprises</h2>
                            </div>
                            <p className="text-gray-600 mb-6">
                                Solutions de flotte pour votre entreprise. Facturation mensuelle, véhicules de remplacement, et support dédié.
                            </p>
                            <ul className="space-y-3 mb-6">
                                {["Facturation mensuelle", "Contrats flexibles", "Véhicule de remplacement", "Assurance tous risques incluse", "Entretien et révisions"].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                                            <Check size={14} className="text-green-600" />
                                        </div>
                                        <span className="text-gray-700">{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <Link
                                href="/contact"
                                className="block w-full bg-accent hover:bg-accent-dark text-white text-center py-4 rounded-xl font-bold transition-colors"
                            >
                                Demander un devis entreprise
                            </Link>
                        </div>

                        {/* Particuliers */}
                        <div className="rounded-2xl p-8 border-2 border-gray-200 bg-white">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                                    <Users size={24} className="text-accent" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">Particuliers</h2>
                            </div>
                            <p className="text-gray-600 mb-6">
                                Idéal pour les expatriés, étudiants, ou séjours prolongés. Tarifs dégressifs à partir d&apos;une semaine.
                            </p>
                            <ul className="space-y-3 mb-6">
                                {["Tarifs dégressifs", "Sans engagement", "Kilométrage illimité", "Assurance incluse", "Paiement mensuel possible"].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                                            <Check size={14} className="text-green-600" />
                                        </div>
                                        <span className="text-gray-700">{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <Link
                                href="/nos-voitures"
                                className="block w-full border-2 border-accent text-accent hover:bg-accent hover:text-white text-center py-4 rounded-xl font-bold transition-colors"
                            >
                                Voir nos véhicules
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Table */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">
                        Tarifs longue durée (DT)
                    </h2>
                    <div className="overflow-x-auto rounded-2xl border border-gray-200">
                        <table className="w-full bg-white">
                            <thead>
                                <tr style={{ background: `linear-gradient(135deg, ${siteConfig.theme.primary} 0%, ${siteConfig.theme.primaryContainer} 50%, ${siteConfig.theme.primary} 100%)` }}>
                                    <th className="p-5 text-left text-white font-bold">Durée</th>
                                    <th className="p-5 text-center text-white font-bold">Citadine</th>
                                    <th className="p-5 text-center text-white font-bold">Compacte</th>
                                    <th className="p-5 text-center text-white font-bold">SUV</th>
                                    <th className="p-5 text-center text-white font-bold">Réduction</th>
                                </tr>
                            </thead>
                            <tbody>
                                {longTermPrices.map((row, i) => (
                                    <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                                        <td className="p-5 font-bold text-gray-900">{row.duration}</td>
                                        <td className="p-5 text-center text-gray-700">{row.citadine}</td>
                                        <td className="p-5 text-center text-gray-700">{row.compacte}</td>
                                        <td className="p-5 text-center text-gray-700">{row.suv}</td>
                                        <td className="p-5 text-center">
                                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-lg font-bold text-sm">
                                                {row.discount}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Cars */}
            <section className="py-16 bg-white">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Véhicules disponibles
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
                        Besoin d&apos;un devis personnalisé ?
                    </h2>
                    <p className="text-gray-300 mb-8">
                        Contactez-nous pour une offre adaptée à vos besoins.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a
                            href={telUrl}
                            className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors"
                        >
                            <Phone size={20} />
                            {siteConfig.contact.phone.display}
                        </a>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-8 py-4 rounded-xl font-bold transition-colors"
                        >
                            <FileText size={20} />
                            Demander un devis
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
