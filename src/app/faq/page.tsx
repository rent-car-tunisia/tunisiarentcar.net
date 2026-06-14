import { Metadata } from "next";
import Link from "next/link";
import { getFaqs } from "@/lib/get-site-data";
import { HelpCircle, ChevronDown, Phone, MessageCircle, ChevronRight, Clock, CreditCard, Car } from "lucide-react";
import { siteConfig, telUrl, whatsappUrl } from "@/lib/site-config";

export const metadata: Metadata = {
    title: `FAQ Location Voiture Tunisie | Questions Fréquentes | ${siteConfig.brand.name}`,
    description: "Réponses à toutes vos questions sur la location voiture en Tunisie. Documents, âge, paiement, assurance, caution et plus.",
    openGraph: {
        title: `FAQ Location Voiture Tunisie | ${siteConfig.brand.name}`,
        description: "Toutes les réponses pour louer une voiture en Tunisie.",
    },
    alternates: {
        canonical: `${siteConfig.url.baseUrl}/faq`,
    },
};

export default async function FAQPage() {
    const FAQ_DATA = await getFaqs();

    // Group FAQ by category
    const categories = [...new Set(FAQ_DATA.map(item => item.category))];

    // JSON-LD Schema for FAQPage
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQ_DATA.map(item => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
            },
        })),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

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
                        <span className="text-white font-medium">FAQ</span>
                    </nav>

                    <div className="text-center max-w-3xl mx-auto">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/20 rounded-2xl mb-6">
                            <HelpCircle size={32} className="text-accent" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
                            Questions Fréquentes
                        </h1>
                        <p className="text-lg text-gray-300 leading-relaxed">
                            Tout ce que vous devez savoir sur la location de voiture en Tunisie avec {siteConfig.brand.name}.
                        </p>
                    </div>
                </div>
            </section>

            {/* Quick Stats */}
            <section className="bg-white border-b border-gray-100">
                <div className="max-w-6xl mx-auto px-6 py-8">
                    <div className="grid grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="text-3xl font-black text-accent mb-1">21 ans</div>
                            <div className="text-gray-500 text-sm">Âge minimum</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-black text-accent mb-1">{siteConfig.pricing.minPrice3Days} {siteConfig.pricing.currencyDisplay}</div>
                            <div className="text-gray-500 text-sm">Prix minimum / 3 jours</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-black text-accent mb-1">24h/24</div>
                            <div className="text-gray-500 text-sm">Service aéroport</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Content */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-4xl mx-auto px-6">
                    {categories.map((category) => (
                        <div key={category} className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
                                    {category === "Documents" && <CreditCard className="text-accent" size={20} />}
                                    {category === "Paiement" && <CreditCard className="text-accent" size={20} />}
                                    {category === "Assurance" && <Car className="text-accent" size={20} />}
                                    {category === "Service" && <Clock className="text-accent" size={20} />}
                                    {category === "Véhicule" && <Car className="text-accent" size={20} />}
                                </div>
                                {category}
                            </h2>
                            <div className="space-y-4">
                                {FAQ_DATA.filter(item => item.category === category).map((item, i) => (
                                    <details
                                        key={i}
                                        className="bg-white rounded-xl shadow-sm group"
                                    >
                                        <summary className="flex items-center justify-between cursor-pointer list-none p-6">
                                            <h3 className="text-lg font-bold text-gray-900 pr-4">
                                                {item.question}
                                            </h3>
                                            <div className="w-8 h-8 bg-gray-100 group-open:bg-accent rounded-lg flex items-center justify-center shrink-0 transition-colors">
                                                <ChevronDown
                                                    size={18}
                                                    className="text-gray-500 group-open:text-white transition-transform group-open:rotate-180"
                                                />
                                            </div>
                                        </summary>
                                        <div className="px-6 pb-6 pt-0">
                                            <div className="border-t border-gray-100 pt-4">
                                                <p className="text-gray-600 leading-relaxed">
                                                    {item.answer}
                                                </p>
                                            </div>
                                        </div>
                                    </details>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Still have questions */}
            <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Vous avez d&apos;autres questions ?
                    </h2>
                    <p className="text-gray-600 mb-8">
                        Notre équipe est disponible 24h/24 pour répondre à toutes vos questions.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a
                            href={telUrl}
                            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-8 py-4 rounded-xl font-bold transition-all hover:shadow-lg"
                        >
                            <Phone size={20} />
                            {siteConfig.contact.phone.display}
                        </a>
                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-bold transition-all hover:shadow-lg"
                        >
                            <MessageCircle size={20} />
                            WhatsApp
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}
