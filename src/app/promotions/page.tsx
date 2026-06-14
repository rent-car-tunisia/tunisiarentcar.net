import { Metadata } from "next";
import Link from "next/link";
import { getCars } from "@/lib/data";
import { CarCard } from "@/components/car-card";
import { Tag, Check, ChevronRight, Car, Clock, Calendar, Percent, Gift, Sparkles } from "lucide-react";
import { siteConfig, whatsappUrl } from "@/lib/site-config";

export const metadata: Metadata = {
    title: `Promotions Location Voiture Tunisie | Offres Spéciales | ${siteConfig.brand.name}`,
    description: "Découvrez nos promotions et offres spéciales sur la location de voiture en Tunisie. Réductions basse saison, longue durée, et tarifs préférentiels. Dès 98€ pour 3 jours.",
    openGraph: {
        title: `Promotions & Offres Spéciales | ${siteConfig.brand.name}`,
        description: "Promotions location voiture Tunisie. Réductions jusqu'à -35%. Réservez maintenant!",
    },
    alternates: {
        canonical: `${siteConfig.url.baseUrl}/promotions`,
    },
};

export default async function PromotionsPage() {
    const cars = await getCars();
    const budgetCars = cars.filter(c => c.price3Days <= 400).slice(0, 4);

    const promotions = [
        {
            icon: <Calendar size={28} />,
            title: "Basse Saison -20%",
            period: "Novembre à Mars",
            description: "Profitez de tarifs réduits pendant la basse saison. Même qualité de service, prix encore plus bas.",
            badge: "-20%",
            badgeColor: "bg-green-500",
        },
        {
            icon: <Clock size={28} />,
            title: "Longue Durée -35%",
            period: "Location de 3 mois+",
            description: "Plus vous louez longtemps, plus vous économisez. Tarifs dégressifs à partir de 1 semaine.",
            badge: "-35%",
            badgeColor: "bg-blue-500",
        },
        {
            icon: <Gift size={28} />,
            title: "Réservation Anticipée",
            period: "Réservez 30+ jours à l'avance",
            description: "Réservez votre voiture au moins 30 jours avant votre arrivée et bénéficiez d'un tarif préférentiel.",
            badge: "-10%",
            badgeColor: "bg-purple-500",
        },
        {
            icon: <Percent size={28} />,
            title: "Offre Fidélité",
            period: "Clients réguliers",
            description: "Vous avez déjà loué chez nous ? Bénéficiez automatiquement d'une remise fidélité sur votre prochaine location.",
            badge: "-15%",
            badgeColor: "bg-orange-500",
        },
    ];

    const durationDiscounts = [
        { duration: "3-6 jours", discount: "Prix standard" },
        { duration: "1 semaine", discount: "-10%" },
        { duration: "2 semaines", discount: "-15%" },
        { duration: "3 semaines", discount: "-20%" },
        { duration: "1 mois", discount: "-25%" },
        { duration: "3 mois+", discount: "-35%" },
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
                        <span className="text-white font-medium">Promotions</span>
                    </nav>

                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
                                <Sparkles size={16} />
                                Offres spéciales
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
                                Promotions<br />
                                <span className="text-accent">Location Voiture</span>
                            </h1>
                            <p className="text-lg text-gray-300 leading-relaxed mb-8">
                                Économisez sur votre location de voiture en Tunisie avec nos offres exclusives. Réductions basse saison, longue durée, réservation anticipée et programme fidélité.
                            </p>

                            <div className="flex flex-wrap items-center gap-4 mb-8">
                                <div className="flex items-center gap-2 bg-green-500/20 rounded-lg px-4 py-2">
                                    <Tag size={18} className="text-green-400" />
                                    <span className="text-green-300 font-medium">Jusqu&apos;à -35%</span>
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
                                Voir nos voitures
                            </Link>
                        </div>

                        <div className="hidden lg:flex justify-center">
                            <div className="relative">
                                <div className="absolute inset-0 bg-accent/20 rounded-full blur-3xl transform scale-75" />
                                <div className="relative bg-white rounded-2xl shadow-2xl p-8 transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                                    <div className="flex items-center justify-center mb-4">
                                        <div className="w-20 h-20 bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl flex items-center justify-center">
                                            <Tag size={40} className="text-accent" strokeWidth={1.5} />
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl font-black text-accent mb-1">-35%</div>
                                        <div className="text-gray-500 text-sm">sur la longue durée</div>
                                    </div>
                                    <div className="mt-6 pt-6 border-t border-gray-100 space-y-2">
                                        {["Basse saison -20%", "Réservation anticipée -10%", "Fidélité -15%"].map((item, i) => (
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

            {/* Promotions Grid */}
            <section className="py-16 bg-white">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-10 text-center">
                        Nos offres en cours
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {promotions.map((promo, i) => (
                            <div key={i} className="relative bg-white border-2 border-gray-100 rounded-2xl p-8 hover:border-accent/30 hover:shadow-lg transition-all">
                                <div className={`absolute top-4 right-4 ${promo.badgeColor} text-white px-3 py-1 rounded-full text-sm font-bold`}>
                                    {promo.badge}
                                </div>
                                <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-4">
                                    {promo.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-1">{promo.title}</h3>
                                <p className="text-sm text-accent font-medium mb-3">{promo.period}</p>
                                <p className="text-gray-600">{promo.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Duration Discounts Table */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                        Tarifs dégressifs selon la durée
                    </h2>
                    <p className="text-gray-600 text-center mb-10">
                        Plus vous louez longtemps, plus vous économisez. Réductions automatiques.
                    </p>
                    <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-200">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="text-left px-6 py-4 text-sm font-bold text-gray-700">Durée</th>
                                    <th className="text-right px-6 py-4 text-sm font-bold text-gray-700">Réduction</th>
                                </tr>
                            </thead>
                            <tbody>
                                {durationDiscounts.map((item, i) => (
                                    <tr key={i} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-gray-700 font-medium">{item.duration}</td>
                                        <td className="px-6 py-4 text-right">
                                            <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${item.discount.startsWith('-') ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                                {item.discount}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Budget Cars */}
            <section className="py-16 bg-white">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Nos voitures les plus économiques
                        </h2>
                        <Link href="/nos-voitures" className="text-accent font-medium hover:underline flex items-center gap-1">
                            Voir tout <ChevronRight size={16} />
                        </Link>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {budgetCars.map((car) => (
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

            {/* Tips */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-10 text-center">
                        Conseils pour économiser
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: "Réservez tôt", desc: "Réservez au moins 7 jours avant votre arrivée pour bénéficier des meilleurs tarifs et de la plus grande disponibilité." },
                            { title: "Choisissez la basse saison", desc: "Les mois de novembre à mars offrent les meilleurs tarifs. Même météo agréable, prix 20% moins cher." },
                            { title: "Optez pour la longue durée", desc: "À partir de 1 semaine, les tarifs baissent automatiquement. 1 mois = -25% de réduction." },
                        ].map((tip, i) => (
                            <div key={i} className="text-center">
                                <div className="w-12 h-12 bg-accent text-white rounded-2xl flex items-center justify-center text-xl font-bold mx-auto mb-4 shadow-lg shadow-accent/25">
                                    {i + 1}
                                </div>
                                <h3 className="font-bold text-gray-900 mb-2">{tip.title}</h3>
                                <p className="text-sm text-gray-600">{tip.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16" style={{ background: `linear-gradient(135deg, ${siteConfig.theme.primary} 0%, ${siteConfig.theme.primaryContainer} 50%, ${siteConfig.theme.primary} 100%)` }}>
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Profitez de nos promotions
                    </h2>
                    <p className="text-gray-300 mb-8">
                        Contactez-nous sur WhatsApp pour un devis personnalisé et des offres exclusives.
                    </p>
                    <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-bold transition-colors"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.387 0-4.594-.822-6.34-2.197l-.442-.37-3.09 1.036 1.036-3.09-.37-.442A9.955 9.955 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/></svg>
                        Contactez-nous sur WhatsApp
                    </a>
                </div>
            </section>
        </>
    );
}
