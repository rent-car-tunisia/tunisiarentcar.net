import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import type { Metadata } from "next";
import { siteConfig, telUrl, whatsappUrl, mailtoUrl } from "@/lib/site-config";

export const metadata: Metadata = {
    title: `Contact | ${siteConfig.brand.name} - Location Voiture Tunisie`,
    description:
        `Contactez ${siteConfig.brand.name} pour votre location de voiture en Tunisie. Disponible 24h/24, 7j/7. Appelez-nous au ${siteConfig.contact.phone.display}.`,
    openGraph: {
        title: `Contactez-nous | ${siteConfig.brand.name}`,
        description: `Service disponible 24h/24. Appelez le ${siteConfig.contact.phone.display} ou envoyez un message WhatsApp.`,
    },
    alternates: {
        canonical: `${siteConfig.url.baseUrl}/contact`,
    },
};

export default function ContactPage() {
    return (
        <div className="py-12">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-12">
                    <h1 className="text-foreground mb-4">Contactez-nous</h1>
                    <p className="text-muted max-w-xl mx-auto">
                        Notre équipe est disponible 24h/24 pour répondre à vos questions
                        et vous aider à réserver votre voiture.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {/* Phone */}
                    <a
                        href={telUrl}
                        className="card card-hover p-8 text-center"
                    >
                        <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Phone size={24} className="text-accent" />
                        </div>
                        <h3 className="text-foreground mb-2">Téléphone</h3>
                        <p className="text-2xl font-semibold text-foreground mb-2">
                            {siteConfig.contact.phone.display}
                        </p>
                        <p className="text-muted text-sm">Disponible 24h/24</p>
                    </a>

                    {/* WhatsApp */}
                    <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="card card-hover p-8 text-center"
                    >
                        <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <MessageCircle size={24} className="text-green-600" />
                        </div>
                        <h3 className="text-foreground mb-2">WhatsApp</h3>
                        <p className="text-lg font-medium text-foreground mb-2">
                            Envoyez-nous un message
                        </p>
                        <p className="text-muted text-sm">Réponse rapide garantie</p>
                    </a>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Email */}
                    <a
                        href={mailtoUrl}
                        className="card card-hover p-8 text-center"
                    >
                        <div className="w-14 h-14 bg-surface rounded-full flex items-center justify-center mx-auto mb-4">
                            <Mail size={24} className="text-muted" />
                        </div>
                        <h3 className="text-foreground mb-2">Email</h3>
                        <p className="text-foreground font-medium mb-2">
                            {siteConfig.contact.email}
                        </p>
                        <p className="text-muted text-sm">Pour devis et partenariats</p>
                    </a>

                    {/* Address */}
                    <div className="card p-8 text-center">
                        <div className="w-14 h-14 bg-surface rounded-full flex items-center justify-center mx-auto mb-4">
                            <MapPin size={24} className="text-muted" />
                        </div>
                        <h3 className="text-foreground mb-2">Adresse</h3>
                        <p className="text-foreground font-medium mb-2">
                            {siteConfig.contact.address.street}
                        </p>
                        <p className="text-muted text-sm">{siteConfig.contact.address.displayShort}</p>
                    </div>
                </div>

                {/* Hours */}
                <div className="card p-8 mt-8">
                    <div className="flex items-center gap-4 justify-center">
                        <Clock size={24} className="text-accent" />
                        <div>
                            <h3 className="text-foreground font-semibold">Horaires d'ouverture</h3>
                            <p className="text-muted">
                                Ouvert 24h/24, 7j/7 — Livraison aéroport jour et nuit
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
